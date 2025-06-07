import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Palette, 
  Code, 
  BarChart2, 
  Share2, 
  Camera, 
  Search, 
  ShoppingCart, 
  Lightbulb 
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
    title: "Brand Strategy",
    subtitle: "& Identity",
    description: "Strategic brand asset identity and creation with comprehensive market research and positioning",
    icon: Palette,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "App/Web",
    subtitle: "Development", 
    description: "Custom web and mobile applications with modern tech stack and responsive design",
    icon: Code,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Content-Driven",
    subtitle: "Marketing", 
    description: "Metrics-driven plan to strategic full strategy with data analytics and optimization",
    icon: BarChart2,
    color: "from-green-500 to-emerald-400"
  },
  {
    title: "Social Media",
    subtitle: "Campaign Direction",
    description: "Provide and set launch across channels with influencer partnerships and engagement",
    icon: Share2,
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Content Production",
    subtitle: "& Creative Shoots",
    description: "Prioritize content unique to style with professional photography and videography",
    icon: Camera,
    color: "from-yellow-500 to-orange-400"
  },
  {
    title: "SEO & Analytics",
    subtitle: "Optimization",
    description: "Search engine optimization and comprehensive analytics tracking for maximum visibility",
    icon: Search,
    color: "from-indigo-500 to-purple-400"
  },
  {
    title: "E-commerce",
    subtitle: "Solutions",
    description: "Complete e-commerce platform development with payment integration and inventory management",
    icon: ShoppingCart,
    color: "from-pink-500 to-rose-400"
  },
  {
    title: "Consulting",
    subtitle: "& Strategy",
    description: "Expert business consulting and strategic planning for digital transformation and growth",
    icon: Lightbulb,
    color: "from-cyan-500 to-blue-400"
  }
];

/**
 * ServiceCard component displays individual service details with interactive animations.
 * @param {object} props - Component props.
 * @param {Service} props.service - The service data to display.
 * @param {number} props.index - The index of the service in the array, used for animation delays.
 */
const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full min-w-[250px] sm:min-w-[300px] max-w-[350px] flex-shrink-0 snap-center"
    >
      <div className="relative rounded-2xl overflow-hidden group h-full">
        {/* Decorative background gradient on hover */}
        <div className="absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-brand-mountain-meadow/40 before:via-brand-gossamer/30 before:to-brand-mountain-meadow/40 before:opacity-60 group-hover:before:opacity-90 before:transition-all before:duration-500" />
        <Card className="relative z-10 h-full bg-white/10 backdrop-blur-xl border-none shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:ring-2 group-hover:ring-brand-mountain-meadow/40">
          <CardHeader className="text-center pb-4">
            {/* Service icon with animation */}
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-mountain-meadow/20 to-brand-gossamer/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
              >
                <Icon className="w-8 h-8 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-mountain-meadow group-hover:to-brand-gossamer transition-all duration-500" />
              </motion.div>
            </div>
            {/* Service title and subtitle with animations */}
            <CardTitle className="font-playfair text-2xl text-white mb-2 drop-shadow-lg">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-mountain-meadow group-hover:to-brand-gossamer transition-all duration-500"
              >
                {service.title}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="text-brand-mountain-meadow group-hover:text-brand-gossamer transition-colors duration-500"
              >
                {service.subtitle}
              </motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Service description with animation */}
            <motion.p 
              className="text-gray-200 leading-relaxed font-inter group-hover:text-white transition-colors duration-500 text-base drop-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 + 0.7 }}
            >
              {service.description}
            </motion.p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

/**
 * EnhancedServices component displays a scrollable carousel of services with advanced animations and responsive design.
 */
const EnhancedServices = () => {
  const ref = useRef(null); // Ref for the main section to detect if it's in view
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable cards container
  const isInView = useInView(ref, { once: true }); // Detects if the section is in view for animations
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current visible card index
  const [isDragging, setIsDragging] = useState(false); // State to track if the carousel is being dragged
  const [startX, setStartX] = useState(0); // Starting X position for drag tracking
  const [scrollLeft, setScrollLeft] = useState(0); // Initial scroll left position for drag tracking
  const [cardsPerView, setCardsPerView] = useState(1); // Number of cards visible per slide, defaults to 1 for mobile first

  /**
   * Adjusts the number of cards visible per slide based on screen width.
   * This ensures optimal display on different devices (mobile, tablet, desktop).
   */
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3); // 3 cards for large screens (laptops, desktops)
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2); // 2 cards for medium screens (tablets)
      } else {
        setCardsPerView(1); // 1 card for small screens (mobile phones)
      }
    };

    updateCardsPerView(); // Initial call to set cards per view on mount
    window.addEventListener('resize', updateCardsPerView); // Listen for window resize events
    return () => window.removeEventListener('resize', updateCardsPerView); // Cleanup listener on unmount
  }, []);

  /**
   * Handles updating the current index when the scroll container's scroll position changes.
   * This ensures the progress indicators accurately reflect the currently viewed card.
   */
  useEffect(() => {
    const handleScrollEnd = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        // Get the width of a single card, assuming all cards have the same width and class
        const cardWidth = scrollContainerRef.current.querySelector('.flex-shrink-0')?.clientWidth || 0;
        const gap = 24; // Corresponds to Tailwind's gap-6 (1.5rem = 24px)
        // Calculate the new index based on scroll position and card width
        const newIndex = Math.round(scrollPosition / (cardWidth + gap));
        setCurrentIndex(newIndex);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Attach scroll event listener with passive: true for performance
      scrollContainer.addEventListener('scroll', handleScrollEnd, { passive: true });
    }

    return () => {
      // Clean up the event listener when the component unmounts or dependencies change
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScrollEnd);
      }
    };
  }, [cardsPerView]); // Re-run effect if cardsPerView changes (e.g., on resize)

  /**
   * Handles mouse down event for drag-to-scroll functionality.
   * @param {React.MouseEvent} e - The mouse event object.
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true); // Set dragging state to true
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft); // Record initial X position
    setScrollLeft(scrollContainerRef.current.scrollLeft); // Record current scroll position
  };

  /**
   * Handles mouse up event to end dragging.
   */
  const handleMouseUp = () => {
    setIsDragging(false); // Set dragging state to false
  };

  /**
   * Handles mouse move event for drag-to-scroll functionality.
   * @param {React.MouseEvent} e - The mouse event object.
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return; // Only execute if dragging
    e.preventDefault(); // Prevent default browser drag behavior
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Calculate how far to scroll (increased sensitivity for smoother feel)
    scrollContainerRef.current.scrollLeft = scrollLeft - walk; // Apply scroll
  };

  /**
   * Handles touch start event for touch-drag-to-scroll functionality.
   * @param {React.TouchEvent} e - The touch event object.
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true); // Set dragging state to true
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft); // Record initial touch X position
    setScrollLeft(scrollContainerRef.current.scrollLeft); // Record current scroll position
  };

  /**
   * Handles touch move event for touch-drag-to-scroll functionality.
   * @param {React.TouchEvent} e - The touch event object.
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return; // Only execute if dragging
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Calculate how far to scroll (increased sensitivity)
    scrollContainerRef.current.scrollLeft = scrollLeft - walk; // Apply scroll
  };

  /**
   * Handles touch end event to end dragging.
   */
  const handleTouchEnd = () => {
    setIsDragging(false); // Set dragging state to false
  };

  /**
   * Scrolls the carousel to a specific card index.
   * @param {number} index - The target index to scroll to.
   */
  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.querySelector('.flex-shrink-0')?.clientWidth || 0;
    const gap = 24; // Corresponds to Tailwind's gap-6 (1.5rem = 24px)
    scrollContainerRef.current.scrollTo({
      left: index * (cardWidth + gap), // Calculate scroll position based on card width and gap
      behavior: 'smooth' // Smooth scrolling animation
    });
    setCurrentIndex(index); // Update current index state
  };

  /**
   * Scrolls to the next set of cards in the carousel.
   */
  const nextSlide = () => {
    // Calculate the next index, ensuring it doesn't exceed the bounds of the services array
    const nextIndex = Math.min(currentIndex + cardsPerView, services.length - cardsPerView);
    scrollToIndex(nextIndex);
  };

  /**
   * Scrolls to the previous set of cards in the carousel.
   */
  const prevSlide = () => {
    // Calculate the previous index, ensuring it doesn't go below 0
    const prevIndex = Math.max(0, currentIndex - cardsPerView);
    scrollToIndex(prevIndex);
  };

  // Calculate total pages for the progress indicators
  const totalPages = Math.ceil(services.length / cardsPerView);
  // Determine the current active page based on the current card index
  const currentPage = Math.floor(currentIndex / cardsPerView);

  return (
    <section ref={ref} className="py-20 bg-brand-cod-gray relative overflow-hidden">
      {/* Animated background gradient for visual depth */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-brand-mountain-meadow/5 via-transparent to-brand-gossamer/5"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(21, 206, 160, 0.05) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 255, 204, 0.05) 100%)',
            'linear-gradient(135deg, rgba(0, 255, 204, 0.05) 0%, rgba(0, 0, 0, 0) 50%, rgba(21, 206, 160, 0.05) 100%)',
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Animated particles for subtle background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-mountain-meadow/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 2 + 1,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading and subtitle with animations */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.8, rotateX: -15 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
          >
            What We Do
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Transforming ideas into exceptional digital experiences through innovative solutions and creative excellence
          </motion.p>
        </motion.div>

        {/* Carousel container with navigation buttons and scrollable cards */}
        <div className="relative flex items-center justify-center min-h-[400px]">
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-brand-mountain-meadow/15 text-brand-mountain-meadow shadow-lg hover:bg-brand-mountain-meadow/25 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
            disabled={currentIndex === 0}
            aria-label="Previous"
            type="button"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* Scrollable Cards Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory flex-1 px-8 py-4"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For IE/Edge
              cursor: isDragging ? 'grabbing' : 'grab' // Change cursor on drag
            }}
          >
            {services.map((service, index) => (
              <ServiceCard 
                key={index} // Using index as key is acceptable here as the list is static and not reordered
                service={service} 
                index={index} 
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-brand-mountain-meadow/15 text-brand-mountain-meadow shadow-lg hover:bg-brand-mountain-meadow/25 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none"
            disabled={currentIndex >= services.length - cardsPerView}
            aria-label="Next"
            type="button"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>

        {/* Progress indicators (dots) for carousel navigation */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index * cardsPerView)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentPage === index
                  ? 'bg-brand-mountain-meadow scale-125' // Active dot style
                  : 'bg-brand-mountain-meadow/30 hover:bg-brand-mountain-meadow/50' // Inactive dot style
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedServices;
