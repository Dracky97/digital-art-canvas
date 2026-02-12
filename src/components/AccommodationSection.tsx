import { motion } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import roomMudHouse from "@/assets/room-mud-house.jpg";
import roomTreehouse from "@/assets/room-treehouse.jpg";
import roomGlamping from "@/assets/room-glamping.jpg";
import roomLuxurySuite from "@/assets/room-luxury-suite.jpg";
import roomFamilySuite from "@/assets/room-family-suite.jpg";

const rooms = [
  {
    name: "Mud House",
    tagline: "Earth & Soul",
    image: roomMudHouse,
    description: "Handcrafted dwellings blending ancient traditions with modern comfort",
  },
  {
    name: "Tree House",
    tagline: "Above the Canopy",
    image: roomTreehouse,
    description: "Elevated sanctuaries nestled among ancient trees",
  },
  {
    name: "Luxury Glamping",
    tagline: "Wild Elegance",
    image: roomGlamping,
    description: "Canvas and comfort unite under starlit skies",
  },
  {
    name: "Luxury Suite",
    tagline: "Refined Retreat",
    image: roomLuxurySuite,
    description: "Sophisticated spaces with panoramic wilderness views",
  },
  {
    name: "Family Suite",
    tagline: "Together in Nature",
    image: roomFamilySuite,
    description: "Spacious havens designed for shared adventures",
  },
];

const AccommodationSection = () => {
  const autoplayRef = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      slidesToScroll: 1,
    },
    [autoplayRef.current]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Set up the onSelect callback
  if (emblaApi) {
    emblaApi.on("select", onSelect);
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-6 lg:px-12"
        >
          <p className="luxury-subheading text-muted-foreground mb-4">WHERE YOU'LL STAY</p>
          <h2 className="text-3xl lg:text-5xl font-serif tracking-luxury">
            Accommodation
          </h2>
        </motion.div>

        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {rooms.map((room, index) => (
                <div
                  key={room.name}
                  className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0 pl-4 lg:pl-6 first:pl-6 lg:first:pl-12"
                >
                  <Link to="/accommodation" className="group cursor-pointer block">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                      
                      {/* Room Number */}
                      <div className="absolute top-6 left-6">
                        <span className="text-xs tracking-[0.3em] text-background/60">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                        <p className="text-[10px] tracking-[0.3em] text-background/70 mb-2">
                          {room.tagline.toUpperCase()}
                        </p>
                        <h3 className="text-xl lg:text-2xl font-serif tracking-luxury text-background mb-3">
                          {room.name}
                        </h3>
                        <p className="text-sm text-background/70 mb-4 line-clamp-2">
                          {room.description}
                        </p>
                        <span className="inline-block text-xs tracking-[0.2em] text-background border-b border-background/50 pb-1 transition-all group-hover:border-background">
                          EXPLORE
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 px-6 lg:px-12">
            {/* Dots */}
            <div className="flex gap-2">
              {rooms.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === index 
                      ? "bg-foreground w-6" 
                      : "bg-foreground/30 hover:bg-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={scrollPrev}
                className="w-12 h-12 border border-foreground/30 flex items-center justify-center transition-all hover:bg-foreground hover:text-background"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="w-12 h-12 border border-foreground/30 flex items-center justify-center transition-all hover:bg-foreground hover:text-background"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AccommodationSection;
