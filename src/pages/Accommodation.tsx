import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import beachCasita from "@/assets/beach-casita.jpg";
import tokyoInterior from "@/assets/tokyo-interior.jpg";
import coastalPool from "@/assets/coastal-pool.jpg";

const accommodations = [
  {
    name: "Ocean View Suite",
    description: "Wake to the sound of waves in our signature oceanfront suites, featuring floor-to-ceiling windows and private balconies.",
    image: beachCasita,
    size: "85 sqm",
    guests: "2 Adults",
    features: ["Ocean View", "Private Balcony", "Spa Bath"],
  },
  {
    name: "Garden Villa",
    description: "Secluded villas nestled within lush tropical gardens, offering complete privacy and a personal plunge pool.",
    image: tokyoInterior,
    size: "120 sqm",
    guests: "2-4 Adults",
    features: ["Private Pool", "Garden", "Butler Service"],
  },
  {
    name: "Presidential Suite",
    description: "The pinnacle of luxury living, featuring multiple bedrooms, a private spa, and panoramic views of the landscape.",
    image: coastalPool,
    size: "250 sqm",
    guests: "4-6 Adults",
    features: ["Private Spa", "Chef's Kitchen", "Helipad Access"],
  },
];

const Accommodation = () => {
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
              Accommodation
            </h1>
            <p className="luxury-body text-muted-foreground max-w-2xl">
              Each residence is a sanctuary of refined elegance, thoughtfully designed to 
              harmonize with its natural surroundings while offering uncompromising luxury.
            </p>
          </motion.div>
        </section>

        {/* Accommodation List */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[1800px] mx-auto space-y-24">
            {accommodations.map((accommodation, index) => (
              <motion.div
                key={accommodation.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={accommodation.image}
                      alt={accommodation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                    {accommodation.name}
                  </h2>
                  <p className="luxury-body text-muted-foreground mb-8">
                    {accommodation.description}
                  </p>
                  <div className="flex gap-8 mb-8">
                    <div>
                      <span className="luxury-subheading text-muted-foreground block mb-1">Size</span>
                      <span className="font-serif text-lg">{accommodation.size}</span>
                    </div>
                    <div>
                      <span className="luxury-subheading text-muted-foreground block mb-1">Guests</span>
                      <span className="font-serif text-lg">{accommodation.guests}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {accommodation.features.map((feature) => (
                      <span
                        key={feature}
                        className="luxury-subheading px-4 py-2 border border-foreground/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button className="luxury-subheading px-8 py-4 border border-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Accommodation;
