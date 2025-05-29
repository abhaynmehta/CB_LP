
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    title: "Brand Strategy",
    subtitle: "& Identity",
    description: "Strategic brand asset identity and creation with comprehensive market research and positioning",
  },
  {
    title: "App/Web",
    subtitle: "Development", 
    description: "Custom web and mobile applications with modern tech stack and responsive design",
  },
  {
    title: "Content-Driven",
    subtitle: "Marketing", 
    description: "Metrics-driven plan to strategic full strategy with data analytics and optimization",
  },
  {
    title: "Social Media",
    subtitle: "Campaign Direction",
    description: "Provide and set launch across channels with influencer partnerships and engagement",
  },
  {
    title: "Content Production",
    subtitle: "& Creative Shoots",
    description: "Prioritize content unique to style with professional photography and videography",
  },
  {
    title: "SEO & Analytics",
    subtitle: "Optimization",
    description: "Search engine optimization and comprehensive analytics tracking for maximum visibility",
  },
  {
    title: "E-commerce",
    subtitle: "Solutions",
    description: "Complete e-commerce platform development with payment integration and inventory management",
  },
  {
    title: "Consulting",
    subtitle: "& Strategy",
    description: "Expert business consulting and strategic planning for digital transformation and growth",
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full min-w-[300px] max-w-[350px]"
    >
      <Card className="h-full bg-brand-cod-gray/80 backdrop-blur-sm border-brand-mountain-meadow/20 hover:border-brand-mountain-meadow/40 transition-all duration-300 hover:transform hover:scale-105">
        <CardHeader className="text-center pb-4">
          <CardTitle className="font-playfair text-xl text-white mb-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {service.title}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="text-brand-mountain-meadow"
            >
              {service.subtitle}
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.p 
            className="text-gray-300 leading-relaxed font-inter"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1 + 0.7 }}
          >
            {service.description}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const EnhancedServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + cardsPerView >= services.length ? 0 : prev + cardsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - cardsPerView < 0 ? Math.max(0, services.length - cardsPerView) : prev - cardsPerView
    );
  };

  const visibleServices = services.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section ref={ref} className="py-20 bg-brand-cod-gray relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.8, rotateX: -15 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
          >
            What We Do
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer mx-auto"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 96, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <div className="relative">
          <div className="flex justify-center items-center gap-6 min-h-[400px]">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="bg-brand-mountain-meadow/20 border-brand-mountain-meadow/40 hover:bg-brand-mountain-meadow/30 text-white"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex gap-6 justify-center flex-1">
              {visibleServices.map((service, index) => (
                <ServiceCard 
                  key={currentIndex + index} 
                  service={service} 
                  index={index} 
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="bg-brand-mountain-meadow/20 border-brand-mountain-meadow/40 hover:bg-brand-mountain-meadow/30 text-white"
              disabled={currentIndex + cardsPerView >= services.length}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-8"
          >
            <p className="text-brand-mountain-meadow font-inter">
              {Math.floor(currentIndex / cardsPerView) + 1} of {Math.ceil(services.length / cardsPerView)}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedServices;
