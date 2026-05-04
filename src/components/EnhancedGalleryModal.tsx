import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactPlayer from 'react-player';
import { useState } from 'react';

interface Client {
  id: number;
  name: string;
  category: string;
  videos?: string[];
}

interface EnhancedGalleryModalProps {
  selectedClient: Client | null;
  onClose: () => void;
}

const EnhancedGalleryModal = ({ selectedClient, onClose }: EnhancedGalleryModalProps) => {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

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
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden bg-brand-cod-gray rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-brand-mountain-meadow/20 border border-brand-mountain-meadow rounded-full"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="bg-brand-cod-gray p-6 border-b border-brand-mountain-meadow/20">
            <h3 className="font-playfair text-2xl font-bold text-white">
              {selectedClient.name.toUpperCase()}
            </h3>
            <p className="text-brand-mountain-meadow text-sm mt-2">
              {selectedClient.category}
            </p>
          </div>

          <div className="bg-brand-black p-6 max-h-[60vh] overflow-y-auto">
            <h4 className="font-playfair text-xl font-semibold text-white mb-4">
              Project Videos
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedClient.videos?.map((videoId, index) => {
                const isLocalMp4 = videoId.endsWith('.mp4');
                const isLocalImage = videoId.match(/\.(jpeg|jpg|gif|png)$/i);
                return (
                <motion.div
                  key={videoId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 10px 25px rgba(21, 206, 160, 0.3)"
                  }}
                  className="relative aspect-video bg-brand-cod-gray rounded-lg overflow-hidden cursor-pointer group"
                  onMouseEnter={() => setHoveredVideo(videoId)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  {isLocalMp4 ? (
                    <video
                      src={`/assests/portfolio/${videoId}`}
                      className="w-full h-full object-cover"
                      autoPlay={hoveredVideo === videoId}
                      loop
                      muted={hoveredVideo !== videoId}
                      controls={hoveredVideo === videoId}
                      style={{ borderRadius: '12px' }}
                    />
                  ) : isLocalImage ? (
                    <img
                      src={`/assests/portfolio/${videoId}`}
                      alt={`${selectedClient.name} Proof ${index + 1}`}
                      className="w-full h-full object-contain bg-brand-black"
                    />
                  ) : hoveredVideo === videoId ? (
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${videoId}`}
                      width="100%"
                      height="100%"
                      playing={true}
                      controls={false}
                      style={{ borderRadius: '12px' }}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={`${selectedClient.name} Video ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-16 h-16 bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-brand-mountain-meadow/50 transition-all duration-500"
                        >
                          <svg
                            className="w-6 h-6 text-brand-black ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )})}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnhancedGalleryModal;
