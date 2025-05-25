
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const clientWork = [
  {
    id: 1,
    name: "Luxury Fashion Brand",
    category: "Fashion",
    imageCount: "12 IMAGES",
    preview: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    name: "Tech Startup",
    category: "Technology", 
    imageCount: "8 IMAGES",
    preview: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    name: "Wellness Brand",
    category: "Health",
    imageCount: "15 IMAGES", 
    preview: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 4,
    name: "Architecture Firm", 
    category: "Architecture",
    imageCount: "20 IMAGES",
    preview: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 5,
    name: "E-commerce Platform",
    category: "E-commerce", 
    imageCount: "10 IMAGES",
    preview: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

const ClientGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedClient, setSelectedClient] = useState<typeof clientWork[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextImage = () => {
    if (selectedClient) {
      setCurrentImageIndex((prev) => 
        prev === selectedClient.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedClient) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedClient.gallery.length - 1 : prev - 1
      );
    }
  };

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

        {/* Gallery Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {clientWork.slice(currentSlide, currentSlide + 5).map((client, index) => (
              <motion.div
                key={client.id}
                className="relative cursor-pointer group aspect-[4/5] overflow-hidden bg-brand-cod-gray"
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedClient(client);
                  setCurrentImageIndex(0);
                }}
              >
                <img 
                  src={client.preview}
                  alt={client.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-brand-mountain-meadow text-xs font-inter uppercase tracking-wider mb-1">
                    {client.category}
                  </p>
                  <h3 className="font-playfair text-lg font-semibold text-white mb-1">
                    {client.name}
                  </h3>
                  <p className="text-gray-400 text-xs font-inter">
                    {client.imageCount}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-brand-mountain-meadow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full border border-brand-mountain-meadow text-brand-mountain-meadow hover:bg-brand-mountain-meadow hover:text-brand-black transition-all duration-300"
              onClick={prevSlide}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(clientWork.length / 5) }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentSlide / 5) === index 
                      ? 'bg-brand-mountain-meadow' 
                      : 'bg-brand-cod-gray'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full border border-brand-mountain-meadow text-brand-mountain-meadow hover:bg-brand-mountain-meadow hover:text-brand-black transition-all duration-300"
              onClick={nextSlide}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
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
              className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden"
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
                <div className="flex items-center gap-4">
                  <span className="text-brand-mountain-meadow font-inter text-sm">0{selectedClient.id}</span>
                  <div className="w-8 h-px bg-brand-mountain-meadow"></div>
                  <h3 className="font-playfair text-2xl font-bold text-white">
                    {selectedClient.name.toUpperCase()}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mt-2">{selectedClient.imageCount}</p>
              </div>

              {/* Modal Content */}
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
        )}
      </AnimatePresence>
    </section>
  );
};

export default ClientGallery;
