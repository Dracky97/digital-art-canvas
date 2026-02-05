import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import tokyoInterior from "@/assets/tokyo-interior.jpg";
import beachCasita from "@/assets/beach-casita.jpg";
import coastalPool from "@/assets/coastal-pool.jpg";

const restaurants = [
  {
    name: "The Terrace",
    cuisine: "Contemporary Asian",
    description: "An open-air dining experience featuring the finest local ingredients prepared with innovative techniques. Watch the sunset as our chefs craft culinary masterpieces.",
    image: beachCasita,
    hours: "7:00 AM - 11:00 PM",
  },
  {
    name: "Saffron",
    cuisine: "Fine Dining",
    description: "Our signature restaurant offers a multi-course tasting menu that celebrates the intersection of tradition and modernity. Each dish tells a story.",
    image: tokyoInterior,
    hours: "6:30 PM - 10:30 PM",
  },
  {
    name: "The Pool Bar",
    cuisine: "Light Fare & Cocktails",
    description: "Refreshing beverages and light cuisine served poolside. From fresh-pressed juices to artisanal cocktails crafted by our mixologists.",
    image: coastalPool,
    hours: "10:00 AM - Sunset",
  },
];

const Dining = () => {
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
              Dining
            </h1>
            <p className="luxury-body text-muted-foreground max-w-2xl">
              A gastronomic journey where world-class culinary artistry meets the freshest local 
              ingredients. Every meal at AaraWild is an experience to savor.
            </p>
          </motion.div>
        </section>

        {/* Restaurants */}
        <section className="px-6 lg:px-12 mb-24">
          <div className="max-w-[1800px] mx-auto space-y-32">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="luxury-subheading text-muted-foreground mb-4 block">
                    {restaurant.cuisine}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                    {restaurant.name}
                  </h2>
                  <p className="luxury-body text-muted-foreground mb-8">
                    {restaurant.description}
                  </p>
                  <div className="mb-8">
                    <span className="luxury-subheading text-muted-foreground block mb-1">Hours</span>
                    <span className="font-serif text-lg">{restaurant.hours}</span>
                  </div>
                  <button className="luxury-subheading px-8 py-4 border border-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                    Reserve a Table
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Private Dining */}
        <section className="px-6 lg:px-12 py-20 bg-secondary/30">
          <div className="max-w-[1800px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                Private Dining
              </h2>
              <p className="luxury-body text-muted-foreground max-w-2xl mx-auto mb-8">
                For intimate celebrations or exclusive gatherings, our private dining experiences 
                offer bespoke menus crafted to your preferences in stunning locations.
              </p>
              <button className="luxury-subheading px-8 py-4 border border-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                Inquire Now
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dining;
