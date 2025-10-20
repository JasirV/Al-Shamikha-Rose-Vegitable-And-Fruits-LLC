"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { Gift } from "lucide-react";
import AdminNavigation from "@/components/AdminNavigation";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
}

interface Offer {
  id: string;
  productId: string;
  discount: number;
  price: number;
  endDate: string;
  imageUrl?: string;
}

const AdminOfferEdit = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [search, setSearch] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Product),
      }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  // Fetch offers
  useEffect(() => {
    const fetchOffers = async () => {
      const snapshot = await getDocs(collection(db, "offers"));
      const offerList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Offer),
      }));
      setOffers(offerList);
    };
    fetchOffers();
  }, []);

  const handleProductSelect = (product: Product) => {
    if (!selectedOffer) return;
    setSelectedOffer({
      ...selectedOffer,
      productId: product.id,
      imageUrl: product.imageUrl,
    });
  };

  const handleSave = async () => {
    if (!selectedOffer) return;

    let imageUrl = selectedOffer.imageUrl;

    if (newImage) {
      const uploadedUrl = await uploadToCloudinary(newImage);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        alert("Failed to upload image.");
        return;
      }
    }

    try {
      const offerRef = doc(db, "offers", selectedOffer.id);
      await updateDoc(offerRef, {
        productId: selectedOffer.productId,
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <AdminNavigation />

        {/* Page Title */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center mb-6">
            <Gift className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Offer <span className="text-gradient-primary">Management</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage discounts, offers, and promotions for your products
          </p>
        </div>

        {/* Offer Editor Card */}
        <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-sm mb-12">
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
                  Offer {offer.id}
                </option>
              ))}
            </select>
          </div>

          {selectedOffer && (
            <>
              {/* Product Search */}
              <div className="mb-4">
                <label className="block font-medium mb-2">Search Product:</label>
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
                  <label className="block font-medium mb-2">Discount (%)</label>
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

              {/* Image Section */}
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
                onClick={handleSave}
                className="mt-4 bg-primary hover:bg-primary/90 transition-all"
              >
                Save Changes
              </Button>
            </>
          )}
        </div>

      </div>
        <Footer />
    </div>
  );
};

export default AdminOfferEdit;
