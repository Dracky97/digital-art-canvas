import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import diningMainRestaurant from "@/assets/dining-main-restaurant.jpg";
import diningWellnessCafe from "@/assets/dining-wellness-cafe.jpg";
import diningPrivate from "@/assets/dining-private.jpg";

const restaurants = [
  {
    name: "Main Restaurant",
    cuisine: "The Essence of Flavor",
    description: "Contemporary twist on traditional Sri Lankan and international cuisine. Panoramic views of forest and lake.",
    highlights: [
      "Breakfast with tropical fruits and Ceylon tea",
      "Modern reinterpretations of classic Sri Lankan dishes",
      "Fresh seafood and organic garden harvests",
    ],
    image: diningMainRestaurant,
  },
  {
    name: "Wellness Café",
    cuisine: "Nourishment with Intention",
    description: "Serene garden corner offering plant-based, organic, and Ayurvedic-inspired dishes.",
    highlights: [
      "Cold-pressed juices and herbal elixirs",
      "Fresh salads, smoothie bowls, and vegan entrées",
      "Locally grown organic ingredients",
    ],
    image: diningWellnessCafe,
  },
  {
    name: "Private Dining",
    cuisine: "Intimate & Inspired",
    description: "Bespoke experiences including candlelit lakeside dinners and in-villa meals.",
    highlights: [
      "Romantic lakeside dining under lantern light",
      "In-villa breakfast on private decks",
      "Custom tasting menus paired with fine wines",
    ],
    image: diningPrivate,
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
                  <p className="luxury-body text-muted-foreground mb-6">
                    {restaurant.description}
                  </p>
                  <div className="mb-8">
                    <span className="luxury-subheading text-muted-foreground block mb-3">Signature Highlights</span>
                    <ul className="space-y-2">
                      {restaurant.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1 h-1 rounded-full bg-foreground mt-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
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
              <span className="luxury-subheading text-muted-foreground mb-4 block">Rooted in Sustainability</span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                Farm-to-Table Philosophy
              </h2>
              <p className="luxury-body text-muted-foreground max-w-2xl mx-auto mb-8">
                Ingredients sourced directly from local organic farms, nearby villages, and on-site gardens. 
                Every flavor tells a story of care, culture, and connection to nature.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dining;
