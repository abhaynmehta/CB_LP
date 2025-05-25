
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
      <Hero />
      <LiveScrollGallery />
      <Services />
      <VideoSection />
      <TeamSection />
      <BookCall />
      <Footer />
    </div>
  );
};

export default Index;
