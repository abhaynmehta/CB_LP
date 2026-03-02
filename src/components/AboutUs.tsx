import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

const skills = [
  "Social Media Management",
  "Content Strategy & Direction",
  "Brand Identity & Management",
  "Video Editing & Production",
  "Frontend Development",
  "IT Problem Solving",
  "React & Python",
  "Analytics & Tracking",
  "Snapchat Lenses",
  "B2B Aditya Birla",
  "International Clients (Dubai, China)"
];

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const springProps = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0px)' : 'translateY(50px)',
    config: { tension: 280, friction: 60 }
  });

  return (
    <section id="about" ref={ref} className="py-24 bg-brand-black relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-mountain-meadow/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <animated.div style={springProps}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                Beyond the <span className="text-brand-mountain-meadow mt-2 block">Code.</span>
              </h2>

              <div className="space-y-6 font-inter text-lg text-gray-400 leading-relaxed">
                <p>
                  I'm Abhay, a Digital Marketer and Brand Manager with 4 years of experience crafting high impact digital narratives. I don't just run campaigns I engineer brand ecosystems.
                </p>
                <p>
                  As an AdTech Professional and Digital Marketer, I've managed 15+ major client accounts and partnered with over 40+ clients globally ranging from individual creators to full time leading businesses like Dohful and IONA.AI. Having produced over 400+ content pieces that generated 750M+ views, I've proven that the intersection of data and creativity drives massive growth. With a strong foundation in IT and coding, I seamlessly blend analytical thinking and modern technical tools with creative content direction to build strategies that truly perform.
                </p>
                <p>
                  Whether it's creating viral Snapchat lenses, managing the Lets Confront podcast, or executing full scale brand identity revamps, my diverse toolkit allows me to architect intelligent, data backed digital experiences that genuinely convert.
                </p>
              </div>
            </motion.div>

            {/* Skills & Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-brand-cod-gray/50 backdrop-blur-xl border border-brand-mountain-meadow/20 p-8 rounded-3xl">
                <h3 className="font-playfair text-2xl text-white mb-6 border-b border-gray-800 pb-4">Core Arsenal</h3>

                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                      className="px-4 py-2 bg-brand-mountain-meadow/10 text-brand-mountain-meadow border border-brand-mountain-meadow/20 rounded-full font-inter text-sm hover:bg-brand-mountain-meadow hover:text-brand-black transition-colors duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-12 grid grid-cols-2 gap-8">
                  <div>
                    <div className="font-playfair text-4xl text-white font-bold mb-2">4+</div>
                    <div className="font-inter text-gray-400 text-sm uppercase tracking-wider">Years Experience</div>
                  </div>
                  <div>
                    <div className="font-playfair text-4xl text-white font-bold mb-2">750M+</div>
                    <div className="font-inter text-gray-400 text-sm uppercase tracking-wider">Views Generated</div>
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-brand-mountain-meadow/20 blur-[100px] -z-10 rounded-full" />
            </motion.div>

          </div>
        </animated.div>
      </div>
    </section>
  );
};

export default AboutUs;
