import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const footerLinks = {
  explore: [
    { label: "Gallery", href: "/gallery" },
    { label: "Accommodation", href: "/accommodation" },
    { label: "Experiences", href: "/experiences" },
    { label: "Dining", href: "/dining" },
  ],
  discover: [
    { label: "Wellness", href: "/wellness" },
    { label: "Offers", href: "/offers" },
    
    { label: "Contact Us", href: "/contact" },
  ],
  connect: [
    { label: "Contact Us", href: "/contact" },
    { label: "Gallery", href: "/gallery" },
    { label: "Offers", href: "/offers" },
    { label: "Experiences", href: "/experiences" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-20 px-6 lg:px-12">
      <div className="max-w-[1800px] mx-auto">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-luxury-wide mb-6">
              ĀARAWILD
            </h2>
            <p className="luxury-body text-primary-foreground/70 max-w-sm">
              A sanctuary for the discerning traveler, where transformative
              experiences meet unparalleled luxury in the world's most
              extraordinary destinations.
            </p>
          </motion.div>

          {/* Links Columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="luxury-subheading text-primary-foreground/50 mb-6">
              Explore
            </h3>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 font-serif tracking-wide"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="luxury-subheading text-primary-foreground/50 mb-6">
              Discover
            </h3>
            <ul className="space-y-4">
              {footerLinks.discover.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 font-serif tracking-wide"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="luxury-subheading text-primary-foreground/50 mb-6">
              Connect
            </h3>
            <ul className="space-y-4">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 font-serif tracking-wide"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-primary-foreground/20 pt-12 mb-12"
        >
          <div className="max-w-md">
            <h3 className="luxury-subheading text-primary-foreground/50 mb-4">
              Newsletter
            </h3>
            <p className="font-serif text-primary-foreground/80 mb-6">
              Subscribe to receive the latest stories, exclusive offers and
              inspiration from AaraWild.
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border-b border-primary-foreground/30 px-0 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground transition-colors duration-300 font-sans text-sm tracking-wide"
              />
              <button
                type="submit"
                className="luxury-subheading px-6 py-3 border border-primary-foreground/50 hover:bg-primary-foreground hover:text-foreground transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-sm text-primary-foreground/50 font-sans">
            © 2025 AaraWild. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-primary-foreground/50 font-sans">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
