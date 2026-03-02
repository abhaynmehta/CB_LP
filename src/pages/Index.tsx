import { Fragment, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import EnhancedServices from '@/components/EnhancedServices';
import LiveScrollGallery from '@/components/LiveScrollGallery';
import VideoSection from '@/components/VideoSection';
import BookCall from '@/components/BookCall';
import Footer from '@/components/Footer';
import CaseStudies from '@/components/CaseStudies';
import Testimonials from '@/components/Testimonials';

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
  useEffect(() => {
    // Advanced content protection to prevent scraping/stealing
    const preventContextMenu = (e: MouseEvent) => e.preventDefault();
    const preventCopy = (e: ClipboardEvent) => e.preventDefault();
    const preventDrag = (e: DragEvent) => e.preventDefault();

    // Prevent dev tools shortcuts
    const preventKeyboardSecrets = (e: KeyboardEvent) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
        (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'U')) ||
        (e.ctrlKey && e.key === 'U') ||
        (e.metaKey && e.key === 'U') ||
        (e.ctrlKey && e.key === 'S') ||
        (e.metaKey && e.key === 'S')
      ) {
        e.preventDefault();
      }
    };

    // Attach listeners
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('copy', preventCopy);
    document.addEventListener('dragstart', preventDrag);
    document.addEventListener('keydown', preventKeyboardSecrets);

    return () => {
      // Cleanup
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('dragstart', preventDrag);
      document.removeEventListener('keydown', preventKeyboardSecrets);
    };
  }, []);

  return (
    <Fragment>
      {/* Global wrapper to prevent horizontal overflow and extra scrollbars */}
      <div
        style={{
          overflowX: 'hidden',
          width: '100vw',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="min-h-screen">
          {/* Navigation */}
          <Navbar />

          {/* Main content sections with proper semantic HTML */}
          <main>
            {/* Hero section - primary conversion area */}
            <section id="hero" aria-label="Hero">
              <Hero />
            </section>

            {/* Personal About segment */}
            <section id="about" aria-label="About Me">
              <AboutUs />
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

            {/* Testimonials */}
            <section id="testimonials" aria-label="Testimonials">
              <Testimonials />
            </section>

            {/* Case Studies section */}
            <section id="case-studies" aria-label="Case Studies">
              <CaseStudies />
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
