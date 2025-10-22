"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { Gift, Trash2 } from "lucide-react";
import AdminNavigation from "@/components/AdminNavigation";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface Offer {
  id: string;
  productId: string;
  title: string;
  discount: number;
  price: number;
  endDate: string;
  imageUrl?: string;
}

interface Merit {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const AdminOfferEdit = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [search, setSearch] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [isOfferWeek, setIsOfferWeek] = useState(false);
  const [merits, setMerits] = useState<Merit[]>([]);
  const [selectedMerit, setSelectedMerit] = useState<Merit | null>(null);
  const [meritImage, setMeritImage] = useState<File | null>(null);

  // ✅ Fetch global settings (safe even if offerSettings/main doesn't exist)
  useEffect(() => {
    const fetchSettings = async () => {
      const ref = doc(db, "offerSettings", "main");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setIsOfferWeek(data.isOfferWeek || false);
        setMerits(data.merits || []);
      } else {
        await setDoc(ref, { isOfferWeek: false, merits: [] }); // Create default doc
      }
    };
    fetchSettings();
  }, []);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Product),
      }));
      setProducts(list);
    };
    fetchProducts();
  }, []);

  // ✅ Fetch offers
  useEffect(() => {
    const fetchOffers = async () => {
      const snap = await getDocs(collection(db, "offers"));
      const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Offer) }));
      setOffers(list);
    };
    fetchOffers();
  }, []);

  // ✅ Toggle Offer Week safely
  const handleToggleOfferWeek = async () => {
    const ref = doc(db, "offerSettings", "main");
    await setDoc(ref, { isOfferWeek: !isOfferWeek }, { merge: true });
    setIsOfferWeek(!isOfferWeek);
  };

  // ✅ Update selected merit
  const handleUpdateMerit = async () => {
    if (!selectedMerit) {
      alert("Please select a merit to update!");
      return;
    }

    let imageUrl = selectedMerit.imageUrl || "";
    if (meritImage) {
      const uploaded = await uploadToCloudinary(meritImage);
      if (uploaded) imageUrl = uploaded;
    }

    const updated = merits.map((m) =>
      m.id === selectedMerit.id ? { ...selectedMerit, imageUrl } : m
    );

    setMerits(updated);
    await setDoc(
      doc(db, "offerSettings", "main"),
      { merits: updated },
      { merge: true }
    );
    alert("Merit updated successfully!");
    setMeritImage(null);
  };

  // ✅ Delete merit
  const handleDeleteMerit = async (id: string) => {
    const updated = merits.filter((m) => m.id !== id);
    setMerits(updated);
    await setDoc(
      doc(db, "offerSettings", "main"),
      { merits: updated },
      { merge: true }
    );
  };
  const handleSaveOffer = async () => {
    if (!selectedOffer) return;
    let imageUrl = selectedOffer.imageUrl;
    if (newImage) {
      const uploadedUrl = await uploadToCloudinary(newImage);
      if (uploadedUrl) imageUrl = uploadedUrl;
      else {
        alert("Failed to upload image.");
        return;
      }
    }
    try {
      const offerRef = doc(db, "offers", selectedOffer.id);
      await updateDoc(offerRef, {
        productId: selectedOffer.productId,
        title: selectedOffer.title,
        imageUrl,
        discount: selectedOffer.discount,
        price: selectedOffer.price,
        endDate: selectedOffer.endDate,
      });
      alert("Offer updated successfully!");
      setOffers((prev) =>
        prev.map((o) =>
          o.id === selectedOffer.id ? { ...selectedOffer, imageUrl } : o
        )
      );
      setNewImage(null);
    } catch (error) {
      console.error("Error updating offer:", error);
      alert("Failed to update offer.");
    }
  };

  const handleProductSelect = (product: Product) => {
    if (!selectedOffer) return;
    setSelectedOffer({
      ...selectedOffer,
      productId: product.id,
      imageUrl: product.imageUrl,
      price: product.price,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 py-8">
        <AdminNavigation />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center mb-6">
            <Gift className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            Offer <span className="text-gradient-primary">Management</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage weekly offers and merit content easily.
          </p>
        </div>

        {/* Weekly Offer Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-card rounded-lg border mb-6 gap-4">
          <h2 className="font-semibold text-xl text-center sm:text-left">
            Weekly Offer Mode
          </h2>
          <Button onClick={handleToggleOfferWeek} className="w-full sm:w-auto">
            {isOfferWeek ? "Switch to Offer Editor" : "Switch to Merit Mode"}
          </Button>
        </div>

        {/* 🥝 Merit Section */}
        {isOfferWeek && (
          <div className="p-6 bg-card rounded-xl border mb-10">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Fruits Merits & Health Benefits
            </h2>

            {/* Existing Merits */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {merits.map((merit) => (
                <div
                  key={merit.id}
                  className={`border rounded-xl p-4 flex flex-col items-center text-center ${
                    selectedMerit?.id === merit.id
                      ? "border-primary bg-primary/5"
                      : "hover:shadow-md transition-all"
                  }`}
                  onClick={() => setSelectedMerit(merit)}
                >
                  <img
                    src={merit.imageUrl || "/placeholder.png"}
                    alt={merit.title}
                    className="w-24 h-24 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold">{merit.title}</h3>
                  <p className="text-sm text-gray-600">{merit.description}</p>
                </div>
              ))}
            </div>

            {/* Update Merit Form */}
            {selectedMerit && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">
                  Edit Merit
                </h3>
                <Input
                  placeholder="Merit Title"
                  value={selectedMerit.title}
                  onChange={(e) =>
                    setSelectedMerit({
                      ...selectedMerit,
                      title: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Merit Description"
                  value={selectedMerit.description}
                  onChange={(e) =>
                    setSelectedMerit({
                      ...selectedMerit,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && setMeritImage(e.target.files[0])
                  }
                />

                <Button
                  onClick={handleUpdateMerit}
                  className="w-full sm:w-auto"
                >
                  Update Merit
                </Button>
              </div>
            )}
          </div>
        )}

        {/* 🛒 Offer Editor */}
        {!isOfferWeek && (
          <div className="p-6 bg-card rounded-xl border mb-10">
            <h2 className="text-2xl font-bold mb-6">Edit Offer</h2>

            {/* Select Offer */}
            <div className="mb-4">
              <label className="block font-medium mb-2">Select Offer:</label>
              <select
                className="border p-2 rounded w-full"
                value={selectedOffer?.id || ""}
                onChange={(e) =>
                  setSelectedOffer(
                    offers.find((o) => o.id === e.target.value) || null
                  )
                }
              >
                <option value="">-- Select Offer --</option>
                {offers.map((offer) => (
                  <option key={offer.id} value={offer.id}>
                    {offer.title || `Offer ${offer.id}`}
                  </option>
                ))}
              </select>
            </div>

            {selectedOffer && (
              <>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Offer Title</label>
                  <Input
                    placeholder="Enter offer title..."
                    value={selectedOffer.title}
                    onChange={(e) =>
                      setSelectedOffer({
                        ...selectedOffer,
                        title: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Product Search */}
                <div className="mb-4">
                  <label className="block font-medium mb-2">
                    Search Product:
                  </label>
                  <Input
                    placeholder="Type product name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="border mt-2 max-h-40 overflow-y-auto rounded">
                    {products
                      .filter((p) =>
                        p.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((product) => (
                        <div
                          key={product.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          onClick={() => handleProductSelect(product)}
                        >
                          <img
                            src={product.imageUrl || "/placeholder.png"}
                            alt={product.name}
                            className="w-10 h-10 object-contain"
                          />
                          <span>{product.name}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Offer Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-medium mb-2">
                      Discount (%)
                    </label>
                    <Input
                      type="number"
                      value={selectedOffer.discount}
                      onChange={(e) =>
                        setSelectedOffer({
                          ...selectedOffer,
                          discount: Number(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Price</label>
                    <Input
                      type="number"
                      value={selectedOffer.price}
                      onChange={(e) =>
                        setSelectedOffer({
                          ...selectedOffer,
                          price: Number(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                {/* End Date */}
                <div className="mb-4">
                  <label className="block font-medium mb-2">End Date</label>
                  <Input
                    type="date"
                    value={selectedOffer.endDate}
                    onChange={(e) =>
                      setSelectedOffer({
                        ...selectedOffer,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Offer Image */}
                <div className="mb-6">
                  <label className="block font-medium mb-2">Offer Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files && setNewImage(e.target.files[0])
                    }
                  />
                  <div className="mt-4 flex items-center gap-6">
                    {newImage ? (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          New Image Preview:
                        </p>
                        <img
                          src={URL.createObjectURL(newImage)}
                          alt="Preview"
                          className="w-32 h-32 object-contain rounded-md border"
                        />
                      </div>
                    ) : (
                      selectedOffer.imageUrl && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Current Image:
                          </p>
                          <img
                            src={selectedOffer.imageUrl}
                            alt="Current Offer"
                            className="w-32 h-32 object-contain rounded-md border"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleSaveOffer}
                  className="mt-4 bg-primary hover:bg-primary/90 transition-all"
                >
                  Save Offer Changes
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminOfferEdit;
