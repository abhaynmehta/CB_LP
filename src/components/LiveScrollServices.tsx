
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    title: "Brand Strategy",
    subtitle: "& Identity",
    description: "Strategic brand asset identity and creation with comprehensive market research and positioning",
    icon: "🎯"
  },
  {
    title: "App/Web",
    subtitle: "Development", 
    description: "Custom web and mobile applications with modern tech stack and responsive design",
    icon: "💻"
  },
  {
    title: "Content-Driven",
    subtitle: "Marketing", 
    description: "Metrics-driven plan to strategic full strategy with data analytics and optimization",
    icon: "📊"
  },
  {
    title: "Social Media",
    subtitle: "Campaign Direction",
    description: "Provide and set launch across channels with influencer partnerships and engagement",
    icon: "📱"
  },
  {
    title: "Content Production",
    subtitle: "& Creative Shoots",
    description: "Prioritize content unique to style with professional photography and videography",
    icon: "📸"
  },
  {
    title: "SEO & Analytics",
    subtitle: "Optimization",
    description: "Search engine optimization and comprehensive analytics tracking for maximum visibility",
    icon: "🔍"
  },
  {
    title: "E-commerce",
    subtitle: "Solutions",
    description: "Complete e-commerce platform development with payment integration and inventory management",
    icon: "🛒"
  },
  {
    title: "Consulting",
    subtitle: "& Strategy",
    description: "Expert business consulting and strategic planning for digital transformation and growth",
    icon: "💡"
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0
      } : { 
        opacity: 0, 
        y: 50
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="w-full min-w-[300px] max-w-[350px] flex-shrink-0"
    >
      <div className="h-full bg-gradient-to-br from-brand-mountain-meadow/5 via-brand-gossamer/5 to-brand-mountain-meadow/10 backdrop-blur-sm border border-brand-mountain-meadow/20 hover:border-brand-mountain-meadow/40 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-lg p-6">
        <div className="text-center pb-4">
          <motion.div 
            className="text-4xl mb-3"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {service.icon}
          </motion.div>
          <div className="font-playfair text-xl text-white mb-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {service.title}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="text-brand-mountain-meadow"
            >
              {service.subtitle}
            </motion.div>
          </div>
        </div>
        <motion.p 
          className="text-gray-300 leading-relaxed font-inter text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {service.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const LiveScrollServices = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  const itemWidth = 320;
  const gap = 24;
  const totalItemWidth = itemWidth + gap;

  const repeatedItems = [...services, ...services, ...services];

  const scrollAnimation = `
    @keyframes scroll-services {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-${services.length * totalItemWidth}px);
      }
    }
  `;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -totalItemWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: totalItemWidth, behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="py-20 bg-brand-cod-gray relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: scrollAnimation }} />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #15cea0 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, #15cea0 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
          }}
        />
      </div>

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
            animate={isInView ? { 
              opacity: 1, 
              scale: 1, 
              rotateX: 0,
              backgroundPosition: ['0%', '100%', '0%']
            } : { 
              opacity: 0, 
              scale: 0.8, 
              rotateX: -15 
            }}
            transition={{ 
              duration: 1, 
              delay: 0.2,
              backgroundPosition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            style={{
              background: 'linear-gradient(-45deg, #ffffff, #15cea0, #0c9a77, #ffffff)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
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
          {/* Navigation Buttons */}
          <Button
            onClick={scrollLeft}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-brand-mountain-meadow/20 border-brand-mountain-meadow/40 hover:bg-brand-mountain-meadow/30 text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={scrollRight}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-brand-mountain-meadow/20 border-brand-mountain-meadow/40 hover:bg-brand-mountain-meadow/30 text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <motion.div 
            ref={scrollRef}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="flex gap-6 w-max px-16"
              style={{
                animation: `scroll-services 20s linear infinite ${isHovered ? 'paused' : 'running'}`,
                width: `${repeatedItems.length * totalItemWidth + 128}px`
              }}
            >
              {repeatedItems.map((service, index) => (
                <ServiceCard
                  key={`${service.title}-${Math.floor(index / services.length)}-${index}`}
                  service={service}
                  index={index % services.length}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveScrollServices;
