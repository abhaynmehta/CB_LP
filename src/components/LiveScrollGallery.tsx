
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
  const [scrollX, setScrollX] = useState(0);

  // Calculate total width of one set of items (including gaps)
  const itemWidth = 320; // 80 * 4 (w-80 = 320px)
  const gap = 24; // gap-6 = 24px
  const totalItemWidth = itemWidth + gap;
  const totalSetWidth = clientWork.length * totalItemWidth;

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX(prev => {
        const newValue = prev - 2; // Increased from 1 to 2 for faster scrolling
        // Reset to 0 when we've scrolled one complete set
        if (Math.abs(newValue) >= totalSetWidth) {
          return 0;
        }
        return newValue;
      });
    }, 16); // Reduced from 50 to 16 for smoother animation (60fps)

    return () => clearInterval(interval);
  }, [totalSetWidth]);

  const springProps = useSpring({
    transform: `translateX(${scrollX}px)`,
    config: { tension: 200, friction: 50 }
  });

  const openVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  // Create multiple sets for seamless looping
  const repeatedItems = [...clientWork, ...clientWork, ...clientWork];

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
            Portfolio Gallery
          </h2>
          <p className="font-inter text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our client work and creative solutions
          </p>
        </motion.div>

        {/* Live Scrolling Gallery */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative overflow-hidden"
        >
          <animated.div 
            style={springProps}
            className="flex gap-6 w-max"
          >
            {repeatedItems.map((client, index) => (
              <motion.div
                key={`${client.id}-${index}`}
                className="relative cursor-pointer group w-80 h-96 overflow-hidden bg-brand-cod-gray rounded-lg flex-shrink-0"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedClient(client)}
              >
                <img 
                  src={client.preview}
                  alt={client.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-brand-mountain-meadow text-sm font-inter uppercase tracking-wider mb-2">
                    {client.category}
                  </p>
                  <h3 className="font-playfair text-xl font-semibold text-white">
                    {client.name}
                  </h3>
                </div>

                <div className="absolute inset-0 bg-brand-mountain-meadow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </motion.div>
            ))}
          </animated.div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedClient(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden bg-brand-cod-gray rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-brand-mountain-meadow/20 border border-brand-mountain-meadow"
                onClick={() => setSelectedClient(null)}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Modal Header */}
              <div className="bg-brand-cod-gray p-6 border-b border-brand-mountain-meadow/20">
                <h3 className="font-playfair text-2xl font-bold text-white">
                  {selectedClient.name.toUpperCase()}
                </h3>
                <p className="text-brand-mountain-meadow text-sm mt-2">{selectedClient.category}</p>
              </div>

              {/* Modal Content */}
              <div className="bg-brand-black p-6 max-h-[60vh] overflow-y-auto">
                {/* Images Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {selectedClient.gallery.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative aspect-[4/3] overflow-hidden bg-brand-cod-gray rounded-lg"
                    >
                      <img 
                        src={image}
                        alt={`${selectedClient.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Videos Section */}
                {selectedClient.videos && selectedClient.videos.length > 0 && (
                  <div>
                    <h4 className="font-playfair text-xl font-semibold text-white mb-4">Project Videos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedClient.videos.map((videoId, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="relative aspect-video bg-brand-cod-gray rounded-lg overflow-hidden cursor-pointer group"
                          onClick={() => openVideo(videoId)}
                        >
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`${selectedClient.name} Video ${index + 1}`}
                            className="w-full h-full"
                            allowFullScreen
                          />
                          <div className="absolute inset-0 bg-brand-mountain-meadow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LiveScrollGallery;
