import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Products: React.FC = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Fruit", "Vegetables", "Juice"];

  // ✅ Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllProducts(products);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filter by category
  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter(
          (product) =>
            product.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  return (
    <div>
      <Navigation />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* ✅ Section Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Fresh <span className="text-gradient-primary">Products</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked fresh produce delivered daily from the finest farms to
              your home
            </p>
          </div>

          {/* ✅ Category Filter Buttons */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "border-border hover:bg-muted"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* ✅ Products Grid */}
          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading products...
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No products found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 8).map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in transform scale-[0.95] sm:scale-100"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.offerPrice || product.price}
                    imageUrl={product.imageUrl}
                    category={product.category}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
