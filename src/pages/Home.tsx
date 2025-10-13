import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-produce.jpg";
import fruitsImage from "@/assets/fruits-collection.jpg";
import vegetablesImage from "@/assets/vegetables-collection.jpg";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import MoreProducts from "@/components/ui/MoreProducts";
import NewsletterCTA from "@/components/ui/NewsletterCTA";
import Footer from "@/components/Footer";
const Home: React.FC = () => {
  // Sample featured products - will be replaced with real data from backend later
  const featuredProducts = [
    {
      id: 1,
      name: "Fresh Strawberries",
      price: 25,
      image: fruitsImage,
      category: "Fruits",
    },
    {
      id: 2,
      name: "Organic Carrots",
      price: 12,
      image: vegetablesImage,
      category: "Vegetables",
    },
    {
      id: 3,
      name: "Sweet Oranges",
      price: 18,
      image: fruitsImage,
      category: "Fruits",
    },
    {
      id: 4,
      name: "Fresh Broccoli",
      price: 15,
      image: vegetablesImage,
      category: "Vegetables",
    },
  ];

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
                <span className="text-sm font-medium">
                  Best Prices in Dubai
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-gradient-primary">Products</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked fresh produce delivered daily from the finest farms to
              your home
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              More products coming soon with our admin dashboard!
            </p>
            <Link to="/admin">
              <Button variant="outline" size="lg">
                Go to Admin Panel
              </Button>
            </Link>
          </div> */}
          <WhyChooseUs/>
          <MoreProducts/>
          <NewsletterCTA/>
        </div>
      </section>
      <Footer/>
      
    </div>
  );
};

export default Home;
