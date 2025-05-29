
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeading = ({ title, subtitle, className = '' }: SectionHeadingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`text-center mb-16 ${className}`}>
      <motion.h2 
        className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: 100, rotateX: -30 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0, 
          rotateX: 0 
        } : { 
          opacity: 0, 
          y: 100, 
          rotateX: -30 
        }}
        transition={{ 
          duration: 1.2, 
          delay: 0.2,
          type: "spring",
          stiffness: 100,
          damping: 12
        }}
        whileHover={{ 
          scale: 1.05,
          textShadow: "0px 0px 8px rgb(21, 206, 160, 0.8)"
        }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {title}
        </motion.span>
      </motion.h2>
      
      {subtitle && (
        <motion.p
          className="text-xl text-gray-300 font-inter mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer mx-auto"
        initial={{ width: 0, opacity: 0, scale: 0 }}
        animate={isInView ? { 
          width: 96, 
          opacity: 1, 
          scale: 1 
        } : { 
          width: 0, 
          opacity: 0, 
          scale: 0 
        }}
        transition={{ 
          duration: 1.5, 
          delay: 0.9,
          type: "spring",
          stiffness: 80
        }}
      />
    </div>
  );
};

export default SectionHeading;
