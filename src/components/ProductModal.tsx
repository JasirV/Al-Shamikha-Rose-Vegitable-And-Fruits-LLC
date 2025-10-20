import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

interface ProductForm {
  name: string;
  category: "vegetable" | "fruit" | "juice";
  type: "kg" | "box" | "piece";
  price?: number;
  offerPrice?: number;
  boxSizes: { size: string; price: number; offerPrice?: number }[];
  imageFile?: File;
}

interface Product {
  id: string;
  name: string;
  category: "vegetable" | "fruit" | "juice";
  type: "kg" | "box" | "piece";
  price?: number;
  offerPrice?: number;
  boxSizes?: { size: string; price: number; offerPrice?: number }[];
  imageUrl: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const { register, handleSubmit, watch, setValue, reset } =
    useForm<ProductForm>({
      defaultValues: {
        name: "",
        category: "vegetable",
        type: "kg",
        price: 0,
        offerPrice: 0,
        boxSizes: [],
      },
    });

  const type = watch("type");
  const boxSizes = watch("boxSizes") || [];

  // ✅ Load product data when editing
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category,
        type: product.type,
        price: product.price || 0,
        offerPrice: product.offerPrice || 0,
        boxSizes: product.boxSizes || [],
      });
      setImagePreview(product.imageUrl || "");
    } else {
      reset({
        name: "",
        category: "vegetable",
        type: "kg",
        price: 0,
        offerPrice: 0,
        boxSizes: [],
      });
      setImagePreview("");
    }
  }, [product, reset]);

  // ✅ Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("imageFile", file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // ✅ Box size helpers
  const addBoxSize = () => {
    setValue("boxSizes", [...boxSizes, { size: "", price: 0, offerPrice: 0 }]);
  };

  const removeBoxSize = (index: number) => {
    const updated = boxSizes.filter((_, i) => i !== index);
    setValue("boxSizes", updated);
  };

  const updateBoxSize = (
    index: number,
    field: "size" | "price" | "offerPrice" | "juice",
    value: string | number
  ) => {
    const updated = boxSizes.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setValue("boxSizes", updated);
  };

  // ✅ Submit handler
  const onSubmit = async (data: ProductForm) => {
    setLoading(true);
    try {
      let imageUrl = imagePreview;

      // Upload new image if file selected
      if (data.imageFile) {
        imageUrl = await uploadToCloudinary(data.imageFile);
      }

      const productData = {
        name: data.name.trim(),
        category: data.category,
        type: data.type,
        price: data.type === "kg" ? Number(data.price) || 0 : undefined,
        offerPrice:
          data.type === "kg" ? Number(data.offerPrice) || 0 : undefined,
        boxSizes:
          data.type === "box"
            ? data.boxSizes.filter((b) => b.size && b.price >= 0)
            : [],
        imageUrl,
        updatedAt: new Date(),
        ...(product ? {} : { createdAt: new Date() }),
      };

      if (product?.id) {
        // Update existing product
        await updateDoc(doc(db, "products", product.id), productData);
      } else {
        // Add new product
        await addDoc(collection(db, "products"), productData);
      }

      onClose();
      reset();
    } catch (error) {
      console.error("❌ Error saving product:", error);
      alert("Error saving product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl border border-border/50 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="text-2xl font-bold">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-muted transition-all"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Image Upload */}
          <div className="space-y-3">
            <Label htmlFor="image">Product Image</Label>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-32 h-32 rounded-xl bg-muted/30 border-2 border-dashed border-border/50 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">
                  Upload a high-quality image of your product
                </p>
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-3">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              placeholder="e.g., Fresh Apples"
              className="h-12 rounded-lg bg-background border-border/50"
            />
          </div>

          {/* Category */}
          <div className="space-y-3">
            <Label>Product Category</Label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="vegetable"
                  {...register("category")}
                />
                <span>Vegetable</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="fruit" {...register("category")} />
                <span>Fruit</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="juice" {...register("category")} />
                <span>Juice</span>
              </label>
            </div>
          </div>

          {/* Type */}
          <div className="space-y-3">
            <Label>Pricing Type</Label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="kg" {...register("type")} />
                <span>Price per Kg</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="box" {...register("type")} />
                <span>Box with Sizes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" value="piece" {...register("type")} />
                <span>Price per Piece</span>
              </label>
            </div>
          </div>

          {/* Price Section */}
          {type === "kg" && (
            <div className="space-y-3">
              <Label htmlFor="price">Price per kg ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true, min: 0 })}
                placeholder="0.00"
              />
              <Label htmlFor="offerPrice">Offer Price ($)</Label>
              <Input
                id="offerPrice"
                type="number"
                step="0.01"
                {...register("offerPrice", { valueAsNumber: true, min: 0 })}
                placeholder="0.00"
              />
            </div>
          )}

          {/* Box Sizes */}
          {type === "box" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Box Sizes & Prices</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addBoxSize}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Size
                </Button>
              </div>

              {boxSizes.map((_, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <Label>Size</Label>
                    <Input
                      value={boxSizes[index]?.size || ""}
                      onChange={(e) =>
                        updateBoxSize(index, "size", e.target.value)
                      }
                      placeholder="e.g., 250g, 500g, 1kg"
                    />
                  </div>
                  <div className="flex-1">
                    <Label>Price ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={boxSizes[index]?.price || 0}
                      onChange={(e) =>
                        updateBoxSize(
                          index,
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div className="flex-1">
                    <Label>Offer Price ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={boxSizes[index]?.offerPrice || 0}
                      onChange={(e) =>
                        updateBoxSize(
                          index,
                          "offerPrice",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBoxSize(index)}
                    className="mt-7 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {boxSizes.length === 0 && (
                <div className="text-center py-6 border-2 border-dashed border-border/50 rounded-lg">
                  <p className="text-muted-foreground">
                    No box sizes added yet
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addBoxSize}
                    className="mt-2 gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add First Size
                  </Button>
                </div>
              )}
            </div>
          )}
          {type === "piece" && (
            <div className="space-y-3">
              <Label htmlFor="price">Price per Piece ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true, min: 0 })}
                placeholder="0.00"
              />
              <Label htmlFor="offerPrice">Offer Price per Piece ($)</Label>
              <Input
                id="offerPrice"
                type="number"
                step="0.01"
                {...register("offerPrice", { valueAsNumber: true, min: 0 })}
                placeholder="0.00"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-lg border-border/50 hover:border-primary/50 transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 rounded-lg gap-2 bg-primary hover:bg-primary/90 transition-all"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {product ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  {product ? "Update Product" : "Add Product"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
