import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import coastalPool from "@/assets/coastal-pool.jpg";
import heroReflectionPool from "@/assets/hero-reflection-pool.jpg";

const rituals = [
  {
    name: "Aara Rebalance",
    focus: "Realigning energy flow and releasing tension.",
    process: "Warm oil head massage, herbal body compress, guided breathing, and aromatic tea ritual.",
  },
  {
    name: "Herbal Revival",
    focus: "Rejuvenation and inner glow.",
    process: "Organic rice and sandalwood scrub exfoliation, warm oil therapy, and a turmeric and rose essence facial.",
  },
  {
    name: "Forest Detox",
    focus: "Deep cleansing using forest purity.",
    process: "Steam therapy (lemongrass/eucalyptus), green tea and herbal oil detox massage, and an open-sky shower.",
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-luxury mb-6">
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
                src={heroReflectionPool}
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
                  src={coastalPool}
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
                  className="p-8 border border-foreground/10 hover:border-foreground/30 transition-colors duration-300"
                >
                  <h3 className="text-xl font-serif tracking-luxury mb-3">{ritual.name}</h3>
                  <p className="luxury-subheading text-muted-foreground mb-4">{ritual.focus}</p>
                  <p className="luxury-body text-muted-foreground">{ritual.process}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Wellness Pavilion */}
        <section className="px-6 lg:px-12 py-20 bg-secondary/30 mb-24">
          <div className="max-w-[1800px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="luxury-subheading text-muted-foreground mb-4">FACILITIES</p>
              <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                The Wellness Pavilion
              </h2>
              <p className="luxury-body text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Designed to immerse guests in nature while providing refined relaxation.
                Open-air treatment rooms, forest-view meditation decks, and herbal steam chambers
                create a sanctuary where healing happens effortlessly.
              </p>
            </motion.div>
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
