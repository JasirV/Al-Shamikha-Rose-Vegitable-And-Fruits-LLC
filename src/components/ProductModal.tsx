import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

interface ProductForm {
  name: string;
  category: "vegetable" | "fruit" | "juice";
  type: "kg" | "box" | "piece";
  description: string;
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
  description: string;
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

  const { register, handleSubmit, watch, setValue, reset, control } =
    useForm<ProductForm>({
      defaultValues: {
        name: "",
        category: "vegetable",
        type: "kg",
        description: "",
        price: 0,
        offerPrice: 0,
        boxSizes: [],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "boxSizes",
  });

  const type = watch("type");

  // ✅ Load product data when editing
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category,
        type: product.type,
        description: product.description || "",
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
        description: "",
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

  // ✅ Submit handler
  const onSubmit = async (data: ProductForm) => {
    setLoading(true);
    try {
      let imageUrl = imagePreview;

      if (data.imageFile) {
        imageUrl = await uploadToCloudinary(data.imageFile);
      }

      const productData: any = {
        name: data.name.trim(),
        category: data.category,
        type: data.type,
        description: data.description.trim(),
        imageUrl,
        updatedAt: new Date(),
        ...(product ? {} : { createdAt: new Date() }),
      };

      // Add price fields only if applicable
      if (data.type !== "box") {
        productData.price = Number(data.price) || 0;
        productData.offerPrice = Number(data.offerPrice) || 0;
      }

      // Add box sizes only if applicable
      if (data.type === "box") {
        productData.boxSizes = data.boxSizes.filter(
          (b) => b.size && b.price >= 0
        );
      }

      if (product?.id) {
        await updateDoc(doc(db, "products", product.id), productData);
      } else {
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
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Write a short description about this product..."
              className="min-h-[100px]"
            />
          </div>

          {/* Category */}
          <div className="space-y-3">
            <Label>Product Category</Label>
            <div className="flex gap-4">
              {["vegetable", "fruit", "juice"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input type="radio" value={cat} {...register("category")} />
                  <span className="capitalize">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type */}
          <div className="space-y-3">
            <Label>Pricing Type</Label>
            <div className="flex gap-4">
              {["kg", "box", "piece"].map((t) => (
                <label
                  key={t}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input type="radio" value={t} {...register("type")} />
                  <span className="capitalize">{t}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Section */}
          {(type === "kg" || type === "piece") && (
            <div className="space-y-3">
              <Label htmlFor="price">Price ($)</Label>
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
                  onClick={() => append({ size: "", price: 0, offerPrice: 0 })}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Size
                </Button>
              </div>

              {fields.length > 0 ? (
                fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <Label>Size</Label>
                      <Input
                        {...register(`boxSizes.${index}.size` as const)}
                        placeholder="e.g., 250g, 500g, 1kg"
                      />
                    </div>
                    <div className="flex-1">
                      <Label>Price ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register(`boxSizes.${index}.price` as const, {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="flex-1">
                      <Label>Offer Price ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register(`boxSizes.${index}.offerPrice` as const, {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="mt-7 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-border/50 rounded-lg">
                  <p className="text-muted-foreground">
                    No box sizes added yet
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({ size: "", price: 0, offerPrice: 0 })
                    }
                    className="mt-2 gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add First Size
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 gap-2 bg-primary hover:bg-primary/90"
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
