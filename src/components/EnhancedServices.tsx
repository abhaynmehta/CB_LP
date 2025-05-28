
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const services = [
  {
    title: "Brand Strategy",
    subtitle: "& Identity",
    description: "Strategic brand asset identity and creation with comprehensive market research and positioning",
    icon: "🎯",
    gradient: "from-brand-mountain-meadow/20 to-brand-gossamer/20"
  },
  {
    title: "App/Web",
    subtitle: "Development", 
    description: "Custom web and mobile applications with modern tech stack and responsive design",
    icon: "💻",
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    title: "Content-Driven",
    subtitle: "Marketing", 
    description: "Metrics-driven plan to strategic full strategy with data analytics and optimization",
    icon: "📊",
    gradient: "from-green-500/20 to-teal-500/20"
  },
  {
    title: "Social Media",
    subtitle: "Campaign Direction",
    description: "Provide and set launch across channels with influencer partnerships and engagement",
    icon: "📱",
    gradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    title: "Content Production",
    subtitle: "& Creative Shoots",
    description: "Prioritize content unique to style with professional photography and videography",
    icon: "📸",
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "SEO & Analytics",
    subtitle: "Optimization",
    description: "Search engine optimization and comprehensive analytics tracking for maximum visibility",
    icon: "🔍",
    gradient: "from-indigo-500/20 to-blue-500/20"
  },
  {
    title: "E-commerce",
    subtitle: "Solutions",
    description: "Complete e-commerce platform development with payment integration and inventory management",
    icon: "🛒",
    gradient: "from-yellow-500/20 to-orange-500/20"
  },
  {
    title: "Consulting",
    subtitle: "& Strategy",
    description: "Expert business consulting and strategic planning for digital transformation and growth",
    icon: "💡",
    gradient: "from-purple-500/20 to-pink-500/20"
  }
];

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: 1
      } : { 
        opacity: 0, 
        y: 100, 
        rotateX: -15,
        scale: 0.9
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        z: 50,
        transition: { duration: 0.3 }
      }}
      className="w-full min-w-[300px] max-w-[350px]"
    >
      <Card className={`h-full bg-gradient-to-br ${service.gradient} backdrop-blur-sm border-brand-mountain-meadow/20 hover:border-brand-mountain-meadow/40 transition-all duration-300 shadow-lg hover:shadow-2xl`}>
        <CardHeader className="text-center pb-4">
          <motion.div 
            className="text-4xl mb-3"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {service.icon}
          </motion.div>
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

  return (
    <section ref={ref} className="py-20 bg-brand-cod-gray relative overflow-hidden">
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            What We Do
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <ScrollArea className="w-full">
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </ScrollArea>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-brand-mountain-meadow font-inter">
            ← Scroll horizontally to explore all services →
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedServices;
