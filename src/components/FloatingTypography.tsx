
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingTypography = () => {
  const [words] = useState([
    'BRAND', 'LUXURY', 'CRAFT', 'PREMIUM', 'HAUTE', 'COUTURE', 'DESIGN', 'STRATEGY'
  ]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {words.map((word, index) => (
        <motion.div
          key={word}
          className="absolute text-brand-mountain-meadow/10 font-playfair font-bold select-none"
          style={{
            fontSize: `${Math.random() * 60 + 20}px`,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          initial={{
            opacity: 0,
            scale: 0.5,
            rotateZ: Math.random() * 360,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.8],
            rotateZ: [0, 360],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: index * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {word}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingTypography;
