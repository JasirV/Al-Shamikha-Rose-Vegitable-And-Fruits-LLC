// src/pages/ReturnPolicy.tsx
import React from "react";

const ReturnPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-heading font-bold mb-6 text-gradient-primary animate-fade-in-up">
        Return Policy
      </h1>

      <p className="mb-6 text-lg text-foreground">
        We strive to provide the best products and services for our customers.
        Please read our return policy carefully before placing your order.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">
          General Returns
        </h2>
        <p className="text-foreground mb-2">
          You may return most items within <strong>7 days</strong> of delivery
          for a full refund or exchange, provided the items are unused, in their
          original packaging, and in sellable condition.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Non-Returnable Items
        </h2>
        <ul className="list-disc list-inside text-foreground space-y-2">
          <li>Fresh fruits and vegetables cannot be returned.</li>
          <li>Perishable goods are final sale.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Damaged or Defective Items
        </h2>
        <p className="text-foreground mb-2">
          All returned items will be thoroughly checked upon arrival. If any
          item is found damaged or defective, we will process a full refund or
          replacement as per our policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-heading font-semibold mb-4">How to Return</h2>
        <ol className="list-decimal list-inside text-foreground space-y-2">
          <li>Contact our support team with your order number and reason for return.</li>
          <li>Pack the item securely in its original packaging.</li>
          <li>Ship the item to the address provided by our support team.</li>
          <li>Once received and inspected, your refund or replacement will be processed.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-heading font-semibold mb-4">Contact Us</h2>
        <p className="text-foreground">
          For any questions regarding our return policy, please contact us at{" "}
          <a href="mailto:info@rosevegitables.com" className="text-primary underline">
            info@yourdomain.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default ReturnPolicy;
