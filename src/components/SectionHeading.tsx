
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInFromBottom, standardTransition } from '@/utils/animations';

interface SectionHeadingProps {
  /** Main heading text */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Additional CSS classes */
  className?: string;
  /** Show decorative line below heading */
  showDecorator?: boolean;
  /** Custom animation delay */
  delay?: number;
}

/**
 * Reusable section heading component with consistent animations
 * Used across multiple sections for consistent typography and spacing
 */
const SectionHeading = ({
  title,
  subtitle,
  className = '',
  showDecorator = true,
  delay = 0.2
}: SectionHeadingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`text-center mb-16 ${className}`}>
      {/* Main title with enhanced animations */}
      <motion.h2
        className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInFromBottom}
        transition={{
          ...standardTransition,
          delay,
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
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        >
          {title}
        </motion.span>
      </motion.h2>

      {/* Optional subtitle */}
      {subtitle && (
        <motion.p
          className="text-xl text-gray-300 font-inter mb-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInFromBottom}
          transition={{ ...standardTransition, delay: delay + 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative line */}
      {showDecorator && (
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
            delay: delay + 0.7,
            type: "spring",
            stiffness: 80
          }}
        />
      )}
    </div>
  );
};

export default SectionHeading;
