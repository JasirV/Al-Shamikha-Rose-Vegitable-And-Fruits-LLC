import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import moment from "moment";
import { useCart } from "@/contexts/CartContext";


interface Offer {
  imageUrl: string;
  discount: number;
  price: number;
  endDate: string;
}

const HeroSection = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();
  // Fetch offers only
  useEffect(() => {
    const fetchOffers = async () => {
      const offersRef = collection(db, "offers");
      const snapshot = await getDocs(offersRef);
      const activeOffers = snapshot.docs
        .map((doc) => doc.data() as Offer)
        .slice(0, 3); // limit to 3 offers
      setOffers(activeOffers);
    };
    fetchOffers();
  }, []);

  // Auto-slide loop
  useEffect(() => {
    if (offers.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % offers.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [offers]);

  const currentOffer = offers[currentIndex];

  // Calculate offer price
  const getOfferPrice = (price: number, discount: number) =>
    (price - (price * discount) / 100).toFixed(2);
  const handleAddToCart = (offer: Offer) => {
  const now = moment();
  const end = moment(offer.endDate);

  console.log("Current time:", now.format());
  console.log("Offer end time:", end.format());
  console.log("Is offer expired?", offer);
  // Check if offer is expired
  if (now.isAfter(end)) {
    alert("Sorry, this offer has expired!");
    return;
  }

  // Proceed to add to cart if offer is still valid
  addToCart({
    id: currentIndex, // or generate unique ID per offer
    name: `Offer Product`,
    price: parseFloat(
      (offer.price - (offer.price * offer.discount) / 100).toFixed(2)
    ),
    imageUrl: offer.imageUrl,
    category: "Offer",
  });
};

  return (
    <section className="relative overflow-hidden flex flex-col lg:flex-row">
      {/* LEFT SECTION – Offers Carousel */}

      <div className="absolute inset-0 gradient-hero" />
      {/* RIGHT SECTION – Hero */}
      <div className="relative w-full lg:w-2/3 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

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
              Freshness is our promise! Get  Abu Dhabi's finest fruits and vegetables
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
                  Best Prices in Abu Dhabi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center px-6 py-20">
  <AnimatePresence mode="wait">
    {currentOffer ? (
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col lg:flex-row items-center gap-6 backdrop-blur-md  lg:p-10 w-full max-w-lg"
      >
        {/* Offer PNG Image */}
        <motion.img
          src={currentOffer.imageUrl}
          alt={`Offer ${currentIndex + 1}`}
          className="w-48 h-48 object-contain drop-shadow-xl"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Offer Details */}
        <div className="text-center lg:text-left text-black shadow-2xl bg-white/90 rounded-3xl  p-6">
          <h3 className="text-2xl font-semibold mb-2">
            Offer Product
          </h3>
          <p className="text-lg text-red-500 font-bold mb-1">
            🔥 {currentOffer.discount}% OFF
          </p>
          <p className="text-base line-through text-gray-500 mb-1">
            ${currentOffer.price}
          </p>
          <p className="text-xl font-bold mb-4">
            ${(
              currentOffer.price -
              (currentOffer.price * currentOffer.discount) / 100
            )}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Offer ends {moment(currentOffer.endDate).fromNow()}
          </p>

          {/* Add to Cart Button */}
          <Button
            className="bg-black text-white hover:bg-secondary hover:text-white"
            onClick={() => handleAddToCart(currentOffer)}
          >
            Add to Cart
          </Button>
        </div>
      </motion.div>
    ) : (
      <div className="text-white text-center">No active offers</div>
    )}
  </AnimatePresence>
</div>

    </section>
  );
};

export default HeroSection;
