
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    title: "Brand Strategy",
    subtitle: "& Identity",
    description: "Strategic brand asset identity and creation",
    delay: 0.1
  },
  {
    title: "App/Web",
    subtitle: "Development", 
    description: "Custom web and mobile applications with modern tech stack",
    delay: 0.2
  },
  {
    title: "Content-Driven",
    subtitle: "Marketing", 
    description: "Metrics-driven plan to strategic full strategy",
    delay: 0.3
  },
  {
    title: "Social",
    subtitle: "Campaign Direction",
    description: "Provide and set launch across channels",
    delay: 0.4
  },
  {
    title: "Content Production",
    subtitle: "& Shoot",
    description: "Prioritize content unique to style unique use",
    delay: 0.5
  }
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-brand-cod-gray">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4">
            What We Do
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: service.delay }}
              className="text-center group hover:bg-brand-mountain-meadow/10 p-6 rounded-lg transition-all duration-300"
            >
              <h3 className="font-playfair text-2xl font-semibold text-white mb-2 group-hover:text-brand-mountain-meadow transition-colors duration-300">
                {service.title}
              </h3>
              <h4 className="font-playfair text-2xl font-semibold text-white mb-4 group-hover:text-brand-mountain-meadow transition-colors duration-300">
                {service.subtitle}
              </h4>
              <p className="font-inter text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
