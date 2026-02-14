import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import storiesWellness from "@/assets/stories-wellness.jpg";
import storiesCultural from "@/assets/stories-cultural.jpg";
import storiesNature from "@/assets/stories-nature.jpg";
import storiesCoastal from "@/assets/stories-coastal.jpg";

const stories = [
  {
    category: "WELLNESS",
    title: "Wellness & Spa",
    description:
      "Experience holistic rejuvenation at AaraWild's world-class wellness retreats.",
    image: storiesWellness,
    link: "/wellness",
  },
  {
    category: "Cultural",
    title: "Cultural Excursions",
    description:
      "Explore vibrant local cultures with curated experiences at AaraWild destinations.",
    image: storiesCultural,
    link: "/experiences",
  },
  {
    category: "Nature",
    title: "Nature Trails",
    description:
      "Discover breathtaking landscapes and diverse wildlife on guided nature trails.",
    image: storiesNature,
    link: "/experiences",
  },
  {
    category: "Coastal",
    title: "At Water's Edge",
    description:
      "Across the AaraWild globe, oceanfront retreats offer the balm of sun, sea and sand.",
    image: storiesCoastal,
    link: "/gallery",
  },
];

const StoriesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollTo = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 3;
      const newIndex =
        direction === "left"
          ? Math.max(0, currentIndex - 1)
          : Math.min(stories.length - 3, currentIndex + 1);
      setCurrentIndex(newIndex);
      carouselRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="stories" className="py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif tracking-luxury">
            Stories
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("left")}
              className="w-12 h-12 border border-foreground/30 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo("right")}
              className="w-12 h-12 border border-foreground/30 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
              disabled={currentIndex >= stories.length - 3}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-none w-[calc(100%-2rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-6 aspect-[4/5]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <p className="luxury-subheading text-muted-foreground mb-2">
                {story.category}
              </p>
              <h3 className="text-xl lg:text-2xl font-serif tracking-wide mb-3 group-hover:opacity-70 transition-opacity">
                {story.title}
              </h3>
              <p className="luxury-body text-muted-foreground text-sm leading-relaxed">
                {story.description}
              </p>
              <Link
                to={story.link}
                className="luxury-link mt-4 inline-block text-foreground"
              >
                Discover More
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                if (carouselRef.current) {
                  const cardWidth = carouselRef.current.offsetWidth / 3;
                  carouselRef.current.scrollTo({
                    left: index * cardWidth,
                    behavior: "smooth",
                  });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-foreground w-6"
                  : "bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesCarousel;
