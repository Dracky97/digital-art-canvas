import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import ReservationModal from "./ReservationModal";
import aarawildLogo from "@/assets/aarawild-logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Gallery", href: "/gallery" },
    { label: "Accommodation", href: "/accommodation" },
    { label: "Experiences", href: "/experiences" },
    { label: "Dining", href: "/dining" },
    { label: "Wellness", href: "/wellness" },
    { label: "Exclusive Offers", href: "/offers" },
    
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-12">
          {/* Left Navigation */}
          <div className="flex items-center gap-4 lg:gap-8 flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-3 group"
            >
              <Menu className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="luxury-subheading hidden lg:block">Menu</span>
            </button>
            <button className="hidden lg:block">
              <Search className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
            </button>
          </div>

          {/* Center Logo */}
          <Link to="/" className="flex-1 flex justify-center px-2">
            <img src={aarawildLogo} alt="ĀaraWild" className="h-8 sm:h-10 lg:h-12 w-auto" />
          </Link>

          {/* Right Navigation */}
          <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
            <span className="luxury-subheading hidden lg:block cursor-pointer hover:opacity-70 transition-opacity">
              English
            </span>
            <button 
              onClick={() => setIsReservationOpen(true)}
              className="luxury-subheading px-3 py-2 sm:px-6 sm:py-3 text-[10px] sm:text-xs border border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Reserve
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-6 lg:px-12">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <X className="w-5 h-5" />
                  <span className="luxury-subheading hidden lg:block">Close</span>
                </button>
                <img src={aarawildLogo} alt="ĀaraWild" className="h-10 lg:h-12 w-auto" />
                <div className="w-20" />
              </div>

              <nav className="flex-1 flex items-center justify-center">
                <ul className="space-y-8 text-center">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-luxury hover:opacity-60 transition-opacity duration-300"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reservation Modal */}
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
      />
    </>
  );
};

export default Header;
