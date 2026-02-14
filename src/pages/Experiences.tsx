import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import expNatureAdventure from "@/assets/exp-nature-adventure.jpg";
import expCulturalJourneys from "@/assets/exp-cultural-journeys.jpg";
import expWellnessMindfulness from "@/assets/exp-wellness-mindfulness.jpg";
import expCommunityLearning from "@/assets/exp-community-learning.jpg";

const experiences = [
  {
    title: "Nature & Adventure",
    description: "Step into the wilderness and awaken your sense of wonder. Explore the Kaludiya Pokuna sanctuary, paddle across mirrored waters, or witness rare birds.",
    highlights: [
      "Guided forest walks through Kaludiya Pokuna Sanctuary",
      "Birdwatching and wildlife encounters",
      "Kayaking and lake exploration",
      "Scenic cycling and photography trails",
    ],
    image: expNatureAdventure,
  },
  {
    title: "Cultural Journeys",
    description: "Immerse yourself in Sri Lanka's timeless heritage. Visit ancient cities and rural villages where traditional crafts and music come alive.",
    highlights: [
      "Guided tours to UNESCO World Heritage sites (Sigiriya, Dambulla, Polonnaruwa)",
      "Village walks and temple visits",
      "Traditional cooking and pottery demonstrations",
      "Cultural performances under the stars",
    ],
    image: expCulturalJourneys,
  },
  {
    title: "Wellness & Mindfulness",
    description: "Experience inner harmony through yoga, meditation, and Ayurveda guided by the rhythms of nature.",
    highlights: [
      "Sunrise and sunset yoga sessions",
      "Forest meditation and breathwork",
      "Ayurvedic wellness therapies",
      "Herbal baths and healing teas",
    ],
    image: expWellnessMindfulness,
  },
  {
    title: "Community & Learning",
    description: "Engage with the local community to learn, create, and give back.",
    highlights: [
      "Local crafts and cooking workshops",
      "Community-led conservation programs",
      "Educational nature walks with local guides",
      "Farm visits and sustainable living sessions",
    ],
    image: expCommunityLearning,
  },
];

const Experiences = () => {
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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-luxury mb-6">
              Experiences
            </h1>
            <p className="luxury-body text-muted-foreground max-w-2xl">
              Curated journeys that transcend the ordinary. Each experience is designed to 
              create lasting memories and profound connections with the world around you.
            </p>
          </motion.div>
        </section>

        {/* Experiences */}
        <section className="px-6 lg:px-12 mb-24">
          <div className="max-w-[1800px] mx-auto space-y-32">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                    {experience.title}
                  </h2>
                  <p className="luxury-body text-muted-foreground mb-6">
                    {experience.description}
                  </p>
                  <div className="mb-8">
                    <span className="luxury-subheading text-muted-foreground block mb-3">Signature Highlights</span>
                    <ul className="space-y-2">
                      {experience.highlights.map((highlight) => (
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
      </main>
      <Footer />
    </div>
  );
};

export default Experiences;
