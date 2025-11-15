import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
}

const MoreProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          orderBy("createdAt", "desc"), // latest added first
          limit(8)
        );
        const querySnapshot = await getDocs(q);

        const fetchedProducts: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-lg text-gray-500">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-lg text-gray-500">
        No products available.
      </div>
    );
  }

  // Duplicate for smooth loop
  const loopProducts = [...products, ...products];

  return (
    <section className="bg-green-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover More{" "}
            <span className="text-gradient-primary">Delights</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fresh, organic, and carefully selected produce delivered straight to
            your doorstep.
          </p>
        </div>

        {/* Product Scroller */}
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
                <ProductCard
                  id={parseInt(product.id, 10)} // convert string to number
                  name={product.name}
                  price={Number(product.price)}
                  imageUrl={product.imageUrl}
                  category={product.category}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MoreProducts;
