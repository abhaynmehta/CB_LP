
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { Button } from '@/components/ui/button';
import { Play, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import TypewriterText from './TypewriterText';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);

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

  // Text animation variants
  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5
      }
    })
  };

  return (
    <section className="relative min-h-screen bg-brand-black text-white overflow-hidden">
      <AnimatedBackground />

      {/* Enhanced Gradient Overlay with Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-5"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-brand-mountain-meadow/10 via-transparent to-brand-gossamer/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(21, 206, 160, 0.1) 0%, transparent 50%, rgba(12, 154, 119, 0.1) 100%)",
              "linear-gradient(225deg, rgba(21, 206, 160, 0.1) 0%, transparent 50%, rgba(12, 154, 119, 0.1) 100%)",
              "linear-gradient(45deg, rgba(21, 206, 160, 0.1) 0%, transparent 50%, rgba(12, 154, 119, 0.1) 100%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl text-center">
          {/* Animated Main Title */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.h1 
              variants={textVariants}
              custom={0.2}
              className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              {"We Craft Brands".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  custom={i}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
              <br />
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-brand-mountain-meadow via-brand-gossamer to-brand-mountain-meadow bg-300%"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                onAnimationComplete={() => setShowSecondary(true)}
              >
                <TypewriterText 
                  text="Like Haute Couture." 
                  delay={1500}
                  speed={80}
                />
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Animated Subtitle with Reveal Effect */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2, delay: 2.5, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.8 }}
              className="font-inter text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Premium content creation and brand strategy that transforms businesses into{' '}
              <motion.span
                className="text-brand-mountain-meadow font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 3.5 }}
              >
                luxury experiences
              </motion.span>
              .
            </motion.p>
          </motion.div>

          {/* Enhanced Button Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 3.2,
              type: "spring",
              stiffness: 100
            }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <animated.div style={buttonSpring}>
              <Button 
                size="lg"
                onClick={() => scrollToSection('portfolio')}
                className="group bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer text-brand-black hover:from-brand-gossamer hover:to-brand-mountain-meadow font-inter font-semibold px-8 py-4 text-lg transition-all duration-300 rounded-full relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">EXPLORE OUR WORK</span>
              </Button>
            </animated.div>

            <motion.div
              whileHover={{ scale: 1.05, rotateZ: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('videos')}
                className="group border-2 border-brand-mountain-meadow text-brand-mountain-meadow hover:bg-gradient-to-r hover:from-brand-mountain-meadow/20 hover:to-brand-gossamer/20 hover:text-white font-inter font-semibold px-8 py-4 text-lg transition-all duration-300 rounded-full backdrop-blur-sm relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-mountain-meadow/10 to-brand-gossamer/10"
                  initial={{ scale: 0, borderRadius: "50%" }}
                  whileHover={{ scale: 1, borderRadius: "0%" }}
                  transition={{ duration: 0.4 }}
                />
                <Play className="mr-2 h-5 w-5 relative z-10 group-hover:animate-pulse" />
                <span className="relative z-10">WATCH OUR STORY</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-1/4 left-10 hidden lg:block"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-2 h-16 bg-gradient-to-b from-brand-mountain-meadow to-transparent rounded-full opacity-60" />
          </motion.div>

          <motion.div
            className="absolute top-1/3 right-16 hidden lg:block"
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -15, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <div className="w-3 h-3 bg-brand-gossamer rounded-full opacity-70" />
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
        onClick={() => scrollToSection('portfolio')}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-brand-mountain-meadow rounded-full flex justify-center group-hover:border-brand-gossamer transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(21, 206, 160, 0)",
              "0 0 0 8px rgba(21, 206, 160, 0.1)",
              "0 0 0 0 rgba(21, 206, 160, 0)"
            ]
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity }
          }}
        >
          <motion.div 
            className="w-1 h-3 bg-gradient-to-b from-brand-mountain-meadow to-brand-gossamer rounded-full mt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <motion.div
          className="flex items-center justify-center mt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <ChevronDown className="w-4 h-4 text-brand-mountain-meadow opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
