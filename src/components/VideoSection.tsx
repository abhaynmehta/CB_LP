
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play } from 'lucide-react';

const testimonialVideos = [
  {
    id: 1,
    title: "Client Success Story",
    client: "Luxury Fashion Brand",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Brand Transformation",
    client: "Tech Startup",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Digital Growth",
    client: "Wellness Brand",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Creative Excellence",
    client: "Architecture Firm",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube video IDs
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const openVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <section ref={ref} className="py-20 bg-brand-cod-gray">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4">
            Watch How We
          </h2>
          <h3 className="font-playfair text-4xl md:text-6xl font-bold text-brand-mountain-meadow mb-6">
            Create Impact
          </h3>
          <p className="font-inter text-xl text-gray-300 max-w-2xl mx-auto">
            Hear directly from our clients about their transformation journey
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {testimonialVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg bg-brand-black"
              onClick={() => openVideo(video.youtubeId)}
            >
              <div className="relative aspect-video">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-colors duration-300"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-brand-mountain-meadow rounded-full flex items-center justify-center shadow-2xl group-hover:bg-white transition-colors duration-300"
                  >
                    <Play className="h-6 w-6 text-brand-black ml-1" fill="currentColor" />
                  </motion.div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent"></div>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-brand-mountain-meadow text-sm font-inter uppercase tracking-wider mb-1">
                  Testimonial
                </p>
                <h4 className="font-playfair text-xl font-semibold text-white mb-1">
                  {video.title}
                </h4>
                <p className="text-gray-300 text-sm font-inter">
                  {video.client}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-mountain-meadow/50 transition-colors duration-300 rounded-lg"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
