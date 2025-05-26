
import { motion } from 'framer-motion';

interface GalleryItemProps {
  client: {
    id: number;
    name: string;
    category: string;
    preview: string;
    gallery: string[];
    videos?: string[];
  };
  index: number;
  onClick: () => void;
}

const GalleryItem = ({ client, index, onClick }: GalleryItemProps) => {
  return (
    <motion.div
      key={`${client.id}-${Math.floor(index / 5)}-${index}`}
      className="relative cursor-pointer group w-80 h-96 overflow-hidden bg-brand-cod-gray rounded-lg flex-shrink-0"
      whileHover={{ 
        scale: 1.08, 
        y: -15,
        rotateY: 5,
        boxShadow: "0 25px 50px rgba(21, 206, 160, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <motion.img 
        src={client.preview}
        alt={client.name}
        className="w-full h-full object-cover transition-all duration-700"
        whileHover={{ scale: 1.15 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent"></div>
      
      <motion.div 
        className="absolute bottom-6 left-6 right-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.p 
          className="text-brand-mountain-meadow text-sm font-inter uppercase tracking-wider mb-2"
          whileHover={{ scale: 1.1, x: 5 }}
        >
          {client.category}
        </motion.p>
        <motion.h3 
          className="font-playfair text-xl font-semibold text-white"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {client.name}
        </motion.h3>
      </motion.div>

      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-brand-mountain-meadow/20 via-transparent to-brand-gossamer/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg"
        whileHover={{ 
          background: "linear-gradient(135deg, rgba(21, 206, 160, 0.3), transparent, rgba(12, 154, 119, 0.3))" 
        }}
      />
      
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-brand-mountain-meadow rounded-full opacity-0 group-hover:opacity-100"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default GalleryItem;
