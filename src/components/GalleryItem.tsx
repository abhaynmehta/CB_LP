import { motion } from 'framer-motion';
import { ClientWork } from '@/types/gallery';

interface GalleryItemProps {
  client: ClientWork;
  index: number;
  onClick: () => void;
}

const GalleryItem = ({ client, index, onClick }: GalleryItemProps) => {
  return (
    <motion.div
      key={client.id}
      className="relative cursor-pointer group w-80 h-96 overflow-hidden bg-brand-cod-gray rounded-lg flex-shrink-0"
      whileHover={{ 
        scale: 1.05, 
        y: -10,
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
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
      
      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-brand-mountain-meadow text-sm font-inter uppercase tracking-wider mb-2">
          {client.category}
        </p>
        <h3 className="font-playfair text-xl font-semibold text-white">
          {client.name}
        </h3>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-brand-mountain-meadow/20 via-transparent to-brand-gossamer/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
    </motion.div>
  );
};

export default GalleryItem;
