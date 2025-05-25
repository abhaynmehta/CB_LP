
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonSpring = useSpring({
    transform: isHovered ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0px)',
    boxShadow: isHovered 
      ? '0 20px 40px rgba(21, 206, 160, 0.3)' 
      : '0 10px 20px rgba(0, 0, 0, 0.1)',
    config: { tension: 300, friction: 10 }
  });

  return (
    <section className="relative min-h-screen bg-brand-black text-white overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"
          >
            We Craft Brands
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer">
              Like Haute Couture.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-inter text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Premium content creation and brand strategy that transforms businesses into luxury experiences.
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
                className="bg-brand-mountain-meadow text-brand-black hover:bg-brand-gossamer font-inter font-semibold px-8 py-4 text-lg transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                EXPLORE OUR WORK
              </Button>
            </animated.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="border-brand-mountain-meadow text-brand-mountain-meadow hover:bg-brand-mountain-meadow hover:text-brand-black font-inter font-semibold px-8 py-4 text-lg transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                WATCH OUR STORY
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-brand-mountain-meadow rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-brand-mountain-meadow rounded-full mt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
