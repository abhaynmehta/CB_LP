
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import ReactPlayer from 'react-player';

const testimonials = [
  {
    quote: "Their fashion first approach transformed our brand.",
    client: "CLIENT",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    quote: "The creativity and attention to detail are unmatched.",
    client: "CLIENT",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const handleVideoHover = (index: number) => {
    setHoveredVideo(index);
    setPlayingVideo(index);
  };

  const handleVideoLeave = () => {
    setHoveredVideo(null);
    setPlayingVideo(null);
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-brand-black via-brand-cod-gray to-brand-black text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(21, 206, 160, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(12, 154, 119, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(21, 206, 160, 0.1) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-playfair text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-brand-mountain-meadow to-white bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            Client Stories
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center group"
            >
              <motion.div 
                className="mb-8 relative cursor-pointer"
                onMouseEnter={() => handleVideoHover(index)}
                onMouseLeave={handleVideoLeave}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {playingVideo === index ? (
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-brand-mountain-meadow/50 shadow-lg shadow-brand-mountain-meadow/25">
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${testimonial.youtubeId}`}
                      width="128px"
                      height="128px"
                      playing={true}
                      muted={false}
                      controls={false}
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                ) : (
                  <div className="relative w-32 h-32 mx-auto">
                    <img 
                      src={testimonial.thumbnail}
                      alt="Client testimonial"
                      className="w-full h-full rounded-full object-cover border-4 border-white/20 group-hover:border-brand-mountain-meadow/50 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-brand-black/30 rounded-full group-hover:bg-brand-black/10 transition-colors duration-300"></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        {hoveredVideo === index ? (
                          <Pause className="h-3 w-3 text-brand-black" fill="currentColor" />
                        ) : (
                          <Play className="h-3 w-3 text-brand-black ml-0.5" fill="currentColor" />
                        )}
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.blockquote 
                className="font-playfair text-2xl md:text-3xl font-medium mb-6 leading-relaxed"
                whileHover={{ scale: 1.02 }}
              >
                "{testimonial.quote}"
              </motion.blockquote>
              
              <motion.cite 
                className="font-inter text-sm uppercase tracking-wider text-gray-400"
                whileHover={{ color: "#15cea0" }}
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
