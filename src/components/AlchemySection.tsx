import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import coastalPool from "@/assets/coastal-pool.jpg";

const AlchemySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <img
          src={coastalPool}
          alt="The Alchemy of AaraWild"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
      </motion.div>

      <div className="absolute inset-0 flex items-center">
        <div className="px-6 lg:px-24 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="luxury-subheading mb-4 text-primary-foreground/80"
          >
            WELLNESS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-serif tracking-luxury mb-6 text-primary-foreground"
          >
            The Alchemy of AaraWild
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            viewport={{ once: true }}
            className="luxury-body text-primary-foreground/90 mb-8"
          >
            Drawing on centuries of traditional wisdom and cutting-edge science,
            AaraWild's holistic approach to wellness transcends the ordinary,
            offering pathways to profound transformation.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            viewport={{ once: true }}
            href="#"
            className="luxury-link text-primary-foreground after:bg-primary-foreground"
          >
            Discover More
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default AlchemySection;
