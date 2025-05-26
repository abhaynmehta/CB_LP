
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSpring, animated } from '@react-spring/web';

const clientWork = [
  {
    id: 1,
    name: "Luxury Fashion Brand",
    category: "Fashion",
    preview: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    videos: ["dQw4w9WgXcQ", "dQw4w9WgXcQ"]
  },
  {
    id: 2,
    name: "Tech Startup",
    category: "Technology", 
    preview: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    videos: ["dQw4w9WgXcQ"]
  },
  {
    id: 3,
    name: "Wellness Brand",
    category: "Health",
    preview: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    videos: ["dQw4w9WgXcQ", "dQw4w9WgXcQ", "dQw4w9WgXcQ"]
  },
  {
    id: 4,
    name: "Architecture Firm", 
    category: "Architecture",
    preview: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    videos: ["dQw4w9WgXcQ"]
  },
  {
    id: 5,
    name: "E-commerce Platform",
    category: "E-commerce", 
    preview: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    videos: ["dQw4w9WgXcQ", "dQw4w9WgXcQ"]
  }
];

const LiveScrollGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedClient, setSelectedClient] = useState<typeof clientWork[0] | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Create a seamless infinite scroll using CSS animation
  const itemWidth = 320; // w-80 = 320px
  const gap = 24; // gap-6 = 24px
  const totalItemWidth = itemWidth + gap;

  const openVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  // Create enough repeated items for seamless infinite scroll
  const repeatedItems = [...clientWork, ...clientWork, ...clientWork, ...clientWork];

  return (
    <section ref={ref} className="py-20 bg-brand-black overflow-hidden">
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

        {/* Live Scrolling Gallery */}
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
              animation: `scroll-infinite 40s linear infinite ${isHovered ? 'paused' : 'running'}`,
              width: `${repeatedItems.length * totalItemWidth}px`
            }}
          >
            {repeatedItems.map((client, index) => (
              <motion.div
                key={`${client.id}-${Math.floor(index / clientWork.length)}-${index}`}
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
                onClick={() => setSelectedClient(client)}
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
                
                {/* Floating particles effect on hover */}
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
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedClient(null)}
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
                  onClick={() => setSelectedClient(null)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </motion.div>

              {/* Modal Header */}
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

              {/* Modal Content */}
              <div className="bg-brand-black p-6 max-h-[60vh] overflow-y-auto">
                {/* Images Grid */}
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

                {/* Videos Section */}
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
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${clientWork.length * totalItemWidth}px);
          }
        }
      `}</style>
    </section>
  );
};

export default LiveScrollGallery;
