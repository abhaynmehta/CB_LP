import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

/**
 * @component BookCall
 * @description This component renders a section for encouraging users to book a discovery call.
 * It features a call-to-action button with a Calendly integration and uses Framer Motion
 * for scroll-based animations.
 */
const BookCall = () => {
  // Create a ref to attach to the section for scroll-based animation detection.
  const ref = useRef(null);
  // Determine if the section is in view to trigger animations, only once.
  const isInView = useInView(ref, { once: true });

  /**
   * @function openCalendly
   * @description Handles the click event for the 'Book a Discovery Call' button.
   * Opens the Calendly scheduling link in a new tab. The URL is retrieved from
   * environment variables for flexible configuration.
   */
  const openCalendly = () => {
    // Directly use the Calendly URL.
    const calendlyUrl = 'https://calendly.com/contentbrewer001/new-meeting';
    // Open the Calendly URL in a new browser tab.
    window.open(calendlyUrl, '_blank');
  };

  return (
    // Section container with background gradient and text styling.
    <section ref={ref} className="py-20 bg-gradient-to-br from-brand-cod-gray to-brand-black text-white">
      <div className="container mx-auto px-6 text-center">
        {/* Motion div for animating the main heading and paragraph. */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Initial animation state (hidden below and transparent).
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Animate to visible when in view.
          transition={{ duration: 0.8 }} // Animation duration.
        >
          {/* Main heading for the section, with responsive font sizes. */}
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            Let's Build Something
            <br />
            Extraordinary
          </h2>
          <p className="font-inter text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Ready to push the boundaries of the digital realm?
            <br />
            Whether you need a comprehensive digital marketing strategy, a viral content campaign, or a high performance web app, I'm ready to bring your vision to life.
          </p>

          {/* Motion div for animating the call-to-action button. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} // Initial animation state (hidden below and transparent).
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // Animate to visible when in view.
            transition={{ duration: 0.6, delay: 0.3 }} // Animation duration with a slight delay.
          >
            {/*
             * Button component for booking a discovery call.
             * Adjusting padding (px-6 for mobile, md:px-8 for medium screens and up)
             * and font size (text-base for mobile, md:text-lg for medium screens and up)
             * for better responsiveness on smaller screens to prevent content from being cut off.
             * Includes Calendar and ArrowRight icons for visual emphasis.
             */}
            <Button
              size="lg"
              onClick={openCalendly}
              className="bg-brand-mountain-meadow text-brand-black hover:bg-brand-gossamer font-inter font-semibold px-6 py-4 text-base md:px-8 md:text-lg transition-all duration-300 group"
            >
              <Calendar className="mr-2 h-5 w-5" />
              BOOK A DISCOVERY CALL
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>

          {/* Motion paragraph for animating the small disclaimer text. */}
          <motion.p
            initial={{ opacity: 0 }} // Initial animation state (transparent).
            animate={isInView ? { opacity: 1 } : { opacity: 0 }} // Animate to visible when in view.
            transition={{ duration: 0.6, delay: 0.6 }} // Animation duration with a longer delay.
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
