
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import ReactPlayer from 'react-player';
import { VIDEO_URLS, IMAGE_URLS } from '@/utils/mediaConstants';
import { GRADIENTS, TRANSITIONS } from '@/utils/constants';
import { useResponsive } from '@/hooks/useResponsive';

/**
 * Video testimonials section with mobile optimization
 * Uses centralized media management and consistent gradients
 */
const testimonialVideos = [
  {
    id: 1,
    title: "Client Success Story",
    client: "Luxury Fashion Brand",
    youtubeId: VIDEO_URLS.casestudies.luxuryFashion,
    thumbnail: IMAGE_URLS.casestudies.luxuryFashion
  },
  {
    id: 2,
    title: "Brand Transformation",
    client: "Tech Startup",
    youtubeId: VIDEO_URLS.casestudies.techStartup,
    thumbnail: IMAGE_URLS.casestudies.techStartup
  },
  {
    id: 3,
    title: "Digital Growth",
    client: "Wellness Brand",
    youtubeId: VIDEO_URLS.casestudies.wellnessBrand,
    thumbnail: IMAGE_URLS.casestudies.wellnessBrand
  },
  {
    id: 4,
    title: "Creative Excellence",
    client: "Architecture Firm",
    youtubeId: VIDEO_URLS.casestudies.architectureFirm,
    thumbnail: IMAGE_URLS.casestudies.architectureFirm
  }
];

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const { isMobile, isTouchDevice } = useResponsive();

  const handleVideoHover = (videoId: number) => {
    if (!isTouchDevice) {
      setHoveredVideo(videoId);
      setPlayingVideo(videoId);
    }
  };

  const handleVideoClick = (videoId: number) => {
    if (isTouchDevice) {
      setHoveredVideo(hoveredVideo === videoId ? null : videoId);
      setPlayingVideo(playingVideo === videoId ? null : videoId);
    }
  };

  const handleVideoLeave = () => {
    if (!isTouchDevice) {
      setHoveredVideo(null);
      setPlayingVideo(null);
    }
  };

  return (
    <section 
      ref={ref} 
      className={`py-12 md:py-20 ${GRADIENTS.backgroundAlt} relative overflow-hidden`}
    >
      {/* Enhanced animated background gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(21, 206, 160, 0.08), transparent, rgba(12, 154, 119, 0.08))",
            "linear-gradient(135deg, rgba(12, 154, 119, 0.08), transparent, rgba(21, 206, 160, 0.08))",
            "linear-gradient(45deg, rgba(21, 206, 160, 0.08), transparent, rgba(12, 154, 119, 0.08))"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={isMobile ? TRANSITIONS.mobileOptimized : TRANSITIONS.smooth}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 
            className="font-playfair text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4"
            whileHover={!isMobile ? { scale: 1.02 } : {}}
          >
            Watch How We
          </motion.h2>
          <motion.h3 
            className={`font-playfair text-3xl md:text-4xl lg:text-6xl font-bold ${GRADIENTS.primary} bg-clip-text text-transparent mb-4 md:mb-6`}
            whileHover={!isMobile ? { scale: 1.02 } : {}}
          >
            Create Impact
          </motion.h3>
          <motion.p 
            className="font-inter text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4"
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
          className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-2 gap-8'}`}
        >
          {testimonialVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: isMobile ? TRANSITIONS.mobileOptimized.duration : 0.6, 
                delay: index * 0.1 
              }}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${GRADIENTS.background}`}
              onMouseEnter={() => handleVideoHover(video.id)}
              onMouseLeave={handleVideoLeave}
              onClick={() => handleVideoClick(video.id)}
              whileHover={!isMobile ? { scale: 1.02, y: -5 } : {}}
              whileTap={{ scale: 0.98 }}
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
                    <div className={`absolute inset-0 ${GRADIENTS.overlay}`}></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={!isMobile ? { scale: 1.2, rotate: 360 } : {}}
                        whileTap={{ scale: 0.9 }}
                        className={`w-12 h-12 md:w-16 md:h-16 ${GRADIENTS.primary} rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-brand-mountain-meadow/50 transition-all duration-500`}
                      >
                        {hoveredVideo === video.id ? (
                          <Pause className="h-4 w-4 md:h-6 md:w-6 text-brand-black ml-0" fill="currentColor" />
                        ) : (
                          <Play className="h-4 w-4 md:h-6 md:w-6 text-brand-black ml-1" fill="currentColor" />
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
                  className="text-brand-mountain-meadow text-xs md:text-sm font-inter uppercase tracking-wider mb-1"
                  whileHover={!isMobile ? { x: 5 } : {}}
                >
                  Testimonial
                </motion.p>
                <motion.h4 
                  className="font-playfair text-lg md:text-xl font-semibold text-white mb-1"
                  whileHover={!isMobile ? { x: 10 } : {}}
                >
                  {video.title}
                </motion.h4>
                <motion.p 
                  className="text-gray-300 text-sm font-inter"
                  whileHover={!isMobile ? { x: 5 } : {}}
                >
                  {video.client}
                </motion.p>
              </motion.div>

              {/* Hover Border Effect */}
              <motion.div 
                className="absolute inset-0 border-2 border-transparent group-hover:border-brand-mountain-meadow/50 transition-all duration-500 rounded-xl"
                whileHover={!isMobile ? {
                  borderColor: "rgba(21, 206, 160, 0.8)",
                  boxShadow: "0 0 30px rgba(21, 206, 160, 0.3)"
                } : {}}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
