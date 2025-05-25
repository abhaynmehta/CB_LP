
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useState } from 'react';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    config: { tension: 300, friction: 10 }
  });

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Fashion model"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8"
          >
            We Craft Brands
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Like Haute Couture.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-inter text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed"
          >
            Premium content creation and brand strategy that transforms businesses into luxury experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-gray-100 font-inter font-semibold px-8 py-4 text-lg transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              EXPLORE OUR WORK
            </Button>

            <animated.div style={springProps}>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black font-inter font-semibold px-8 py-4 text-lg transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                WATCH OUR STORY
              </Button>
            </animated.div>
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
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
