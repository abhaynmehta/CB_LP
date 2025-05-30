import { Fragment } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EnhancedServices from '@/components/EnhancedServices';
import LiveScrollGallery from '@/components/LiveScrollGallery';
import VideoSection from '@/components/VideoSection';
import TeamSection from '@/components/TeamSection';
import BookCall from '@/components/BookCall';
import Footer from '@/components/Footer';
import CaseStudies from '@/components/CaseStudies';

/**
 * Main landing page component
 * Organized into semantic sections for better SEO and accessibility
 *
 * @note
 * The entire page is wrapped in a div with overflowX: 'hidden' and width: '100vw' to prevent
 * any child component (especially those with absolute positioning or large backgrounds)
 * from causing unwanted horizontal scrollbars. This is a robust fix for extra scrollbars
 * caused by overflow in deeply nested or absolutely positioned elements.
 */
const Index = () => {
  return (
    <Fragment>
      {/* Global wrapper to prevent horizontal overflow and extra scrollbars */}
      <div style={{ overflowX: 'hidden', width: '100vw' }}>
        <div className="min-h-screen">
          {/* Navigation */}
          <Navbar />
          
          {/* Main content sections with proper semantic HTML */}
          <main>
            {/* Hero section - primary conversion area */}
            <section id="hero" aria-label="Hero">
              <Hero />
            </section>
            
            {/* Portfolio showcase */}
            <section id="portfolio" aria-label="Portfolio">
              <LiveScrollGallery />
            </section>
            
            {/* Services overview */}
            <section id="services" aria-label="Services">
              <EnhancedServices />
            </section>
            
            {/* Video content */}
            <section id="videos" aria-label="Videos">
              <VideoSection />
            </section>

            {/* Case Studies section */}
            <section id="case-studies" aria-label="Case Studies">
              <CaseStudies />
            </section>
            
            {/* Team information */}
            <section id="team" aria-label="Team">
              <TeamSection />
            </section>
            
            {/* Contact and conversion */}
            <section id="contact" aria-label="Contact">
              <BookCall />
            </section>
          </main>
          
          {/* Site footer */}
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
