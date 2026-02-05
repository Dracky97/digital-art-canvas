import Header from "@/components/Header";
import HeroVideo from "@/components/HeroVideo";
import DestinationsSection from "@/components/DestinationsSection";
import StoriesCarousel from "@/components/StoriesCarousel";
import JourneysSection from "@/components/JourneysSection";
import AlchemySection from "@/components/AlchemySection";
import AccommodationSection from "@/components/AccommodationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroVideo />
        <DestinationsSection />
        <StoriesCarousel />
        <JourneysSection />
        <AlchemySection />
        <AccommodationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
