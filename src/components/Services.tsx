
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
    title: "Content-Driven",
    subtitle: "Marketing", 
    description: "Metrics-driven plan to strategic full strategy",
    delay: 0.2
  },
  {
    title: "Social",
    subtitle: "Campaign Direction",
    description: "Provide and set launch across channels",
    delay: 0.3
  },
  {
    title: "Content Production",
    subtitle: "& Shoot",
    description: "Prioritize content unique to style unique use",
    delay: 0.4
  }
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-black mb-4">
            What We Do
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: service.delay }}
              className="text-center group"
            >
              <h3 className="font-playfair text-2xl font-semibold text-black mb-2 group-hover:text-gray-600 transition-colors duration-300">
                {service.title}
              </h3>
              <h4 className="font-playfair text-2xl font-semibold text-black mb-4 group-hover:text-gray-600 transition-colors duration-300">
                {service.subtitle}
              </h4>
              <p className="font-inter text-gray-600 leading-relaxed">
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
