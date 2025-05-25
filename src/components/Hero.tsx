
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useState } from 'react';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen bg-brand-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-cod-gray to-brand-black"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-brand-mountain-meadow/10 rounded-full blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-brand-gossamer/15 rounded-full blur-lg"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-32 left-1/3 w-40 h-40 bg-brand-mountain-meadow/5 rounded-full blur-2xl"
            animate={{
              x: [0, 120, 0],
              y: [0, -80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(${isHovered ? '#15cea0' : '#1a1a1a'} 1px, transparent 1px),
              linear-gradient(90deg, ${isHovered ? '#15cea0' : '#1a1a1a'} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transition: 'all 0.3s ease'
          }}></div>
        </div>
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer">
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="bg-brand-mountain-meadow text-brand-black hover:bg-brand-gossamer font-inter font-semibold px-8 py-4 text-lg transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                EXPLORE OUR WORK
              </Button>
            </motion.div>

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
          <div className="w-1 h-3 bg-brand-mountain-meadow rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
