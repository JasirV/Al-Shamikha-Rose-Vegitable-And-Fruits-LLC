import React from 'react'
import fruitsImage from "@/assets/fruits-collection.jpg";
import vegetablesImage from "@/assets/vegetables-collection.jpg";
import ProductCard from '@/components/ProductCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Products: React.FC = () => {
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
    
  return (
    <div>
        <Navigation />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          </div>
          </section>
          <Footer/>
    </div>
  )
}

export default Products