import Navigation from "@/components/Navigation";
import { Heart, Target, Award, Users } from "lucide-react";
import fruitsImage from "@/assets/fruits-collection.jpg";
import vegetablesImage from "@/assets/vegetables-collection.jpg";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description:
        "We handpick every fruit and vegetable to ensure only the freshest produce reaches your table.",
    },
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To make fresh, healthy produce accessible to every home in Al Shamkha 15  Abu Dhabi with reliable and timely delivery.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Award-winning service with thousands of satisfied customers across Al Shamkha 15  Abu Dhabi.",
    },
    {
      icon: Users,
      title: "Customer Care",
      description:
        "Dedicated support team always ready to help you with your orders and queries.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Warda al Shamikha | Fresh Fruits & Vegetables Abu Dhabi</title>
        <meta
          name="description"
          content="Learn about Warda al Shamikha, your trusted partner for fresh fruits and vegetables in Abu Dhabi. Quality, freshness, and customer satisfaction guaranteed."
        />
        <meta
          name="keywords"
          content="Warda al Shamikha Abu Dhabi, fresh fruits Abu Dhabi, vegetables delivery Abu Dhabi, organic produce Abu Dhabi, farm-fresh fruits Abu Dhabi"
        />
        <meta name="author" content="Warda al Shamikha" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="About Warda al Shamikha | Fresh Fruits & Vegetables Abu Dhabi" />
        <meta property="og:description" content="Learn about Warda al Shamikha, your trusted partner for fresh fruits and vegetables in Abu Dhabi." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={fruitsImage} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Warda al Shamikha | Fresh Fruits & Vegetables Abu Dhabi" />
        <meta name="twitter:description" content="Learn about Warda al Shamikha, your trusted partner for fresh fruits and vegetables in Abu Dhabi." />
        <meta name="twitter:image" content={fruitsImage} />

        {/* Structured Data for Local Business */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Warda al Shamikha",
              "image": "${fruitsImage}",
              "@id": "",
              "url": "",
              "telephone": "+971547453650",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Al Shamkha 15, Abu Dhabi",
                "addressCountry": "AE"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "07:00",
                "closes": "22:00"
              }
            }
          `}
        </script>
      </Helmet>
      <Navigation />

      {/* Header */}
      <section className="gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            About Warda al Shamikha
          </h1>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in-up opacity-90">
            Your trusted partner for fresh fruits and vegetables in   Abu Dhabi
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-6">
                Our <span className="text-gradient-primary">Story</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Warda al Shamikha  Abu Dhabi was born from a simple yet powerful
                  belief: everyone deserves access to farm-fresh, premium
                  quality produce.
                </p>
                <p>
                  We work directly with local and international farms to bring
                  you the freshest fruits and vegetables at the best prices. Our
                  commitment to quality means we never compromise – every item
                  is carefully inspected before it reaches your doorstep.
                </p>
                <p>
                  From our humble beginnings to becoming   Abu Dhabi's trusted fresh
                  produce delivery service, we've maintained our core values:
                  freshness, quality, and customer satisfaction.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-scale-in">
              <img
                src={fruitsImage}
                alt="Fresh fruits"
                className="rounded-2xl shadow-lg hover-lift"
              />
              <img
                src={vegetablesImage}
                alt="Fresh vegetables"
                className="rounded-2xl shadow-lg hover-lift mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Why <span className="text-gradient-primary">Choose Us</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're more than just a delivery service – we're your partners in
              healthy living
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-6 rounded-2xl shadow-sm hover-lift hover-glow border border-border/50 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative h-[60vh] w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${fruitsImage})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
              Taste the Freshness of Nature
            </h2>
            <p className="text-lg md:text-2xl text-white/90 animate-fade-in-up">
              Experience farm-fresh fruits and vegetables delivered right to
              your doorstep
            </p>
          </div>
        </div>
      </section>


      {/* After Parallax Image Section: Our Offerings */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Discover <span className="text-gradient-primary">Our Offerings</span>
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
        From farm to your table, we bring the freshest fruits and vegetables with unmatched quality and service.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="p-6 bg-green-50 rounded-2xl shadow-lg hover-lift text-center animate-fade-in-up">
        <img src={fruitsImage} alt="Fruits" className="rounded-2xl mb-4 w-full h-48 object-cover"/>
        <h3 className="text-xl font-semibold mb-2">Fresh Fruits</h3>
        <p className="text-muted-foreground">
          Handpicked fruits sourced daily from trusted farms for maximum freshness.
        </p>
      </div>

      <div className="p-6 bg-green-50 rounded-2xl shadow-lg hover-lift text-center animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <img src={vegetablesImage} alt="Vegetables" className="rounded-2xl mb-4 w-full h-48 object-cover"/>
        <h3 className="text-xl font-semibold mb-2">Organic Vegetables</h3>
        <p className="text-muted-foreground">
          Fresh, organic vegetables delivered straight to your doorstep.
        </p>
      </div>

      <div className="p-6 bg-green-50 rounded-2xl shadow-lg hover-lift text-center animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <img src={fruitsImage} alt="Special Offers" className="rounded-2xl mb-4 w-full h-48 object-cover"/>
        <h3 className="text-xl font-semibold mb-2">Special Offers</h3>
        <p className="text-muted-foreground">
          Weekly specials and seasonal bundles for our valued customers.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-500 to-green-700 text-white rounded-3xl p-12 shadow-2xl transform transition-all hover:scale-105">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Experience Warda al Shamikha?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join thousands of satisfied customers enjoying farm-fresh produce
              delivered to their homes
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-green-700 font-semibold rounded-full hover:bg-opacity-90 transition-all shadow-md"
            >
              Start Ordering Today
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
