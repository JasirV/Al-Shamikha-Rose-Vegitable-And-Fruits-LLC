import React from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import fruitsImage from "@/assets/fruits-collection.jpg";
import vegetablesImage from "@/assets/vegetables-collection.jpg";

const products = [
  { id: 1, name: "Juicy Mangoes", price: 30, image: fruitsImage, category: "Fruits" },
  { id: 2, name: "Organic Spinach", price: 10, image: vegetablesImage, category: "Vegetables" },
  { id: 3, name: "Fresh Pineapple", price: 22, image: fruitsImage, category: "Fruits" },
  { id: 4, name: "Red Bell Peppers", price: 18, image: vegetablesImage, category: "Vegetables" },
  { id: 5, name: "Strawberries", price: 25, image: fruitsImage, category: "Fruits" },
  { id: 6, name: "Broccoli", price: 15, image: vegetablesImage, category: "Vegetables" },
  { id: 7, name: "Organic Spinach", price: 10, image: vegetablesImage, category: "Vegetables" },
  { id: 8, name: "Fresh Pineapple", price: 22, image: fruitsImage, category: "Fruits" },
];

const MoreProducts: React.FC = () => {
  // Duplicate products for seamless loop
  const loopProducts = [...products, ...products];

  return (
    <section className="py-24 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover More <span className="text-gradient-primary">Delights</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fresh, organic, and carefully selected produce delivered straight to your doorstep.
          </p>
        </div>

        <div className="overflow-hidden relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {loopProducts.map((product, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="min-w-[220px] max-w-[220px] flex-shrink-0"
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MoreProducts;
