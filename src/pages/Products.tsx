import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async"; 

const Products: React.FC = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = ["All", "Fruit", "Vegetables", "Juice"];

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "products"),
          orderBy("createdAt", "desc")
        );
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

  // Filtered results based on search and category
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const searchResults = allProducts.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".search-container")) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    <Helmet>
        <title>Our Fresh Products | Rose Vegetables & Fruits Abu Dhabi</title>
        <meta name="description" content="Shop the freshest fruits and vegetables from Rose Vegitable And Fruits in Abu Dhabi. Premium quality produce delivered to your door." />
        <meta name="keywords" content="fruits Abu Dhabi, vegetables Abu Dhabi, fresh produce Abu Dhabi, organic fruits Abu Dhabi" />
        <meta property="og:title" content="Our Fresh Products | Rose Vegetables & Fruits Abu Dhabi" />
        <meta property="og:description" content="Shop the freshest fruits and vegetables from Rose Vegitable And Fruits in Abu Dhabi. Premium quality produce delivered to your door." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="URL_TO_IMAGE" />
      </Helmet>
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow py-20 bg-background relative">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up space-y-6 relative z-[50]">
            <h2 className="text-4xl md:text-5xl font-bold">
              Our Fresh <span className="text-gradient-primary">Products</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked fresh produce delivered daily from the finest farms
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mt-6 search-container">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent relative z-10"
              />

              {/* Dropdown Suggestions */}
              {searchQuery.length > 0 && showSuggestions && (
                <ul className="absolute left-0 top-full mt-2 w-full bg-white shadow-xl rounded-lg border border-gray-200 max-h-48 overflow-y-auto animate-fade-in z-[60]">
                  {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                        onClick={() => {
                          setSelectedCategory("All");
                          setSearchQuery(item.name);
                          setShowSuggestions(false);
                        }}
                      >
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{item.name}</span>
                          {item.category && (
                            <span className="text-xs text-gray-500 capitalize">{item.category}</span>
                          )}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-4 text-gray-500 text-center">
                      No products found
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>

          {/* Category Buttons */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap z-[10] relative">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSearchQuery("");
                  setShowSuggestions(false);
                }}
                className={`px-6 py-2.5 rounded-full transition-all duration-200 font-medium ${
                  selectedCategory === cat
                  ? "bg-primary text-white hover:bg-primary/90 shadow-md"
                    : "border-2 border-gray-300 hover:border-primary hover:text-primary hover:bg-primary/5"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-lg text-muted-foreground">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 relative z-0">
              <div className="text-6xl mb-4">🥬</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchQuery || selectedCategory !== "All"
                  ? "Try adjusting your search or category filter"
                  : "No products available at the moment"}
              </p>
              {(searchQuery || selectedCategory !== "All") && (
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 px-6 py-2"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 relative z-0">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
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
      </main>

      <Footer />
    </div>
                  </>
  );
};

export default Products;
