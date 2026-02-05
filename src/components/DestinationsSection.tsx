import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroReflection from "@/assets/hero-reflection-pool.jpg";

const DestinationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={sectionRef} id="destinations" className="relative h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <img
          src={heroReflection}
          alt="AaraWild Destinations - Reflection Pool"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-primary-foreground">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="luxury-subheading mb-4 text-primary-foreground/80"
          >
            DISCOVER
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-serif tracking-luxury mb-8"
          >
            Destinations
          </motion.h2>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
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

export default DestinationsSection;
