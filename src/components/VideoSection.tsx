
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import ReactPlayer from 'react-player';

const testimonialVideos = [
  {
    id: 1,
    title: "Client Success Story",
    client: "Luxury Fashion Brand",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Brand Transformation",
    client: "Tech Startup",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Digital Growth",
    client: "Wellness Brand",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Creative Excellence",
    client: "Architecture Firm",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const handleVideoHover = (videoId: number) => {
    setHoveredVideo(videoId);
    setPlayingVideo(videoId);
  };

  const handleVideoLeave = () => {
    setHoveredVideo(null);
    setPlayingVideo(null);
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-brand-cod-gray via-brand-black to-brand-cod-gray relative overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-brand-mountain-meadow/5 via-transparent to-brand-gossamer/5"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(21, 206, 160, 0.05), transparent, rgba(12, 154, 119, 0.05))",
            "linear-gradient(135deg, rgba(12, 154, 119, 0.05), transparent, rgba(21, 206, 160, 0.05))",
            "linear-gradient(45deg, rgba(21, 206, 160, 0.05), transparent, rgba(12, 154, 119, 0.05))"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Watch How We
          </motion.h2>
          <motion.h3 
            className="font-playfair text-4xl md:text-6xl font-bold bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer bg-clip-text text-transparent mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Create Impact
          </motion.h3>
          <motion.p 
            className="font-inter text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Hear directly from our clients about their transformation journey
          </motion.p>
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
              className="relative group cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-brand-black to-brand-cod-gray"
              onMouseEnter={() => handleVideoHover(video.id)}
              onMouseLeave={handleVideoLeave}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="relative aspect-video">
                {playingVideo === video.id ? (
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    width="100%"
                    height="100%"
                    playing={true}
                    muted={false}
                    controls={false}
                    style={{ borderRadius: '12px' }}
                  />
                ) : (
                  <>
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent"></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-brand-mountain-meadow/50 transition-all duration-500"
                      >
                        {hoveredVideo === video.id ? (
                          <Pause className="h-6 w-6 text-brand-black ml-0" fill="currentColor" />
                        ) : (
                          <Play className="h-6 w-6 text-brand-black ml-1" fill="currentColor" />
                        )}
                      </motion.div>
                    </div>
                  </>
                )}
              </div>

              {/* Video Info */}
              <motion.div 
                className="absolute bottom-4 left-4 right-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.p 
                  className="text-brand-mountain-meadow text-sm font-inter uppercase tracking-wider mb-1"
                  whileHover={{ x: 5 }}
                >
                  Testimonial
                </motion.p>
                <motion.h4 
                  className="font-playfair text-xl font-semibold text-white mb-1"
                  whileHover={{ x: 10 }}
                >
                  {video.title}
                </motion.h4>
                <motion.p 
                  className="text-gray-300 text-sm font-inter"
                  whileHover={{ x: 5 }}
                >
                  {video.client}
                </motion.p>
              </motion.div>

              {/* Hover Border Effect */}
              <motion.div 
                className="absolute inset-0 border-2 border-transparent group-hover:border-brand-mountain-meadow/50 transition-all duration-500 rounded-xl"
                whileHover={{
                  borderColor: "rgba(21, 206, 160, 0.8)",
                  boxShadow: "0 0 30px rgba(21, 206, 160, 0.3)"
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
