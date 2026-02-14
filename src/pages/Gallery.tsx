import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import galleryArchitecture from "@/assets/gallery-architecture.jpg";
import beachCasita from "@/assets/beach-casita.jpg";
import galleryWellness from "@/assets/gallery-wellness.jpg";
import galleryExperiences from "@/assets/gallery-experiences.jpg";
import skiMountains from "@/assets/ski-mountains.jpg";
import galleryInteriors from "@/assets/gallery-interiors.jpg";
import amangiriDesert from "@/assets/amangiri-desert.jpg";
import galleryDining from "@/assets/gallery-dining.jpg";
import indiaWilderness from "@/assets/india-wilderness.jpg";

const galleryImages = [
  { src: galleryArchitecture, alt: "Resort architecture at sunset", category: "Architecture" },
  { src: beachCasita, alt: "Beachfront casita", category: "Accommodation" },
  { src: galleryWellness, alt: "Spa treatment room", category: "Wellness" },
  { src: galleryExperiences, alt: "Hot air balloon safari", category: "Experiences" },
  { src: skiMountains, alt: "Mountain ski resort", category: "Destinations" },
  { src: galleryInteriors, alt: "Luxury bedroom interior", category: "Interiors" },
  { src: amangiriDesert, alt: "Desert landscape", category: "Destinations" },
  { src: galleryDining, alt: "Oceanfront dining experience", category: "Dining" },
  { src: indiaWilderness, alt: "Wilderness retreat", category: "Experiences" },
];

const categories = ["All", "Architecture", "Accommodation", "Wellness", "Experiences", "Destinations", "Interiors", "Dining"];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="px-6 lg:px-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[1800px] mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-luxury mb-6">
              Gallery
            </h1>
            <p className="luxury-body text-muted-foreground max-w-2xl">
              A visual journey through the world of AaraWild. Explore our collection of 
              stunning imagery capturing the essence of luxury travel and transformative experiences.
            </p>
          </motion.div>
        </section>

        {/* Category Filter */}
        <section className="px-6 lg:px-12 mb-12">
          <div className="max-w-[1800px] mx-auto">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className="luxury-subheading px-4 py-2 border border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="luxury-subheading text-primary-foreground bg-foreground/80 px-3 py-1">
                      {image.category}
                    </span>
                  </div>
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

export default Gallery;
