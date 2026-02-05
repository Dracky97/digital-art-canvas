import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import beachCasita from "@/assets/beach-casita.jpg";
import tokyoInterior from "@/assets/tokyo-interior.jpg";
import coastalPool from "@/assets/coastal-pool.jpg";

const accommodations = [
  {
    name: "Mud House",
    description: "Rustic yet refined villas crafted from natural materials, seamlessly blending into the surrounding landscape.",
    image: beachCasita,
    size: "85 sqm",
    guests: "4 Adults",
    features: ["Paddyfield View", "1 King-Size Bed", "2 Deluxe Beds", "Bathtub"],
  },
  {
    name: "Tree House",
    description: "Elevated sanctuaries nestled among the treetops, offering panoramic views and a unique connection to nature.",
    image: tokyoInterior,
    size: "120 sqm",
    guests: "4 Adults",
    features: ["Forest View", "Jacuzzi Tub", "2 King-Size Beds"],
  },
  {
    name: "Luxury Glamping",
    description: "Opulent tents set in breathtaking locations, combining the adventure of camping with the comforts of a five-star hotel.",
    image: coastalPool,
    size: "250 sqm",
    guests: "4 Adults",
    features: ["1 King-Size Bed", "2 Deluxe Beds", "Indoor & Indoor Bathrooms"],
  },
  {
    name: "Luxury Suite",
    description: "The pinnacle of luxury living, featuring a private spa, and panoramic views of the landscape.",
    image: coastalPool,
    size: "250 sqm",
    guests: "4 Adults",
    features: ["2 Beds", "Private Pool"],
  },
  {
    name: "Family Suite",
    description: "The pinnacle of luxury living, featuring a private spa, and panoramic views of the landscape.",
    image: coastalPool,
    size: "250 sqm",
    guests: "7 Adults",
    features: ["3 King-Size Beds", "3 Bathrooms"],
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
