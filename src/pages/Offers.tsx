import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReservationModal from "@/components/ReservationModal";
import offerExtendedStay from "@/assets/offer-extended-stay.jpg";
import { getOffers, Offer } from "@/lib/offers";

const Offers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useEffect(() => {
    setOffers(getOffers());
  }, []);

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
              Exclusive Offers
            </h1>
            <p className="luxury-body text-muted-foreground max-w-2xl">
              Exceptional value meets uncompromising luxury. Discover our curated collection 
              of special offers designed to enhance your AaraWild experience.
            </p>
          </motion.div>
        </section>

        {/* Offers Grid */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[1800px] mx-auto space-y-20">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={offer.imageUrl || offerExtendedStay}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="luxury-subheading text-muted-foreground mb-2 block">
                    {offer.subtitle}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                    {offer.title}
                  </h2>
                  <p className="luxury-body text-muted-foreground mb-6">
                    {offer.description}
                  </p>
                  {offer.validUntil && (
                    <div className="mb-6 pb-6 border-b border-foreground/10">
                      <span className="luxury-subheading text-muted-foreground block mb-1">Valid Until</span>
                      <span className="font-serif">{offer.validUntil}</span>
                    </div>
                  )}
                  {offer.terms && (
                    <p className="text-sm text-muted-foreground mb-8">{offer.terms}</p>
                  )}
                  <button
                    onClick={() => setIsReservationOpen(true)}
                    className="luxury-subheading px-8 py-4 border border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    Book This Offer
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="px-6 lg:px-12 py-20 mt-24 bg-secondary/30">
          <div className="max-w-[1800px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif tracking-luxury mb-6">
                Be the First to Know
              </h2>
              <p className="luxury-body text-muted-foreground max-w-2xl mx-auto mb-8">
                Subscribe to receive exclusive offers, seasonal promotions, and insider 
                access to new experiences before anyone else.
              </p>
              <button className="luxury-subheading px-8 py-4 border border-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                Subscribe Now
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ReservationModal isOpen={isReservationOpen} onClose={() => setIsReservationOpen(false)} />
    </div>
  );
};

export default Offers;
