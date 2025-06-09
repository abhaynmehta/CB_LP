import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

const BookCall = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const openCalendly = () => {
    // Replace with your actual Calendly URL from environment variable
    const calendlyUrl = process.env.REACT_APP_CALENDLY_URL || 'https://calendly.com/your-link';
    window.open(calendlyUrl, '_blank');
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-brand-cod-gray to-brand-black text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform
            <br />
            Your Brand?
          </h2>
          <p className="font-inter text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Is your brand just making noise — or actually being heard?
            <br />
            At Content Brewer, we don't create content for the sake of content.
            <br />
            We craft experiences that make people pause, feel, and remember.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              size="lg"
              onClick={openCalendly}
              className="bg-brand-mountain-meadow text-brand-black hover:bg-brand-gossamer font-inter font-semibold px-8 py-4 text-lg transition-all duration-300 group"
            >
              <Calendar className="mr-2 h-5 w-5" />
              BOOK A DISCOVERY CALL
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-inter text-sm text-gray-400 mt-6"
          >
            30-minute strategy session • No commitment required
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default BookCall;
