import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/video-thumbnail.jpg";

const HeroVideo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <img
          src={heroImage}
          alt="AaraWild at Sea"
          className="w-full h-full object-cover"
        />
        <div className="video-overlay absolute inset-0" />
      </motion.div>

      {/* Center Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h2 className="text-5xl lg:text-8xl font-serif tracking-luxury-wide text-primary-foreground drop-shadow-lg">
          AARAWILD
        </h2>
      </motion.div>

      {/* Bottom Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-12 left-6 lg:left-12 text-primary-foreground"
      >
        <p className="luxury-subheading mb-2 text-primary-foreground/80">
          AARAWILD
        </p>
        <h3 className="text-2xl lg:text-4xl font-serif tracking-wide mb-4">
          Opens for Reservations
        </h3>
        <a
          href="#discover"
          className="luxury-link text-primary-foreground after:bg-primary-foreground"
        >
          Discover More
        </a>
      </motion.div>

      {/* Video Controls Overlay */}
      <div className="absolute bottom-12 right-6 lg:right-12 flex items-center gap-4 text-primary-foreground">
        <button className="w-12 h-12 border border-primary-foreground/50 rounded-full flex items-center justify-center hover:bg-primary-foreground/10 transition-colors duration-300">
          <div className="w-0 h-0 border-l-8 border-l-primary-foreground border-y-4 border-y-transparent ml-1" />
        </button>
      </div>
    </section>
  );
};

export default HeroVideo;
