import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { MdAddShoppingCart } from "react-icons/md";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  description?: string;
}

const ProductDetails = () => {
  const { id } = useParams(); // assuming route: /product/:id
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id!);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setProduct({ id: snap.id, ...snap.data() } as Product);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-muted-foreground">
        Loading product...
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: Number(product.id.replace(/\D/g, "")) || 0,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
    });
  };

  return (
    <>
      <Navigation />
      <section className="min-h-screen bg-gradient-to-b from-white to-muted/50 py-16">
        <div className="container mx-auto px-6 lg:px-16">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative group">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gradient-primary mb-3">
                {product.name}
              </h1>

              {product.category && (
                <p className="text-sm font-medium text-secondary mb-4">
                  Category: {product.category}
                </p>
              )}

              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                {product.description ||
                  "No description available for this product."}
              </p>

              <div className="flex items-center gap-3 mb-8">
                <p className="text-3xl font-bold text-gradient-primary">
                  AED {product.price}
                </p>
                <span className="text-gray-500 text-sm">/kg</span>
              </div>

              <Button
                onClick={handleAddToCart}
                size="lg"
                className="gap-2 bg-primary text-white hover:bg-primary/90 transition-all"
              >
                <MdAddShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
