import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import coastalPool from "@/assets/coastal-pool.jpg";
import heroReflectionPool from "@/assets/hero-reflection-pool.jpg";

const treatments = [
  {
    name: "Signature Massage",
    duration: "90 minutes",
    description: "A deeply restorative full-body massage combining ancient techniques with modern wellness practices.",
  },
  {
    name: "Ayurvedic Ritual",
    duration: "120 minutes",
    description: "Traditional Ayurvedic treatments tailored to your dosha, promoting balance and inner harmony.",
  },
  {
    name: "Ocean Renewal Facial",
    duration: "75 minutes",
    description: "A rejuvenating facial using marine-derived ingredients and advanced skincare techniques.",
  },
  {
    name: "Sound Healing Journey",
    duration: "60 minutes",
    description: "Experience deep relaxation through the healing vibrations of crystal singing bowls and gongs.",
  },
];

const facilities = [
  "Infinity Pool",
  "Steam Room",
  "Sauna",
  "Ice Bath",
  "Meditation Pavilion",
  "Yoga Studio",
  "Fitness Center",
  "Treatment Rooms",
];

const Wellness = () => {
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
              Wellness
            </h1>
            <p className="luxury-body text-muted-foreground max-w-2xl">
              A sanctuary for renewal and restoration. Our holistic approach to wellness 
              nurtures body, mind, and spirit through ancient wisdom and modern practices.
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
                src={heroReflectionPool}
                alt="Wellness spa"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Treatments */}
        <section className="px-6 lg:px-12 mb-24">
          <div className="max-w-[1800px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif tracking-luxury mb-12"
            >
              Signature Treatments
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {treatments.map((treatment, index) => (
                <motion.div
                  key={treatment.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-8 border border-foreground/10 hover:border-foreground/30 transition-colors duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-serif tracking-luxury">{treatment.name}</h3>
                    <span className="luxury-subheading text-muted-foreground">{treatment.duration}</span>
                  </div>
                  <p className="luxury-body text-muted-foreground">{treatment.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="px-6 lg:px-12 py-20 bg-secondary/30 mb-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                  Spa Facilities
                </h2>
                <p className="luxury-body text-muted-foreground mb-8">
                  Our world-class facilities are designed to complement your wellness journey, 
                  offering spaces for both invigorating exercise and peaceful contemplation.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {facilities.map((facility) => (
                    <div key={facility} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-foreground/30 rounded-full" />
                      <span className="font-serif">{facility}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="aspect-square overflow-hidden"
              >
                <img
                  src={coastalPool}
                  alt="Spa facilities"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Wellness Programs */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[1800px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                Wellness Programs
              </h2>
              <p className="luxury-body text-muted-foreground max-w-2xl mx-auto mb-8">
                Immersive multi-day programs designed by our wellness experts to address 
                specific goals, from stress relief to fitness transformation.
              </p>
              <button className="luxury-subheading px-8 py-4 border border-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                Explore Programs
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Wellness;
