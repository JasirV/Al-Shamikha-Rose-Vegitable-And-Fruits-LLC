// components/ui/NewsletterCTA.tsx
import React from "react";

const NewsletterCTA: React.FC = () => {
  return (
    <section className="py-16 bg-green-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Stay Updated with <span className="text-gradient-primary">Warda al Shamikha</span>
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Subscribe to our newsletter to get the latest deals, new arrivals, and fresh tips delivered straight to your inbox.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 w-full sm:w-auto flex-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button className="px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
