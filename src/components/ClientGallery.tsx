
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { clientWork } from '@/data/clientWork';
import { ClientWork } from '@/types/gallery';
import GalleryGrid from './GalleryGrid';
import GalleryModal from './GalleryModal';

const ClientGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedClient, setSelectedClient] = useState<ClientWork | null>(null);

  return (
    <section ref={ref} className="py-20 bg-brand-black overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4">
            Portfolio
          </h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="text-brand-mountain-meadow font-inter text-lg">07</span>
            <div className="w-16 h-px bg-brand-mountain-meadow"></div>
            <span className="text-white font-playfair text-4xl font-bold tracking-wider">GALLERY</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <GalleryGrid 
            clientWork={clientWork} 
            onClientSelect={setSelectedClient}
          />
        </motion.div>
      </div>

      <GalleryModal 
        selectedClient={selectedClient}
        onClose={() => setSelectedClient(null)}
      />
    </section>
  );
};

export default ClientGallery;
