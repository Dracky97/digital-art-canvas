import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import indiaWilderness from "@/assets/india-wilderness.jpg";
import skiMountains from "@/assets/ski-mountains.jpg";
import coastalPool from "@/assets/coastal-pool.jpg";

const experiences = [
  {
    title: "Wildlife Safaris",
    description: "Embark on extraordinary wildlife encounters led by expert naturalists, from tracking Bengal tigers to witnessing the great migration.",
    image: indiaWilderness,
    duration: "Half Day - Full Day",
  },
  {
    title: "Mountain Expeditions",
    description: "Scale pristine peaks with world-class guides, whether you're seeking challenging climbs or scenic alpine walks.",
    image: skiMountains,
    duration: "2-7 Days",
  },
  {
    title: "Wellness Retreats",
    description: "Immerse yourself in holistic healing traditions, from ancient Ayurvedic treatments to modern wellness therapies.",
    image: coastalPool,
    duration: "3-14 Days",
  },
];

const activities = [
  "Private Yoga Sessions",
  "Guided Meditation",
  "Culinary Workshops",
  "Art & Culture Tours",
  "Stargazing Experiences",
  "Conservation Programs",
  "Water Sports",
  "Helicopter Tours",
];

const Experiences = () => {
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
              Experiences
            </h1>
            <p className="luxury-body text-muted-foreground max-w-2xl">
              Curated journeys that transcend the ordinary. Each experience is designed to 
              create lasting memories and profound connections with the world around you.
            </p>
          </motion.div>
        </section>

        {/* Featured Experiences */}
        <section className="px-6 lg:px-12 mb-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="aspect-[3/4] overflow-hidden mb-6">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="luxury-subheading text-muted-foreground mb-2 block">
                    {experience.duration}
                  </span>
                  <h3 className="text-2xl font-serif tracking-luxury mb-3">
                    {experience.title}
                  </h3>
                  <p className="luxury-body text-muted-foreground mb-4">
                    {experience.description}
                  </p>
                  <button className="luxury-subheading hover:opacity-60 transition-opacity">
                    Learn More →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="px-6 lg:px-12 py-20 bg-secondary/30">
          <div className="max-w-[1800px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif tracking-luxury mb-12 text-center"
            >
              Activities & Adventures
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-6 border border-foreground/10 hover:border-foreground/30 transition-colors duration-300 text-center"
                >
                  <span className="font-serif tracking-wide">{activity}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Experiences;
