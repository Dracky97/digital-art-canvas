import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import wellnessHero from "@/assets/wellness-hero.jpg";
import wellnessPhilosophy from "@/assets/wellness-philosophy.jpg";
import wellnessRebalance from "@/assets/wellness-rebalance.jpg";
import wellnessRevival from "@/assets/wellness-revival.jpg";
import wellnessDetox from "@/assets/wellness-detox.jpg";
import wellnessPavilion from "@/assets/wellness-pavilion.jpg";

const rituals = [
  {
    name: "Aara Rebalance",
    focus: "Realigning energy flow and releasing tension.",
    process: "Warm oil head massage, herbal body compress, guided breathing, and aromatic tea ritual.",
    image: wellnessRebalance,
  },
  {
    name: "Herbal Revival",
    focus: "Rejuvenation and inner glow.",
    process: "Organic rice and sandalwood scrub exfoliation, warm oil therapy, and a turmeric and rose essence facial.",
    image: wellnessRevival,
  },
  {
    name: "Forest Detox",
    focus: "Deep cleansing using forest purity.",
    process: "Steam therapy (lemongrass/eucalyptus), green tea and herbal oil detox massage, and an open-sky shower.",
    image: wellnessDetox,
  },
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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-luxury mb-6">
              Wellness & Spa
            </h1>
            <p className="luxury-body text-muted-foreground max-w-2xl text-lg leading-relaxed">
              A journey of rediscovery guided by nature's wisdom. Simplicity and purity —
              open spaces, sunlight, forest breezes, and herbal oils.
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
                src={wellnessHero}
                alt="Wellness spa surrounded by nature"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="px-6 lg:px-12 mb-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="luxury-subheading text-muted-foreground mb-4">PHILOSOPHY</p>
                <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                  Inspired by Ayurveda & Nature
                </h2>
                <p className="luxury-body text-muted-foreground mb-6 leading-relaxed">
                  Treatments are personalized based on a wellness consultation to balance
                  your body's dosha — Vata, Pitta, or Kapha. Our approach draws from
                  centuries of Ayurvedic wisdom, harmonizing ancient practice with the
                  healing power of the natural world.
                </p>
                <p className="font-serif text-lg italic text-muted-foreground">
                  "Healing begins when you slow down enough to listen to nature."
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="aspect-[4/5] overflow-hidden"
              >
                <img
                  src={wellnessPhilosophy}
                  alt="Ayurvedic wellness space"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Signature Rituals */}
        <section className="px-6 lg:px-12 mb-24">
          <div className="max-w-[1800px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif tracking-luxury mb-4"
            >
              Signature Rituals
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="luxury-body text-muted-foreground mb-12 max-w-xl"
            >
              Each ritual is a carefully curated sequence designed to restore, rejuvenate, and reconnect.
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8">
              {rituals.map((ritual, index) => (
                <motion.div
                  key={ritual.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="border border-foreground/10 hover:border-foreground/30 transition-colors duration-300 overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={ritual.image}
                      alt={ritual.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-serif tracking-luxury mb-3">{ritual.name}</h3>
                    <p className="luxury-subheading text-muted-foreground mb-4">{ritual.focus}</p>
                    <p className="luxury-body text-muted-foreground">{ritual.process}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Wellness Pavilion */}
        <section className="px-6 lg:px-12 mb-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-0">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="aspect-[16/10] overflow-hidden"
              >
                <img
                  src={wellnessPavilion}
                  alt="The Wellness Pavilion"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center p-12 lg:p-16 bg-secondary/30"
              >
                <p className="luxury-subheading text-muted-foreground mb-4">FACILITIES</p>
                <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                  The Wellness Pavilion
                </h2>
                <p className="luxury-body text-muted-foreground leading-relaxed">
                  Designed to immerse guests in nature while providing refined relaxation.
                  Open-air treatment rooms, forest-view meditation decks, and herbal steam chambers
                  create a sanctuary where healing happens effortlessly.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Closing Quote */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[1800px] mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-serif tracking-luxury text-muted-foreground italic max-w-3xl mx-auto"
            >
              "At Aara, we don't just treat the body — we nurture the soul."
            </motion.p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Wellness;
