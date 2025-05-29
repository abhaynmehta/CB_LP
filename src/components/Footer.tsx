
import { motion } from 'framer-motion';
import { fadeInFromBottom, standardTransition } from '@/utils/animations';
import { SEO_CONFIG } from '@/utils/constants';

/**
 * Site footer with enhanced SEO structure and consistent branding
 * Includes proper semantic markup and accessibility features
 */
const Footer = () => {
  return (
    <footer 
      className="bg-brand-black text-white py-12 border-t border-brand-cod-gray"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          variants={fadeInFromBottom}
          transition={standardTransition}
          className="text-center"
        >
          {/* Company branding */}
          <h3 className="font-playfair text-3xl font-bold mb-4 text-brand-mountain-meadow">
            {SEO_CONFIG.siteName}
          </h3>
          
          {/* Company tagline */}
          <p className="font-inter text-gray-400 mb-6">
            {SEO_CONFIG.siteDescription}
          </p>
          
          {/* Copyright and legal */}
          <div className="border-t border-brand-cod-gray pt-6">
            <p className="font-inter text-sm text-gray-500">
              © {new Date().getFullYear()} {SEO_CONFIG.siteName}. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
