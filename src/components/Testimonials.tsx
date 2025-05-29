
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import ReactPlayer from 'react-player';
import { VIDEO_URLS, IMAGE_URLS } from '@/utils/mediaConstants';
import { GRADIENTS, TRANSITIONS } from '@/utils/constants';
import { useResponsive } from '@/hooks/useResponsive';

/**
 * Client testimonials with video integration
 * Mobile-optimized with centralized media management
 */
const testimonials = [
  {
    quote: "Their fashion-first approach transformed our brand.",
    client: "LUXURY CLIENT",
    youtubeId: VIDEO_URLS.testimonials.client1,
    thumbnail: IMAGE_URLS.testimonials.client1
  },
  {
    quote: "The creativity and attention to detail are unmatched.",
    client: "PREMIUM CLIENT", 
    youtubeId: VIDEO_URLS.testimonials.client2,
    thumbnail: IMAGE_URLS.testimonials.client2
  }
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const { isMobile, isTouchDevice } = useResponsive();

  const handleVideoHover = (index: number) => {
    if (!isTouchDevice) {
      setHoveredVideo(index);
      setPlayingVideo(index);
    }
  };

  const handleVideoClick = (index: number) => {
    if (isTouchDevice) {
      setHoveredVideo(hoveredVideo === index ? null : index);
      setPlayingVideo(playingVideo === index ? null : index);
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
      className={`py-12 md:py-20 ${GRADIENTS.background} text-white relative overflow-hidden`}
    >
      {/* Enhanced animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(21, 206, 160, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(12, 154, 119, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(21, 206, 160, 0.15) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={isMobile ? TRANSITIONS.mobileOptimized : TRANSITIONS.smooth}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 
            className={`font-playfair text-3xl md:text-4xl lg:text-6xl font-bold mb-4 ${GRADIENTS.text}`}
            whileHover={!isMobile ? { scale: 1.02 } : {}}
          >
            Client Stories
          </motion.h2>
        </motion.div>

        <div className={`grid grid-cols-1 ${isMobile ? 'gap-8' : 'lg:grid-cols-2 gap-12'}`}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: isMobile ? TRANSITIONS.mobileOptimized.duration : 0.6, 
                delay: index * 0.2 
              }}
              className="text-center group"
            >
              <motion.div 
                className={`mb-6 md:mb-8 relative ${isTouchDevice ? 'cursor-pointer' : 'cursor-pointer'}`}
                onMouseEnter={() => handleVideoHover(index)}
                onMouseLeave={handleVideoLeave}
                onClick={() => handleVideoClick(index)}
                whileHover={!isMobile ? { scale: 1.05, y: -10 } : {}}
                whileTap={{ scale: 0.95 }}
              >
                {playingVideo === index ? (
                  <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-brand-mountain-meadow/50 shadow-lg shadow-brand-mountain-meadow/25">
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${testimonial.youtubeId}`}
                      width={isMobile ? "96px" : "128px"}
                      height={isMobile ? "96px" : "128px"}
                      playing={true}
                      muted={false}
                      controls={false}
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                ) : (
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
                    <img 
                      src={testimonial.thumbnail}
                      alt="Client testimonial"
                      className="w-full h-full rounded-full object-cover border-4 border-white/20 group-hover:border-brand-mountain-meadow/50 transition-all duration-500"
                    />
                    <div className={`absolute inset-0 ${GRADIENTS.overlay} rounded-full group-hover:bg-brand-black/10 transition-colors duration-300`}></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={!isMobile ? { scale: 1.2 } : {}}
                        whileTap={{ scale: 0.9 }}
                        className={`w-6 h-6 md:w-8 md:h-8 ${GRADIENTS.primary} rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      >
                        {hoveredVideo === index ? (
                          <Pause className="h-2 w-2 md:h-3 md:w-3 text-brand-black" fill="currentColor" />
                        ) : (
                          <Play className="h-2 w-2 md:h-3 md:w-3 text-brand-black ml-0.5" fill="currentColor" />
                        )}
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.blockquote 
                className="font-playfair text-lg md:text-2xl lg:text-3xl font-medium mb-4 md:mb-6 leading-relaxed px-4"
                whileHover={!isMobile ? { scale: 1.02 } : {}}
              >
                "{testimonial.quote}"
              </motion.blockquote>
              
              <motion.cite 
                className="font-inter text-xs md:text-sm uppercase tracking-wider text-gray-400"
                whileHover={!isMobile ? { color: "#15cea0" } : {}}
              >
                {testimonial.client}
              </motion.cite>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
