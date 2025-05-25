
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ClientWork } from '@/types/gallery';

interface GalleryGridProps {
  clientWork: ClientWork[];
  onClientSelect: (client: ClientWork) => void;
}

const GalleryGrid = ({ clientWork, onClientSelect }: GalleryGridProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {clientWork.slice(currentSlide, currentSlide + 5).map((client) => (
          <motion.div
            key={client.id}
            className="relative cursor-pointer group aspect-[4/5] overflow-hidden bg-brand-cod-gray"
            whileHover={{ scale: 1.02 }}
            onClick={() => onClientSelect(client)}
          >
            <img 
              src={client.preview}
              alt={client.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent"></div>
            
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

            <div className="absolute inset-0 bg-brand-mountain-meadow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </div>

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
    </div>
  );
};

export default GalleryGrid;
