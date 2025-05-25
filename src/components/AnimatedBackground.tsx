
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springProps = useSpring({
    transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0)`,
    config: { tension: 200, friction: 50 }
  });

  return (
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
        
        <animated.div 
          style={springProps}
          className="absolute top-40 right-20 w-24 h-24 bg-brand-gossamer/15 rounded-full blur-lg"
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

      {/* Interactive grid pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            linear-gradient(#15cea0 1px, transparent 1px),
            linear-gradient(90deg, #15cea0 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
