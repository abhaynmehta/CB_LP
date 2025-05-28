
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Palette, 
  Code, 
  TrendingUp, 
  Share2, 
  Camera, 
  Search, 
  BarChart3, 
  Lightbulb 
} from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: "Brand Strategy",
    subtitle: "& Identity",
    description: "Strategic brand positioning, visual identity design, and comprehensive brand guidelines that establish your unique market presence.",
    color: "from-brand-mountain-meadow to-brand-gossamer"
  },
  {
    icon: Code,
    title: "App/Web",
    subtitle: "Development", 
    description: "Custom web and mobile applications built with cutting-edge technology stack, optimized for performance and user experience.",
    color: "from-purple-500 to-purple-700"
  },
  {
    icon: TrendingUp,
    title: "Content-Driven",
    subtitle: "Marketing", 
    description: "Data-driven marketing strategies with compelling content that drives engagement, conversions, and sustainable growth.",
    color: "from-blue-500 to-blue-700"
  },
  {
    icon: Share2,
    title: "Social Media",
    subtitle: "Management",
    description: "Complete social media strategy, content creation, community management, and cross-platform campaign execution.",
    color: "from-pink-500 to-pink-700"
  },
  {
    icon: Camera,
    title: "Content Production",
    subtitle: "& Photography",
    description: "Professional photography, videography, and multimedia content creation tailored to your brand's unique aesthetic.",
    color: "from-orange-500 to-orange-700"
  },
  {
    icon: Search,
    title: "SEO",
    subtitle: "Optimization",
    description: "Technical SEO, content optimization, and strategic keyword targeting to improve search visibility and organic traffic.",
    color: "from-green-500 to-green-700"
  },
  {
    icon: BarChart3,
    title: "Analytics",
    subtitle: "& Insights",
    description: "Comprehensive data analysis, performance tracking, and actionable insights to optimize your digital strategy.",
    color: "from-indigo-500 to-indigo-700"
  },
  {
    icon: Lightbulb,
    title: "Creative",
    subtitle: "Consulting",
    description: "Strategic creative direction, innovative campaign concepts, and brand storytelling that resonates with your audience.",
    color: "from-yellow-500 to-yellow-700"
  }
];

const EnhancedServices = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeService, setActiveService] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={containerRef} className="relative py-24 bg-gradient-to-br from-brand-cod-gray via-brand-black to-brand-cod-gray overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-mountain-meadow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-gossamer/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            What We
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer">
              Craft
            </span>
          </motion.h2>
          <motion.p
            className="font-inter text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            From concept to execution, we brew exceptional digital experiences that elevate your brand
          </motion.p>
        </motion.div>

        {/* Services Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: -15 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setActiveService(index)}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-brand-mountain-meadow/30 transition-all duration-500 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glowing Background Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  layoutId={`glow-${index}`}
                />

                {/* Icon */}
                <motion.div
                  className="relative z-10 mb-6"
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 group-hover:shadow-2xl transition-shadow duration-500`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.h3 
                    className="font-playfair text-2xl font-bold text-white mb-2 group-hover:text-brand-mountain-meadow transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.h4 
                    className="font-playfair text-xl font-semibold text-gray-300 mb-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {service.subtitle}
                  </motion.h4>
                  <motion.p 
                    className="font-inter text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {service.description}
                  </motion.p>
                </div>

                {/* Hover Effect Lines */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-mountain-meadow to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gossamer to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center delay-75"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Service Counter */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex justify-center items-center space-x-2">
            {services.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeService === index 
                    ? 'bg-brand-mountain-meadow scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          <motion.p
            className="font-inter text-brand-mountain-meadow mt-4 text-lg"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {services.length} Services • Infinite Possibilities
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedServices;
