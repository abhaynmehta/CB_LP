
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
    transform: `translate3d(${mousePosition.x * 30}px, ${mousePosition.y * 30}px, 0)`,
    config: { tension: 200, friction: 50 }
  });

  const oppositeSpring = useSpring({
    transform: `translate3d(${-mousePosition.x * 20}px, ${-mousePosition.y * 20}px, 0)`,
    config: { tension: 150, friction: 40 }
  });

  return (
    <div className="absolute inset-0">
      {/* Enhanced Base Gradient */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
            "linear-gradient(225deg, #000000 0%, #0d1117 50%, #1a1a1a 100%)",
            "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      
      {/* Floating geometric shapes with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-brand-mountain-meadow/10 rounded-full blur-xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, -100, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
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
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Medium Floating Elements */}
        <animated.div
          style={oppositeSpring}
          className="absolute top-60 left-1/2 w-16 h-16 bg-brand-gossamer/20 rounded-lg blur-md"
        />

        <motion.div
          className="absolute bottom-40 right-1/4 w-20 h-20 bg-brand-mountain-meadow/8 rounded-full blur-lg"
          animate={{
            x: [0, -60, 60, 0],
            y: [0, 30, -30, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Small Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand-mountain-meadow/30 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + i * 5}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced Interactive Grid Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{
          backgroundPosition: { duration: 25, repeat: Infinity, ease: "linear" },
          opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          backgroundImage: `
            linear-gradient(#15cea0 1px, transparent 1px),
            linear-gradient(90deg, #15cea0 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(21, 206, 160, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 25px 25px',
        }}
      />

      {/* Ambient Light Effects */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(21, 206, 160, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(12, 154, 119, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(21, 206, 160, 0.05) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
    </div>
  );
};

export default AnimatedBackground;
