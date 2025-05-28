
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import LiveScrollGallery from '@/components/LiveScrollGallery';
import VideoSection from '@/components/VideoSection';
import TeamSection from '@/components/TeamSection';
import BookCall from '@/components/BookCall';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="portfolio">
        <LiveScrollGallery />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="videos">
        <VideoSection />
      </section>
      <section id="team">
        <TeamSection />
      </section>
      <section id="contact">
        <BookCall />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
