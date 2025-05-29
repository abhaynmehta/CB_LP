
import { Fragment } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EnhancedServices from '@/components/EnhancedServices';
import LiveScrollGallery from '@/components/LiveScrollGallery';
import VideoSection from '@/components/VideoSection';
import Testimonials from '@/components/Testimonials';
import TeamSection from '@/components/TeamSection';
import BookCall from '@/components/BookCall';
import Footer from '@/components/Footer';
import { GRADIENTS } from '@/utils/constants';

/**
 * Main landing page component with enhanced gradients and mobile optimization
 * Organized into semantic sections for better SEO and accessibility
 */
const Index = () => {
  return (
    <Fragment>
      {/* SEO-optimized semantic structure with gradient backgrounds */}
      <div className={`min-h-screen ${GRADIENTS.background}`}>
        {/* Navigation */}
        <Navbar />
        
        {/* Main content sections with proper semantic HTML and gradients */}
        <main>
          {/* Hero section - primary conversion area */}
          <section id="hero" aria-label="Hero" className="relative">
            <Hero />
          </section>
          
          {/* Portfolio showcase with gradient background */}
          <section id="portfolio" aria-label="Portfolio" className={GRADIENTS.backgroundAlt}>
            <LiveScrollGallery />
          </section>
          
          {/* Services overview with enhanced gradients */}
          <section id="services" aria-label="Services" className={GRADIENTS.background}>
            <EnhancedServices />
          </section>
          
          {/* Video content with alternating gradient */}
          <section id="videos" aria-label="Videos" className={GRADIENTS.backgroundAlt}>
            <VideoSection />
          </section>
          
          {/* Client testimonials */}
          <section id="testimonials" aria-label="Testimonials" className={GRADIENTS.background}>
            <Testimonials />
          </section>
          
          {/* Team information with gradient */}
          <section id="team" aria-label="Team" className={GRADIENTS.backgroundAlt}>
            <TeamSection />
          </section>
          
          {/* Contact and conversion */}
          <section id="contact" aria-label="Contact" className={GRADIENTS.background}>
            <BookCall />
          </section>
        </main>
        
        {/* Site footer with gradient */}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Index;
