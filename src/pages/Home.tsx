import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import heroImage from "@/assets/hero-produce.jpg";
import fruitsImage from "@/assets/fruits-collection.jpg";
import vegetablesImage from "@/assets/vegetables-collection.jpg";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import MoreProducts from "@/components/ui/MoreProducts";
import NewsletterCTA from "@/components/ui/NewsletterCTA";
import Footer from "@/components/Footer";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // All products with different categories
  const allProducts = [
    {
      id: 1,
      name: "Fresh Strawberries",
      price: 25,
      image: fruitsImage,
      category: "Fruits",
    },
    {
      id: 2,
      name: "Sweet Oranges",
      price: 18,
      image: fruitsImage,
      category: "Fruits",
    },
    {
      id: 3,
      name: "Red Apples",
      price: 20,
      image: fruitsImage,
      category: "Fruits",
    },
    {
      id: 4,
      name: "Fresh Bananas",
      price: 15,
      image: fruitsImage,
      category: "Fruits",
    },
    {
      id: 6,
      name: "Organic Carrots",
      price: 12,
      image: vegetablesImage,
      category: "Vegetables",
    },
    {
      id: 7,
      name: "Fresh Broccoli",
      price: 15,
      image: vegetablesImage,
      category: "Vegetables",
    },
    {
      id: 8,
      name: "Bell Peppers",
      price: 18,
      image: vegetablesImage,
      category: "Vegetables",
    },
    {
      id: 9,
      name: "Fresh Tomatoes",
      price: 10,
      image: vegetablesImage,
      category: "Vegetables",
    },
  ];

  const categories = ["All", "Fruits", "Vegetables"];

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 gradient-hero" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-32 md:py-40">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">
                Premium Quality Guaranteed
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              We Never Compromise on Quality
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-light">
              Freshness is our promise! Get Dubai's finest fruits and vegetables
              delivered straight to your doorstep.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="gap-2 text-lg h-14 px-8">
                  Order Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-lg h-14 px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary"
                >
                  View Services
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-12 text-white">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Same Day Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Farm Fresh Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Best Prices in Dubai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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

                    <WhyChooseUs/>
          <MoreProducts/>
          <NewsletterCTA/>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Home;
