import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

const teamMembers = [
  {
    name: "Tanya Srivasatava",
    role: "Founder and creative head",
    image: "/assests/Team/tanya g.jpg",
    bio: "10+ years crafting luxury brand experiences with a passion for haute couture aesthetics"
  },
  {
    name: "Abhay Mehta", 
    role: "Developer",
    image: "/assests/Team/abhay.jpg",
    bio: "Expert in digital transformation and brand positioning with Fortune 500 experience"
  },
  {
    name: "Sneha Mishra",
    role: "Content marketer",
    image: "/assests/Team/sneha.jpg",
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

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-brand-cod-gray via-brand-black to-brand-cod-gray relative overflow-hidden">
      {/* Animated background gradient */}
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
        <animated.div style={springProps}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="font-playfair text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-brand-mountain-meadow to-white bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Meet Our Team
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              <motion.p 
                variants={itemVariants}
                className="font-inter text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                <motion.span
                  className="text-brand-mountain-meadow font-semibold"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  We're not a team.
                </motion.span>{" "}
                We're a brewing crew — obsessed with turning stories into soul-stirring brands.
              </motion.p>
              <motion.p 
                variants={itemVariants}
                className="font-inter text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Each of us brings a different flavor —{" "}
                <motion.span
                  className="text-brand-gossamer font-semibold"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  strategy, storytelling, design, or chaos
                </motion.span>{" "}
                — but together, we make content that feels like you.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group relative"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="relative mb-6 mx-auto w-64 h-64"
                  whileHover={{ scale: 1.05, rotateY: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-mountain-meadow/20 to-brand-gossamer/20 blur-xl group-hover:blur-2xl transition-all duration-500"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-4 border-brand-mountain-meadow/30 group-hover:border-brand-gossamer transition-all duration-500 shadow-2xl relative z-10"
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-t from-brand-mountain-meadow/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>
                
                <motion.h3 
                  className="font-playfair text-2xl font-semibold text-white mb-2 group-hover:text-brand-mountain-meadow transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {member.name}
                </motion.h3>
                
                <motion.p 
                  className="font-inter text-brand-mountain-meadow uppercase tracking-wider text-sm mb-4 font-semibold"
                  whileHover={{ x: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {member.role}
                </motion.p>
                
                <motion.p 
                  className="font-inter text-gray-300 text-sm leading-relaxed max-w-xs mx-auto"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {member.bio}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-mountain-meadow/20 via-brand-gossamer/20 to-brand-mountain-meadow/20"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              
              <div className="relative bg-gradient-to-br from-brand-black/80 to-brand-cod-gray/80 rounded-2xl p-12 border border-brand-mountain-meadow/20 backdrop-blur-sm">
                <motion.h3 
                  className="font-playfair text-4xl font-bold text-white mb-6 bg-gradient-to-r from-white via-brand-mountain-meadow to-white bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Our Mission
                </motion.h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="space-y-4"
                >
                  <motion.p 
                    variants={itemVariants}
                    className="font-inter text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
                  >
                    <motion.span
                      className="text-brand-mountain-meadow font-semibold"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      To transform how people experience brands
                    </motion.span>{" "}
                    — not just see them.
                  </motion.p>
                  <motion.p 
                    variants={itemVariants}
                    className="font-inter text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
                  >
                    At Content Brewer, we mix{" "}
                    <motion.span
                      className="text-brand-gossamer font-semibold"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      strategy with soul
                    </motion.span>{" "}
                    to build brands that don't just grow — they connect, resonate, and leave a lasting impact.
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </animated.div>
      </div>
    </section>
  );
};

export default TeamSection;
