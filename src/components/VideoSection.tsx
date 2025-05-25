
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

const testimonialVideos = [
  {
    id: 1,
    clientName: "Luxury Fashion Co.",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    quote: "Content Brewer transformed our brand completely"
  },
  {
    id: 2,
    clientName: "Tech Innovations Inc.",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    quote: "Exceptional strategy and execution"
  },
  {
    id: 3,
    clientName: "Wellness Studio",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    quote: "They understood our vision perfectly"
  },
  {
    id: 4,
    clientName: "Architecture Firm",
    videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    quote: "Professional, creative, and results-driven"
  }
];

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const openVideo = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  return (
    <section ref={ref} className="py-20 bg-brand-black text-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-8">
            Client Testimonials
          </h2>
          <p className="font-inter text-xl text-gray-300 max-w-2xl mx-auto">
            Hear directly from our clients about their experience working with Content Brewer
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {testimonialVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
              onClick={() => openVideo(video.videoId)}
            >
              <div className="relative aspect-video bg-brand-cod-gray rounded-xl overflow-hidden border-2 border-transparent group-hover:border-brand-mountain-meadow transition-all duration-300">
                <img 
                  src={video.thumbnail}
                  alt={`${video.clientName} testimonial`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-all duration-300"></div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 bg-brand-mountain-meadow/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-brand-mountain-meadow group-hover:bg-brand-mountain-meadow/30 transition-all duration-300">
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </div>
                </motion.div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-playfair text-lg font-semibold text-white mb-2">
                    {video.clientName}
                  </h3>
                  <p className="font-inter text-sm text-gray-300 line-clamp-2">
                    "{video.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* YouTube Video Modal */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Client Testimonial"
                className="w-full h-full rounded-xl"
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-brand-mountain-meadow transition-colors duration-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
