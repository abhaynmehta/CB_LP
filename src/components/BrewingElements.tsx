
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const BrewingElements = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Coffee beans data
  const coffeeBeans = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotationSpeed: Math.random() * 2 + 1,
    floatSpeed: Math.random() * 3 + 2,
  }));

  // Steam particles data
  const steamParticles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Coffee Beans */}
      {coffeeBeans.map((bean) => (
        <motion.div
          key={bean.id}
          className="absolute bg-gradient-to-br from-amber-800 to-amber-900 rounded-full shadow-lg"
          style={{
            width: `${bean.size}px`,
            height: `${bean.size * 0.8}px`,
            left: `${bean.x}%`,
            top: `${bean.y}%`,
            transform: 'perspective(1000px)',
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 180],
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            rotateX: {
              duration: bean.rotationSpeed * 4,
              repeat: Infinity,
              ease: "linear"
            },
            rotateY: {
              duration: bean.rotationSpeed * 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            y: {
              duration: bean.floatSpeed,
              repeat: Infinity,
              ease: "easeInOut"
            },
            x: {
              duration: bean.floatSpeed * 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {/* Bean highlight */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-amber-600 rounded-full opacity-60" />
          {/* Bean crack */}
          <div className="absolute top-1/2 left-1/2 w-px h-3/4 bg-amber-950 transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      ))}

      {/* Brewing Vessels */}
      <motion.div
        className="absolute top-20 right-20 w-16 h-20"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 20 - 10}deg) rotateY(${mousePosition.x * 20 - 10}deg)`,
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Coffee Cup */}
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-lg border-2 border-gray-500" />
          <div className="absolute bottom-1 left-1 right-1 h-1/2 bg-gradient-to-b from-amber-900 to-amber-950 rounded-b-lg" />
          {/* Handle */}
          <div className="absolute right-0 top-1/3 w-3 h-6 border-2 border-gray-500 rounded-r-full" />
          {/* Steam */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            {steamParticles.slice(0, 3).map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-4 bg-white opacity-30 rounded-full"
                style={{ left: `${particle.x * 0.3}px` }}
                animate={{
                  y: [0, -20, -40],
                  opacity: [0.3, 0.6, 0],
                  scale: [1, 1.2, 0.8],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pour Over Effect */}
      <motion.div
        className="absolute top-32 left-1/4 w-24 h-32"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 15}deg)`,
        }}
      >
        {/* Dripper */}
        <div className="relative w-full h-16 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-full border-2 border-gray-400" />
        {/* Coffee Stream */}
        <motion.div
          className="absolute top-14 left-1/2 w-1 transform -translate-x-1/2"
          animate={{
            height: [0, 60, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-amber-800 to-amber-900 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Floating Steam Particles */}
      {steamParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            bottom: '20%',
          }}
          animate={{
            y: [0, -200, -400],
            x: [0, Math.sin(particle.id) * 50, Math.cos(particle.id) * 30],
            opacity: [0.2, 0.4, 0],
            scale: [1, 1.5, 0.5],
          }}
          transition={{
            duration: particle.duration * 2,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Brewing Temperature Indicator */}
      <motion.div
        className="absolute bottom-20 left-10 w-4 h-24 rounded-full border-2 border-brand-mountain-meadow overflow-hidden"
        style={{
          background: 'linear-gradient(to top, #15cea0 0%, transparent 100%)',
        }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-mountain-meadow to-brand-gossamer"
          animate={{
            height: [`${20 + scrollY * 0.1}%`, `${40 + scrollY * 0.1}%`, `${20 + scrollY * 0.1}%`],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Coffee Grounds Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-900 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BrewingElements;
