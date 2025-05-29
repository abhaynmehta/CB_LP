
import { Fragment } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EnhancedServices from '@/components/EnhancedServices';
import LiveScrollGallery from '@/components/LiveScrollGallery';
import VideoSection from '@/components/VideoSection';
import TeamSection from '@/components/TeamSection';
import BookCall from '@/components/BookCall';
import Footer from '@/components/Footer';

/**
 * Main landing page component
 * Organized into semantic sections for better SEO and accessibility
 */
const Index = () => {
  return (
    <Fragment>
      {/* SEO-optimized semantic structure */}
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
    </Fragment>
  );
};

export default Index;
