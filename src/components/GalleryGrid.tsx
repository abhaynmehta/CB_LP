
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ClientWork } from '@/types/gallery';

interface GalleryGridProps {
  clientWork: ClientWork[];
  onClientSelect: (client: ClientWork) => void;
}

const GalleryGrid = ({ clientWork, onClientSelect }: GalleryGridProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === clientWork.length - 3 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? clientWork.length - 3 : prev - 1
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <div className="relative">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {clientWork.slice(currentSlide, currentSlide + 5).map((client, index) => (
          <motion.div
            key={client.id}
            variants={itemVariants}
            className="relative cursor-pointer group aspect-[4/5] overflow-hidden bg-brand-cod-gray rounded-lg"
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              rotateY: hoveredIndex === index ? 8 : 0,
              boxShadow: "0 20px 40px rgba(21, 206, 160, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
            onClick={() => onClientSelect(client)}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <motion.img 
              src={client.preview}
              alt={client.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.7 }}
            />
            
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            />
            
            <motion.div 
              className="absolute bottom-4 left-4 right-4"
              initial={{ y: 10, opacity: 0.8 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p 
                className="text-brand-mountain-meadow text-xs font-inter uppercase tracking-wider mb-1"
                whileHover={{ x: 5, scale: 1.05 }}
              >
                {client.category}
              </motion.p>
              <motion.h3 
                className="font-playfair text-lg font-semibold text-white mb-1"
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {client.name}
              </motion.h3>
              <motion.p 
                className="text-gray-400 text-xs font-inter"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1, y: -2 }}
              >
                {client.imageCount}
              </motion.p>
            </motion.div>

            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-brand-mountain-meadow/20 via-transparent to-brand-gossamer/20 opacity-0 group-hover:opacity-100 transition-all duration-500"
              whileHover={{ 
                background: "linear-gradient(135deg, rgba(21, 206, 160, 0.25), transparent, rgba(12, 154, 119, 0.25))" 
              }}
            />

            {/* Animated corner accent */}
            <motion.div
              className="absolute top-2 right-2 w-3 h-3 bg-brand-mountain-meadow rounded-full opacity-0 group-hover:opacity-100"
              animate={hoveredIndex === index ? {
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Ripple effect on hover */}
            <motion.div
              className="absolute inset-0 border-2 border-brand-mountain-meadow rounded-lg opacity-0 group-hover:opacity-30"
              animate={hoveredIndex === index ? {
                scale: [1, 1.05, 1],
                opacity: [0, 0.3, 0]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full border border-brand-mountain-meadow text-brand-mountain-meadow hover:bg-brand-mountain-meadow hover:text-brand-black transition-all duration-300"
            onClick={prevSlide}
          >
            <motion.div
              whileHover={{ x: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.div>
          </Button>
        </motion.div>
        
        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(clientWork.length / 5) }).map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                Math.floor(currentSlide / 5) === index 
                  ? 'bg-brand-mountain-meadow' 
                  : 'bg-brand-cod-gray'
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              animate={Math.floor(currentSlide / 5) === index ? {
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              onClick={() => setCurrentSlide(index * 5)}
            />
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full border border-brand-mountain-meadow text-brand-mountain-meadow hover:bg-brand-mountain-meadow hover:text-brand-black transition-all duration-300"
            onClick={nextSlide}
          >
            <motion.div
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GalleryGrid;
