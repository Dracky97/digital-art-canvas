import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getGalleryImages, GalleryImage, getCategories } from "@/lib/gallery";

const categories = ["All", ...getCategories()];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    setImages(getGalleryImages());
  }, []);

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

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
                  onClick={() => setActiveCategory(category)}
                  className={`luxury-subheading px-4 py-2 border transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-foreground text-background border-foreground"
                      : "border-foreground/20 hover:bg-foreground hover:text-background"
                  }`}
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
            {filteredImages.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  {images.length === 0
                    ? "No photos in the gallery yet. Photos added by the admin will appear here."
                    : "No photos in this category."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
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
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
