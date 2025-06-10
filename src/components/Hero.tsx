import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import TypewriterText from './TypewriterText';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonSpring = useSpring({
    transform: isHovered ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0px)',
    boxShadow: isHovered 
      ? '0 20px 40px rgba(21, 206, 160, 0.3)' 
      : '0 10px 20px rgba(0, 0, 0, 0.1)',
    config: { tension: 300, friction: 10 }
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-brand-black text-white overflow-hidden">
      <AnimatedBackground />

      {/* Enhanced Gradient Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-brand-mountain-meadow/10 via-transparent to-brand-gossamer/10 z-5"
      />

      <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
          >
            We Brew Brands
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-mountain-meadow via-brand-gossamer to-brand-mountain-meadow">
              That{' '}
              <TypewriterText 
                texts={['Speak Before They Sell.', 'Connect Then Convert.', ' Are Worth Remembering.', 'Feel Human.']}
                className="text-transparent bg-clip-text bg-gradient-to-r from-brand-mountain-meadow via-brand-gossamer to-brand-mountain-meadow"
              />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-inter text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            At Content Brewer, we craft premium, story-led content and podcasts that spark emotion, build trust, and drive results.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <animated.div style={buttonSpring}>
              <Button 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer text-brand-black hover:from-brand-gossamer hover:to-brand-mountain-meadow font-inter font-semibold px-8 py-4 text-lg transition-all duration-300 rounded-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                BOOK A BREW CALL
              </Button>
            </animated.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('portfolio')}
                className="bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer text-brand-black hover:from-brand-gossamer hover:to-brand-mountain-meadow font-inter font-semibold px-8 py-4 text-lg transition-all duration-300 rounded-full"
              >
                <Play className="mr-2 h-5 w-5" />
               EXPLORE OUR WORK
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('portfolio')}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-brand-mountain-meadow rounded-full flex justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-brand-mountain-meadow to-brand-gossamer rounded-full mt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
