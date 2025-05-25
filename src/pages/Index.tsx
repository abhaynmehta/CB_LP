
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import VideoSection from '@/components/VideoSection';
import ClientGallery from '@/components/ClientGallery';
import Testimonials from '@/components/Testimonials';
import BookCall from '@/components/BookCall';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <VideoSection />
      <ClientGallery />
      <Testimonials />
      <BookCall />
      <Footer />
    </div>
  );
};

export default Index;
