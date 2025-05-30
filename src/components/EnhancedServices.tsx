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
      <div className="relative rounded-2xl overflow-hidden group">
        <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-brand-mountain-meadow/40 before:via-brand-gossamer/30 before:to-brand-mountain-meadow/40 before:opacity-60 group-hover:before:opacity-90 before:transition-all before:duration-500" />
        <Card className="relative z-10 h-full bg-white/10 backdrop-blur-xl border-none shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:ring-2 group-hover:ring-brand-mountain-meadow/40">
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-playfair text-2xl text-white mb-2 drop-shadow-lg">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-mountain-meadow group-hover:to-brand-gossamer transition-all duration-500"
              >
                {service.title}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="text-brand-mountain-meadow group-hover:text-brand-gossamer transition-colors duration-500"
              >
                {service.subtitle}
              </motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.p 
              className="text-gray-200 leading-relaxed font-inter group-hover:text-white transition-colors duration-500 text-base drop-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 + 0.7 }}
            >
              {service.description}
            </motion.p>
          </CardContent>
        </Card>
      </div>
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
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-brand-mountain-meadow/5 via-transparent to-brand-gossamer/5"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(21, 206, 160, 0.05) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 255, 204, 0.05) 100%)',
            'linear-gradient(135deg, rgba(0, 255, 204, 0.05) 0%, rgba(0, 0, 0, 0) 50%, rgba(21, 206, 160, 0.05) 100%)',
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

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
        </motion.div>

        <div className="flex justify-center items-center gap-6 min-h-[400px]">
          <button
            onClick={prevSlide}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-transparent shadow-none hover:bg-brand-mountain-meadow/15 hover:shadow-lg transition-all duration-300 text-brand-mountain-meadow disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
            disabled={currentIndex === 0}
            aria-label="Previous"
            type="button"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <div className="flex gap-6 justify-center flex-1">
            {visibleServices.map((service, index) => (
              <ServiceCard 
                key={currentIndex + index} 
                service={service} 
                index={index} 
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-transparent shadow-none hover:bg-brand-mountain-meadow/15 hover:shadow-lg transition-all duration-300 text-brand-mountain-meadow disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
            disabled={currentIndex + cardsPerView >= services.length}
            aria-label="Next"
            type="button"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedServices;
