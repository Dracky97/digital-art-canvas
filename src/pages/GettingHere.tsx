import { motion } from "framer-motion";
import { Plane, Car, Ship } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import amangiriDesert from "@/assets/amangiri-desert.jpg";

const transferOptions = [
  {
    icon: Plane,
    title: "By Air",
    description: "Private jet and helicopter transfers available from major international airports. Our aviation concierge will arrange seamless travel tailored to your schedule.",
    details: [
      "Private jet charter from any global destination",
      "Helicopter transfers from nearby airports",
      "VIP airport meet and greet service",
      "Customs and immigration assistance",
    ],
  },
  {
    icon: Car,
    title: "By Road",
    description: "Luxury vehicle transfers with professional chauffeurs. Enjoy scenic routes through breathtaking landscapes in ultimate comfort.",
    details: [
      "Mercedes-Maybach fleet available",
      "Experienced multilingual chauffeurs",
      "Refreshments and amenities on board",
      "Flexible pickup locations",
    ],
  },
  {
    icon: Ship,
    title: "By Sea",
    description: "For coastal destinations, arrive in style aboard our private yacht or arrange transfers from nearby marinas.",
    details: [
      "Private yacht charter available",
      "Speedboat transfers for island locations",
      "Scenic coastal cruises",
      "Sunset arrival experiences",
    ],
  },
];

const GettingHere = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="px-6 lg:px-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[1800px] mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-luxury mb-6">
              Getting Here
            </h1>
            <p className="luxury-body text-muted-foreground max-w-2xl">
              Your journey to AaraWild begins the moment you decide to visit. We ensure every 
              aspect of your travel is as exceptional as your stay.
            </p>
          </motion.div>
        </section>

        {/* Hero Image */}
        <section className="px-6 lg:px-12 mb-24">
          <div className="max-w-[1800px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="aspect-[21/9] overflow-hidden"
            >
              <img
                src={amangiriDesert}
                alt="Journey to AaraWild"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Transfer Options */}
        <section className="px-6 lg:px-12 mb-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {transferOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-8 border border-foreground/10"
                >
                  <option.icon className="w-8 h-8 mb-6" strokeWidth={1} />
                  <h3 className="text-2xl font-serif tracking-luxury mb-4">{option.title}</h3>
                  <p className="luxury-body text-muted-foreground mb-6">{option.description}</p>
                  <ul className="space-y-3">
                    {option.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm">
                        <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full mt-2" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Info */}
        <section className="px-6 lg:px-12 py-20 bg-secondary/30">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                  Location
                </h2>
                <p className="luxury-body text-muted-foreground mb-8">
                  Nestled in one of the world's most pristine landscapes, AaraWild offers 
                  seclusion without sacrificing accessibility. Our dedicated travel team 
                  is available 24/7 to assist with every detail of your journey.
                </p>
                <div className="space-y-6">
                  <div>
                    <span className="luxury-subheading text-muted-foreground block mb-1">Address</span>
                    <span className="font-serif">Private Estate, Wilderness Reserve<br />Remote Location, Country</span>
                  </div>
                  <div>
                    <span className="luxury-subheading text-muted-foreground block mb-1">Coordinates</span>
                    <span className="font-serif">Available upon confirmation</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                  Travel Assistance
                </h2>
                <p className="luxury-body text-muted-foreground mb-8">
                  Our travel concierge is available around the clock to assist with 
                  visa requirements, travel documentation, and any special arrangements 
                  you may require.
                </p>
                <button className="luxury-subheading px-8 py-4 border border-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                  Contact Travel Concierge
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GettingHere;
