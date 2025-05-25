
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Creative Director & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "10+ years crafting luxury brand experiences with a passion for haute couture aesthetics"
  },
  {
    name: "Sarah Chen", 
    role: "Strategy Lead & Co-Founder",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Expert in digital transformation and brand positioning with Fortune 500 experience"
  },
  {
    name: "Marcus Rivera",
    role: "Tech Director & Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Full-stack architect building scalable solutions and cutting-edge web applications"
  }
];

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const springProps = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0px)' : 'translateY(50px)',
    config: { tension: 280, friction: 60 }
  });

  return (
    <section ref={ref} className="py-20 bg-brand-cod-gray">
      <div className="container mx-auto px-6">
        <animated.div style={springProps}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-8">
              Meet Our Team
            </h2>
            <p className="font-inter text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We are a passionate team of creatives, strategists, and technologists dedicated to 
              transforming brands into luxury experiences through innovative design and cutting-edge technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <motion.div 
                  className="relative mb-6 mx-auto w-56 h-56"
                  whileHover={{ scale: 1.1, rotateY: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-4 border-brand-mountain-meadow group-hover:border-brand-gossamer transition-colors duration-300 shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-brand-mountain-meadow/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </motion.div>
                
                <motion.h3 
                  className="font-playfair text-2xl font-semibold text-white mb-2 group-hover:text-brand-mountain-meadow transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {member.name}
                </motion.h3>
                
                <p className="font-inter text-brand-mountain-meadow uppercase tracking-wider text-sm mb-4 font-semibold">
                  {member.role}
                </p>
                
                <p className="font-inter text-gray-300 text-sm leading-relaxed max-w-xs mx-auto">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-brand-mountain-meadow/10 to-brand-gossamer/10 rounded-2xl p-8 border border-brand-mountain-meadow/20 backdrop-blur-sm">
              <h3 className="font-playfair text-3xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="font-inter text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                To elevate brands through innovative design, strategic thinking, and cutting-edge technology. 
                We believe every brand has the potential to become extraordinary.
              </p>
            </div>
          </motion.div>
        </animated.div>
      </div>
    </section>
  );
};

export default TeamSection;
