import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import indiaWilderness from "@/assets/india-wilderness.jpg";

const JourneysSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  return (
    <section ref={sectionRef} id="journeys" className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <img
          src={indiaWilderness}
          alt="AaraWild Journeys"
          className="w-full h-full object-cover"
        />
        <div className="video-overlay absolute inset-0" />
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-primary-foreground">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="luxury-subheading mb-4 text-primary-foreground/80"
        >
          EXPLORE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-7xl font-serif tracking-luxury mb-8"
        >
          Journeys
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          viewport={{ once: true }}
          className="luxury-body max-w-xl mx-auto text-primary-foreground/90 mb-8 px-6"
        >
          Embark on transformative journeys that connect you with the world's most
          extraordinary destinations and experiences.
        </motion.p>
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          viewport={{ once: true }}
          href="#"
          className="luxury-link text-primary-foreground after:bg-primary-foreground"
        >
          Discover More
        </motion.a>
      </div>
    </section>
  );
};

export default JourneysSection;
