
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-brand-black text-white py-12 border-t border-brand-cod-gray">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="font-playfair text-3xl font-bold mb-4 text-brand-mountain-meadow">
            Content Brewer
          </h3>
          <p className="font-inter text-gray-400 mb-6">
            Crafting brands like haute couture
          </p>
          <div className="border-t border-brand-cod-gray pt-6">
            <p className="font-inter text-sm text-gray-500">
              © 2024 Content Brewer. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
