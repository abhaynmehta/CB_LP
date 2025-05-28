
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';
import FloatingTypography from './FloatingTypography';
import ThreeScene from './ThreeScene';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    let interactionTimer: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
      setIsInteracting(true);
      clearTimeout(interactionTimer);
      interactionTimer = setTimeout(() => {
        setIsInteracting(false);
      }, 1000);
    };

    const handleScroll = () => {
      setIsInteracting(true);
      clearTimeout(interactionTimer);
      interactionTimer = setTimeout(() => {
        setIsInteracting(false);
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(interactionTimer);
    };
  }, []);

  const springProps = useSpring({
    transform: `translate3d(${mousePosition.x * (isInteracting ? 10 : 30)}px, ${mousePosition.y * (isInteracting ? 10 : 30)}px, 0)`,
    config: { tension: 200, friction: 50 }
  });

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-cod-gray to-brand-black"></div>
      
      {/* Three.js 3D Scene */}
      <ThreeScene />
      
      {/* Floating Typography */}
      <FloatingTypography />
      
      {/* Enhanced floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-brand-mountain-meadow/10 rounded-full blur-xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: isInteracting ? 20 : 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <animated.div 
          style={springProps}
          className="absolute top-40 right-20 w-24 h-24 bg-brand-gossamer/15 rounded-full blur-lg"
        />
        
        <motion.div
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-brand-mountain-meadow/5 rounded-full blur-2xl"
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -80, 40, 0],
            scale: [1, 1.3, 0.9, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: isInteracting ? 25 : 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Digital pixel-like elements */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-brand-mountain-meadow/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: isInteracting ? 5 : 3 + Math.random() * 2,
              delay: index * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced interactive grid pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: isInteracting ? 40 : 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            linear-gradient(#15cea0 1px, transparent 1px),
            linear-gradient(90deg, #15cea0 1px, transparent 1px),
            radial-gradient(circle at 25% 25%, #15cea0 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 100px 100px',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
