
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClientWork } from '@/types/gallery';

interface GalleryModalProps {
  selectedClient: ClientWork | null;
  onClose: () => void;
}

const GalleryModal = ({ selectedClient, onClose }: GalleryModalProps) => {
  if (!selectedClient) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-brand-black/95 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-brand-mountain-meadow/20 border border-brand-mountain-meadow"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="bg-brand-cod-gray p-6 border-b border-brand-mountain-meadow/20">
            <div className="flex items-center gap-4">
              <span className="text-brand-mountain-meadow font-inter text-sm">0{selectedClient.id}</span>
              <div className="w-8 h-px bg-brand-mountain-meadow"></div>
              <h3 className="font-playfair text-2xl font-bold text-white">
                {selectedClient.name.toUpperCase()}
              </h3>
            </div>
            <p className="text-gray-400 text-sm mt-2">{selectedClient.imageCount}</p>
          </div>

          <div className="bg-brand-black p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              {selectedClient.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative aspect-[4/3] overflow-hidden bg-brand-cod-gray"
                >
                  <img 
                    src={image}
                    alt={`${selectedClient.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryModal;
