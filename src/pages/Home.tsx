import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-produce.jpg";
import fruitsImage from "@/assets/fruits-collection.jpg";
import vegetablesImage from "@/assets/vegetables-collection.jpg";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import MoreProducts from "@/components/ui/MoreProducts";
import NewsletterCTA from "@/components/ui/NewsletterCTA";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";
import HeroSection from "@/pages/HeroSection";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [offerImages, setOfferImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // All products with different categories

  // Fetch offers from Firestore
  useEffect(() => {
    const fetchOffers = async () => {
      const offersRef = collection(db, "offers"); // collection name
      const snapshot = await getDocs(offersRef);
      const urls = snapshot.docs.map((doc) => doc.data().imageUrl);
      setOfferImages(urls.slice(0, 3)); // limit to 3 images
    };
    fetchOffers();
  }, []);

  useEffect(() => {
    if (offerImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % offerImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [offerImages]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "products"), limit(8)); // fetch max 8
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

  // ✅ Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter(
          (product) =>
            product.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  // const allProducts = [
  //   {
  //     id: 1,
  //     name: "Fresh Strawberries",
  //     price: 25,
  //     image: fruitsImage,
  //     category: "Fruits",
  //   },
  //   {
  //     id: 2,
  //     name: "Sweet Oranges",
  //     price: 18,
  //     image: fruitsImage,
  //     category: "Fruits",
  //   },
  //   {
  //     id: 3,
  //     name: "Red Apples",
  //     price: 20,
  //     image: fruitsImage,
  //     category: "Fruits",
  //   },
  //   {
  //     id: 4,
  //     name: "Fresh Bananas",
  //     price: 15,
  //     image: fruitsImage,
  //     category: "Fruits",
  //   },
  //   {
  //     id: 6,
  //     name: "Organic Carrots",
  //     price: 12,
  //     image: vegetablesImage,
  //     category: "Vegetables",
  //   },
  //   {
  //     id: 7,
  //     name: "Fresh Broccoli",
  //     price: 15,
  //     image: vegetablesImage,
  //     category: "Vegetables",
  //   },
  //   {
  //     id: 8,
  //     name: "Bell Peppers",
  //     price: 18,
  //     image: vegetablesImage,
  //     category: "Vegetables",
  //   },
  //   {
  //     id: 9,
  //     name: "Fresh Tomatoes",
  //     price: 10,
  //     image: vegetablesImage,
  //     category: "Vegetables",
  //   },
  // ];

  const categories = ["All", "Fruit", "Vegetables", "Juice"];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Products Section with Category Filter */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Fresh <span className="text-gradient-primary">Products</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked fresh produce delivered daily from the finest farms to
              your home
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                size="lg"
                className="min-w-[120px] transition-all duration-300 hover-scale"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found in this category.
              </p>
            </div>
          )}

          <WhyChooseUs />
          <MoreProducts />
          <NewsletterCTA />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
