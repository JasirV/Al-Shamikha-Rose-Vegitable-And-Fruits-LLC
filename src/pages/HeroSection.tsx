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
  title?: string;
}

interface Merit {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const HeroSection = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOfferWeek, setIsOfferWeek] = useState(false);
  const [merits, setMerits] = useState<Merit[]>([]);
  const { addToCart } = useCart();

  // Fetch offers & offerSettings
  useEffect(() => {
    const fetchData = async () => {
      // Fetch offerSettings
      const settingsSnap = await getDoc(doc(db, "offerSettings", "main"));
      if (settingsSnap.exists()) {
        const data = settingsSnap.data();
        setIsOfferWeek(data.isOfferWeek || false);
        setMerits(data.merits || []);
      }

      // Fetch offers
      const offersRef = collection(db, "offers");
      const snapshot = await getDocs(offersRef);
      const activeOffers = snapshot.docs
        .map((doc) => doc.data() as Offer)
        .slice(0, 3);
      setOffers(activeOffers);
    };
    fetchData();
  }, []);

  // Auto-slide for offers
  useEffect(() => {
    if (!isOfferWeek && offers.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % offers.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [offers, isOfferWeek]);

  const currentOffer = offers[currentIndex];

  const handleAddToCart = (offer: Offer) => {
    const now = moment();
    const end = moment(offer.endDate);
    if (now.isAfter(end)) {
      alert("Sorry, this offer has expired!");
      return;
    }
    addToCart({
      id: currentIndex,
      name: offer.title || "Offer Product",
      price: parseFloat(
        (offer.price - (offer.price * offer.discount) / 100).toFixed(2)
      ),
      imageUrl: offer.imageUrl,
      category: "Offer",
    });
  };

  return (
    <section className="relative overflow-hidden flex flex-col lg:flex-row">
      {/* LEFT SECTION – Gradient & Hero (unchanged) */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="relative w-full lg:w-2/3 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
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
              Freshness is our promise! Get Abu Dhabi's finest fruits and
              vegetables delivered straight to your doorstep.
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

      {/* RIGHT SECTION – Conditional */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center px-6 py-20">
        <AnimatePresence mode="wait">
          {!isOfferWeek ? (
            // 🔥 Offer Carousel (unchanged)
            currentOffer ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.8 }}
                className="relative flex flex-col lg:flex-row items-center gap-6 backdrop-blur-md  lg:p-10 w-full max-w-lg"
              >
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
                <div className="text-center lg:text-left text-black shadow-2xl bg-white/90 rounded-3xl  p-6">
                  <h3 className="text-2xl font-semibold mb-2">
                    {currentOffer.title || "Offer Product"}
                  </h3>
                  <p className="text-lg text-red-500 font-bold mb-1">
                    🔥 {currentOffer.discount}% OFF
                  </p>
                  <p className="text-base line-through text-gray-500 mb-1">
                    AED{currentOffer.price}
                  </p>
                  <p className="text-xl font-bold mb-4">
                    AED
                    {(
                      currentOffer.price -
                      (currentOffer.price * currentOffer.discount) / 100
                    ).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Offer ends {moment(currentOffer.endDate).fromNow()}
                  </p>
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
            )
          ) : (
            // 🌿 Merit Section (new design)
            <motion.div className="relative w-full flex items-center justify-center">
              {merits.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex flex-col lg:flex-row items-center gap-6 backdrop-blur-md lg:p-10 w-full max-w-lg shadow-2xl rounded-3xl bg-white/90"
                  >
                    {/* Merit Image */}
                    <motion.img
                      src={merits[currentIndex].imageUrl || "/placeholder.png"}
                      alt={merits[currentIndex].title}
                      className="w-48 h-48 object-cover rounded-full drop-shadow-xl"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Merit Details */}
                    <div className="text-center lg:text-left text-black p-6 flex flex-col items-center lg:items-start">
                      <h3 className="text-2xl font-semibold mb-2">
                        {merits[currentIndex].title}
                      </h3>

                      <MeritDescription
                        text={merits[currentIndex].description}
                      />

                      {merits[currentIndex].description.length ===
                        Math.max(
                          ...merits.map((m) => m.description.length)
                        ) && (
                        <Button className="bg-secondary text-white hover:bg-primary mt-2">
                          Learn More
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="text-black text-center">
                  No merits available
                </div>
              )}

              <AutoSlideMerits
                merits={merits}
                setCurrentIndex={setCurrentIndex}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;

const AutoSlideMerits = ({
  merits,
  setCurrentIndex,
}: {
  merits: Merit[];
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  useEffect(() => {
    if (merits.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % merits.length);
      }, 5000); // change every 5s
      return () => clearInterval(interval);
    }
  }, [merits, setCurrentIndex]);

  return null;
};


const MeritDescription = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 100; // initial visible characters

  if (text.length <= limit) return <p className="text-gray-700 text-base mb-4">{text}</p>;

  return (
    <div className="text-gray-700 text-base mb-4">
      {expanded ? text : text.slice(0, limit) + "..."}
      <Button
        size="sm"
        variant="link"
        className="text-secondary ml-2 p-0 underline hover:text-primary"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Show More"}
      </Button>
    </div>
  );
};
