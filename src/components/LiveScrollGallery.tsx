
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { clientWork } from '@/data/galleryData';
import GalleryItem from './GalleryItem';
import EnhancedGalleryModal from './EnhancedGalleryModal';

const LiveScrollGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedClient, setSelectedClient] = useState<typeof clientWork[0] | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const itemWidth = 320;
  const gap = 24;
  const totalItemWidth = itemWidth + gap;

  const repeatedItems = [...clientWork, ...clientWork, ...clientWork, ...clientWork];

  const scrollAnimation = `
    @keyframes scroll-infinite {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-${clientWork.length * totalItemWidth}px);
      }
    }
  `;

  return (
    <section ref={ref} className="py-20 bg-brand-black overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: scrollAnimation }} />
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Portfolio Gallery
          </motion.h2>
          <motion.p 
            className="font-inter text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore our client work and creative solutions
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="flex gap-6 w-max"
            style={{
              animation: `scroll-infinite 15s linear infinite ${isHovered ? 'paused' : 'running'}`,
              width: `${repeatedItems.length * totalItemWidth}px`
            }}
          >
            {repeatedItems.map((client, index) => (
              <GalleryItem
                key={`${client.id}-${Math.floor(index / clientWork.length)}-${index}`}
                client={client}
                index={index}
                onClick={() => setSelectedClient(client)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <EnhancedGalleryModal
        selectedClient={selectedClient}
        onClose={() => setSelectedClient(null)}
      />
    </section>
  );
};

export default LiveScrollGallery;
