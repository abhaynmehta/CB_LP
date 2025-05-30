import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Services', href: '#services' },
  { name: 'Videos', href: '#videos' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace('#', ''));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-black/95 backdrop-blur-md border-b border-brand-mountain-meadow/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-playfair text-2xl font-bold text-white cursor-pointer"
            onClick={() => scrollToSection('#hero')}
          >
            <span className="text-brand-mountain-meadow">Content</span>Brewer
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative font-inter text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-brand-mountain-meadow'
                    : 'text-gray-300 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-mountain-meadow"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer text-brand-black font-inter font-semibold px-6 py-2 rounded-full hover:shadow-lg hover:shadow-brand-mountain-meadow/25 transition-all duration-300"
            >
              Get Started
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-brand-black/95 backdrop-blur-md border-t border-brand-mountain-meadow/20"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ x: -50, opacity: 0 }}
                animate={{
                  x: isMobileMenuOpen ? 0 : -50,
                  opacity: isMobileMenuOpen ? 1 : 0
                }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-4 py-2 font-inter text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-brand-mountain-meadow bg-brand-mountain-meadow/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{
                x: isMobileMenuOpen ? 0 : -50,
                opacity: isMobileMenuOpen ? 1 : 0
              }}
              transition={{ delay: navItems.length * 0.1 }}
              className="px-4 pt-4"
            >
              <Button
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer text-brand-black font-inter font-semibold py-2 rounded-full"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
