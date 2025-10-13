import Navigation from "@/components/Navigation";
import { Clock, Package, Truck, ShieldCheck, Phone, Calendar } from "lucide-react";
import deliveryImage from "@/assets/delivery-service.jpg";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      icon: Clock,
      title: "Same-Day Delivery",
      description:
        "Order before 2 PM and get your fresh produce delivered the same day. Perfect for last-minute needs.",
      features: ["Available 7 days a week", "Premium quality guaranteed", "Real-time tracking"],
    },
    {
      icon: Calendar,
      title: "Scheduled Delivery",
      description:
        "Plan ahead and schedule your delivery for a convenient time that works for you.",
      features: ["Flexible time slots", "Weekly subscriptions", "Never miss a delivery"],
    },
    {
      icon: Package,
      title: "Bulk Orders",
      description:
        "Special rates for restaurants, cafes, and large families. Get wholesale prices on bulk purchases.",
      features: ["Wholesale pricing", "Priority delivery", "Dedicated account manager"],
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Quality Assurance",
      description: "Every item is inspected for freshness and quality before packaging",
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free delivery on orders above AED 100 across Dubai",
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Our customer service team is always ready to help you",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Our Delivery Services
          </h1>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in-up opacity-90">
            Flexible delivery options designed to fit your lifestyle
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`grid md:grid-cols-2 gap-12 items-center animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {isEven ? (
                    <>
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Icon className="h-7 w-7 text-primary" />
                          </div>
                          <h2 className="text-3xl font-bold">{service.title}</h2>
                        </div>
                        <p className="text-lg text-muted-foreground mb-6">
                          {service.description}
                        </p>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              </div>
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl overflow-hidden shadow-xl hover-lift">
                        <img
                          src={deliveryImage}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="rounded-2xl overflow-hidden shadow-xl hover-lift md:order-first">
                        <img
                          src={deliveryImage}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                            <Icon className="h-7 w-7 text-secondary" />
                          </div>
                          <h2 className="text-3xl font-bold">{service.title}</h2>
                        </div>
                        <p className="text-lg text-muted-foreground mb-6">
                          {service.description}
                        </p>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 rounded-full bg-secondary" />
                              </div>
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Why Our <span className="text-gradient-primary">Service</span> Stands Out
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-8 rounded-2xl shadow-sm hover-lift hover-glow border border-border/50 text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary mx-auto flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
  <div className="container mx-auto px-4 text-center">
    <div className="max-w-3xl mx-auto bg-gradient-to-r from-green-600 to-green-400 text-white rounded-3xl p-12 shadow-2xl transform transition-all hover:scale-105">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Ready to Get Started?
      </h2>
      <p className="text-xl md:text-2xl mb-8 opacity-90">
        Contact us today to learn more about our services and special offers
      </p>
      <a
        href="/contact"
        className="inline-block px-8 py-4 bg-white text-green-700 font-semibold rounded-full hover:bg-green-100 transition-all shadow-md"
      >
        Contact Us Now
      </a>
    </div>
  </div>
</section>


      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Services;
