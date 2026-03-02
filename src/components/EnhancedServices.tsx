import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Lightbulb, // For Content Creation & Personal Branding (idea, creativity)
  Share2,    // For Social Media Management (sharing, social)
  Code,      // For Website & App Development (coding, web)
  Mic,       // For Podcast Production (microphone, audio)
  Brain,     // For Content Strategy & Consulting (strategy, thinking)
} from 'lucide-react';

/**
 * Defines the structure for each service offered.
 * @typedef {Object} Service
 * @property {string} title - The main title of the service.
 * @property {string} subtitle - The subtitle or secondary title of the service.
 * @property {string} description - A brief description of the service.
 * @property {React.ElementType} icon - The Lucide React icon component for the service.
 * @property {string} color - Tailwind CSS gradient classes for the service card.
 */
const services = [
  {
    title: "Brand Identity",
    subtitle: "& Strategy",
    description: "I build cohesive brand identities and storytelling formats that blend traditional appeal with modern digital presence for high retention engagement.",
    icon: Lightbulb,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Digital Marketing",
    subtitle: "& Social Media",
    description: "End to end execution of high engagement strategies across platforms. I leverage deep analytics and targeted content frameworks to drive explosive organic growth.",
    icon: Share2,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Content Creation",
    subtitle: "& Production",
    description: "From producing 400+ cross cultural videos to managing complete podcast operations, I craft compelling visual and auditory experiences from ideation to final cut.",
    icon: Mic,
    color: "from-green-500 to-emerald-400"
  },
  {
    title: "Frontend & IT",
    subtitle: "Integration",
    description: "Utilizing my coding knowledge and IT experience to blend digital marketing with functional web development and data analytics for powerful marketing pipelines.",
    icon: Code,
    color: "from-orange-500 to-red-500"
  }
];

/**
 * ServiceCard component displays individual service details with interactive animations.
 * @param {object} props - Component props.
 * @param {Service} props.service - The service data to display.
 * @param {number} props.index - The index of the service in the array, used for animation delays.
 */
const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const Icon = service.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full h-full"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-2xl group h-full cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-500"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Glow behind the card */}
        <div className={`absolute inset-0 z-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl`} />

        <Card
          className="relative z-10 h-full bg-white/5 backdrop-blur-xl border border-white/10 group-hover:bg-white/10 overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Subtle inside gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-mountain-meadow/5 via-transparent to-brand-gossamer/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <CardHeader className="text-center pb-4 pt-10" style={{ transform: "translateZ(40px)" }}>
            {/* Service icon with animation */}
            <div className="flex justify-center mb-6">
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-mountain-meadow/10 to-brand-gossamer/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_30px_rgba(21,206,160,0.3)] border border-brand-mountain-meadow/20"
                style={{ transform: "translateZ(60px)" }}
              >
                <Icon className="w-10 h-10 text-brand-mountain-meadow group-hover:text-white transition-all duration-500" />
              </motion.div>
            </div>
            {/* Service title and subtitle */}
            <CardTitle className="font-playfair text-2xl md:text-3xl text-white mb-2 drop-shadow-lg" style={{ transform: "translateZ(30px)" }}>
              <div className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-mountain-meadow transition-all duration-500">
                {service.title}
              </div>
              <div className="text-lg md:text-xl text-brand-mountain-meadow/80 group-hover:text-brand-gossamer mt-2 transition-colors duration-500 font-inter">
                {service.subtitle}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-10 px-6 text-center" style={{ transform: "translateZ(20px)" }}>
            <p className="text-gray-400 group-hover:text-gray-100 leading-relaxed font-inter transition-colors duration-500 text-base md:text-lg">
              {service.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

/**
 * EnhancedServices component displays services in a premium, responsive 2x2 grid layout.
 */
const EnhancedServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-24 bg-brand-black relative overflow-hidden text-white">
      {/* Re-use the premium Animated Background from Hero */}
      <AnimatedBackground />

      {/* Deep dark gradient overlay so it isn't too overpowering */}
      <div className="absolute inset-0 bg-brand-black/40 z-0 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section heading and subtitle with animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.8, rotateX: -15 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
          >
            My Expertise
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-brand-mountain-meadow mx-auto mb-8 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light"
          >
            Capabilities spanning the entire digital spectrum, designed for tangible impact.
          </motion.p>
        </motion.div>

        {/* Premium Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedServices;
