
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Client {
  id: number;
  name: string;
  category: string;
  preview: string;
  gallery: string[];
  videos?: string[];
}

interface EnhancedGalleryModalProps {
  selectedClient: Client | null;
  onClose: () => void;
}

const EnhancedGalleryModal = ({ selectedClient, onClose }: EnhancedGalleryModalProps) => {
  const openVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  if (!selectedClient) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-brand-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden bg-brand-cod-gray rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="absolute top-4 right-4 z-10"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-brand-mountain-meadow/20 border border-brand-mountain-meadow rounded-full"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
          </motion.div>

          <motion.div 
            className="bg-brand-cod-gray p-6 border-b border-brand-mountain-meadow/20"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h3 
              className="font-playfair text-2xl font-bold text-white"
              whileHover={{ scale: 1.02 }}
            >
              {selectedClient.name.toUpperCase()}
            </motion.h3>
            <motion.p 
              className="text-brand-mountain-meadow text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {selectedClient.category}
            </motion.p>
          </motion.div>

          <div className="bg-brand-black p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {selectedClient.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 300
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 15px 35px rgba(21, 206, 160, 0.2)"
                  }}
                  className="relative aspect-[4/3] overflow-hidden bg-brand-cod-gray rounded-lg cursor-pointer"
                >
                  <img 
                    src={image}
                    alt={`${selectedClient.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-brand-mountain-meadow/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </div>

            {selectedClient.videos && selectedClient.videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.h4 
                  className="font-playfair text-xl font-semibold text-white mb-4"
                  whileHover={{ x: 5 }}
                >
                  Project Videos
                </motion.h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedClient.videos.map((videoId, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: "0 10px 25px rgba(21, 206, 160, 0.3)"
                      }}
                      className="relative aspect-video bg-brand-cod-gray rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openVideo(videoId)}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`${selectedClient.name} Video ${index + 1}`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                      <motion.div 
                        className="absolute inset-0 bg-brand-mountain-meadow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ opacity: 0.2 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnhancedGalleryModal;
