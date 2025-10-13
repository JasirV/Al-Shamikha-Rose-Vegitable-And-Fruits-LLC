import { Leaf, Truck, ShieldCheck, Clock, Star } from "lucide-react";

const features = [
  {
    icon: <Leaf className="text-green-500 h-8 w-8" />,
    title: "100% Fresh & Organic",
    description:
      "We source directly from trusted farms to ensure every product is fresh, healthy, and chemical-free.",
  },
  {
    icon: <Truck className="text-green-500 h-8 w-8" />,
    title: "Fast & Reliable Delivery",
    description:
      "Enjoy same-day delivery across Dubai with our efficient delivery partners — freshness at your door.",
  },
  {
    icon: <ShieldCheck className="text-green-500 h-8 w-8" />,
    title: "Quality Guaranteed",
    description:
      "Each item passes a strict quality check before it reaches you, ensuring satisfaction with every order.",
  },
  {
    icon: <Clock className="text-green-500 h-8 w-8" />,
    title: "Flexible Scheduling",
    description:
      "Choose your preferred delivery time — morning, noon, or evening — we adjust to your schedule.",
  },
  {
    icon: <Star className="text-green-500 h-8 w-8" />,
    title: "Trusted by Customers",
    description:
      "Thousands of happy customers across Dubai trust Fresh Harvest for their daily fruits and veggies.",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient-primary">Fresh Harvest?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Because we care about your health, time, and satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
