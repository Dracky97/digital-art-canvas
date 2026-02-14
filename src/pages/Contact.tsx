import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (800) 123-4567", "+44 20 1234 5678"],
    description: "Available 24 hours, 7 days a week",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["reservations@aarawild.com", "concierge@aarawild.com"],
    description: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["Private Estate", "Wilderness Reserve"],
    description: "Exact location provided upon booking",
  },
];

const Contact = () => {
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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-luxury mb-6">Contact Us</h1>
            <p className="luxury-body text-muted-foreground max-w-2xl">
              We're here to assist you with any inquiries. Whether you're planning your first visit or returning as a
              cherished guest, our team is ready to help.
            </p>
          </motion.div>
        </section>

        {/* Contact Info & Form Grid */}
        <section className="px-6 lg:px-12 mb-24">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-serif tracking-luxury mb-8">Get in Touch</h2>
                <div className="space-y-8">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex gap-6">
                      <info.icon className="w-6 h-6 flex-shrink-0 mt-1" strokeWidth={1} />
                      <div>
                        <h3 className="font-serif text-lg mb-2">{info.title}</h3>
                        {info.details.map((detail) => (
                          <p key={detail} className="text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                        <p className="text-sm text-muted-foreground/60 mt-2">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-12 border-t border-foreground/10">
                  <h3 className="font-serif text-lg mb-4">Office Hours</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Reservations: 24/7</p>
                    <p>General Inquiries: 9:00 AM - 6:00 PM (Local Time)</p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-serif tracking-luxury mb-8">Send a Message</h2>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="luxury-subheading text-muted-foreground block mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-foreground/30 px-0 py-3 focus:outline-none focus:border-foreground transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="luxury-subheading text-muted-foreground block mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-foreground/30 px-0 py-3 focus:outline-none focus:border-foreground transition-colors duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="luxury-subheading text-muted-foreground block mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b border-foreground/30 px-0 py-3 focus:outline-none focus:border-foreground transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="luxury-subheading text-muted-foreground block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full bg-transparent border-b border-foreground/30 px-0 py-3 focus:outline-none focus:border-foreground transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="luxury-subheading text-muted-foreground block mb-2">Inquiry Type</label>
                    <select className="w-full bg-transparent border-b border-foreground/30 px-0 py-3 focus:outline-none focus:border-foreground transition-colors duration-300 cursor-pointer">
                      <option value="">Select an option</option>
                      <option value="reservations">Reservations</option>
                      <option value="experiences">Experiences</option>
                      <option value="events">Private Events</option>
                      <option value="press">Press & Media</option>
                      <option value="careers">Careers</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="luxury-subheading text-muted-foreground block mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full bg-transparent border-b border-foreground/30 px-0 py-3 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="luxury-subheading px-8 py-4 border border-foreground hover:bg-foreground hover:text-background transition-all duration-300 w-full sm:w-auto"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Google Map */}
        <section className="px-6 lg:px-12 mb-24">
          <div className="max-w-[1800px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-serif tracking-luxury mb-8">Our Location</h2>
              <div className="aspect-[21/9] w-full overflow-hidden border border-foreground/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d492.36176377850416!2d80.72258997929482!3d7.88648093809348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2slk!4v1770875354744!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AaraWild Location - Kandalama, Dambulla"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ CTA */}
        <section className="px-6 lg:px-12 py-20 bg-secondary/30">
          <div className="max-w-[1800px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-serif tracking-luxury mb-6">Frequently Asked Questions</h2>
              <p className="luxury-body text-muted-foreground max-w-2xl mx-auto mb-8">
                Find answers to common questions about reservations, experiences, policies, and more in our
                comprehensive FAQ section.
              </p>
              <button className="luxury-subheading px-8 py-4 border border-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                View FAQ
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
