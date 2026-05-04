import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "./ui/dialog";
import caseStudies from "@/data/caseStudiesData";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Splits a details string into sections for modal rendering.
 * @param {string} details - The full details string.
 * @returns {Array<{heading: string, content: string}>}
 */
function parseSections(details) {
  const rawSections = details.split(/\n{2,}/);
  return rawSections.map((block) => {
    const headingMatch = block.match(
      /^([\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}]|[#*\w\d\s]+:|[A-Z][^\n:]+)$/u,
    );
    if (headingMatch) return { heading: block.trim(), content: "" };
    const lines = block.split("\n");
    if (
      lines.length > 1 &&
      /[A-Za-z0-9 ]{3,}/.test(lines[0]) &&
      lines[0].length < 60
    ) {
      return {
        heading: lines[0].trim(),
        content: lines.slice(1).join("\n").trim(),
      };
    }
    return { heading: "", content: block.trim() };
  });
}

/**
 * Renders markdown-style images as <img> tags, preserving text and line breaks.
 * @param {string} content - Section content string.
 */
function renderContentWithImages(content) {
  if (!content) return null;
  const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0,
    match,
    key = 0;
  while ((match = imgRegex.exec(content)) !== null) {
    if (match.index > lastIndex)
      parts.push(content.slice(lastIndex, match.index));
    parts.push(
      <div key={`img-${key++}`} className="my-4 flex justify-center">
        <img
          src={match[2]}
          alt={match[1]}
          loading="lazy"
          className="rounded-xl shadow-md border border-brand-gossamer max-h-96 mx-auto"
          style={{ background: "#181818" }}
        />
      </div>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) parts.push(content.slice(lastIndex));
  return parts.map((part, i) =>
    typeof part === "string"
      ? part.split(/\n/).map((line, j) => (
          <span key={`txt-${i}-${j}`}>
            {line}
            {j < part.split(/\n/).length - 1 ? <br /> : null}
          </span>
        ))
      : part,
  );
}

/**
 * Animation variants and transitions for modal, cards, and sections
 */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: "easeIn" } },
};

const modalContentVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 28, mass: 0.7 },
  },
  exit: { opacity: 0, y: 20, scale: 0.97, transition: { duration: 0.18 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 180, damping: 22 },
  }),
};

const cardGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.09,
      type: "spring",
      stiffness: 220,
      damping: 18,
    },
  }),
};

/**
 * Card for a single case study preview in the grid.
 * Adds 3D tilt and shadow pop on hover (parallax effect).
 */
const CaseStudyCard = ({ cs, i, onClick }) => {
  const cardRef = useRef(null);
  // Parallax tilt effect on hover
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * -7;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.045)`;
    card.style.boxShadow =
      "0 8px 32px 0 rgba(21,206,160,0.13), 0 1.5px 8px 0 rgba(0,0,0,0.18)";
  };
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
    card.style.boxShadow = "";
  };
  return (
    <motion.div
      ref={cardRef}
      className="group bg-gradient-to-br from-brand-cod-gray to-brand-black rounded-2xl shadow-lg overflow-hidden cursor-pointer relative hover:shadow-2xl transition-all duration-300"
      custom={i}
      variants={cardVariants}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="button"
      aria-label={`Open case study: ${cs.title}`}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={cs.image}
          alt={cs.title}
          className={`w-full h-full object-cover ${
            cs.isFullPage
              ? "object-top transition-[object-position] duration-[8000ms] ease-linear group-hover:object-bottom"
              : "transition-transform duration-500 group-hover:scale-105"
          }`}
        />
        <div className="absolute top-4 left-4 bg-brand-mountain-meadow text-brand-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Featured
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-playfair text-xl font-semibold mb-1 group-hover:text-brand-mountain-meadow transition-colors duration-300">
          {cs.title}
        </h3>
        <p className="font-inter text-brand-mountain-meadow text-xs uppercase mb-2 font-semibold">
          {cs.subtitle}
        </p>
        <p className="font-inter text-gray-300 text-sm mb-2">{cs.summary}</p>
        <span className="inline-block mt-2 text-brand-gossamer font-bold text-xs group-hover:underline">
          Read Case Study →
        </span>
      </div>
      <motion.div
        className="absolute inset-0 border-2 border-transparent group-hover:border-brand-mountain-meadow/60 rounded-2xl pointer-events-none"
        whileHover={{ borderColor: "rgba(21, 206, 160, 0.8)" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

/**
 * Modal content for a case study, with sectioned layout and image support.
 * Animates each section in with a staggered fade/slide effect and heading pulse.
 */
const CaseStudyModalContent = ({ selected }) => {
  if (!selected) return null;
  const sections = parseSections(selected.details);

  /**
   * Opens the Calendly booking link in a new tab.
   * Uses the same logic as BookCall for consistency.
   */
  const openCalendly = () => {
    const calendlyUrl = "https://calendly.com/contentbrewer001/new-meeting";
    window.open(calendlyUrl, "_blank");
  };

  return (
    <motion.div
      className="p-4 sm:p-6 md:p-8"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalContentVariants}
    >
      <motion.h2
        className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-mountain-meadow mb-2 tracking-tight leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {selected.title}
      </motion.h2>
      <motion.div
        className="font-inter text-sm sm:text-base md:text-lg text-brand-gossamer mb-4 uppercase tracking-widest font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {selected.subtitle}
      </motion.div>
      {selected.summary && (
        <motion.div
          className="font-inter text-base sm:text-lg text-gray-200 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
        >
          {selected.summary}
        </motion.div>
      )}

      {/* Video Section */}
      {selected.videos && selected.videos.length > 0 && (
        <motion.div
          className="mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="font-playfair text-xl sm:text-2xl text-brand-mountain-meadow mb-4">
            Featured Videos
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {selected.videos.map((video, index) => {
              return (
                <div key={index} className="space-y-2">
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.label}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <p className="text-brand-gossamer text-sm font-medium">
                    {video.label}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      <motion.div
        className="space-y-6 sm:space-y-10"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={cardGridVariants}
      >
        <AnimatePresence>
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
            >
              {section.heading && (
                <motion.h4
                  className="font-playfair text-xl sm:text-2xl text-brand-mountain-meadow mb-3 border-t border-brand-mountain-meadow/30 pt-4 sm:pt-6 first:mt-0 cursor-pointer transition-colors duration-200 relative"
                  whileHover={{
                    scale: 1.045,
                    color: "#15CEA0",
                    textShadow: "0 0 8px #15cea0cc",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  <span className="inline-block border-b-2 border-transparent group-hover:border-brand-gossamer transition-all duration-200">
                    {section.heading}
                  </span>
                </motion.h4>
              )}
              {section.content && (
                <div
                  className="font-inter text-sm sm:text-base text-gray-200 whitespace-pre-line mb-2"
                  style={{ lineHeight: "1.7" }}
                >
                  {renderContentWithImages(section.content)}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {/* CTA Section: Book a Discovery Call */}
      <motion.div
        className="mt-8 sm:mt-12 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          size="lg"
          onClick={openCalendly}
          className="bg-brand-mountain-meadow text-brand-black hover:bg-brand-gossamer font-inter font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 group shadow-lg rounded-xl w-full sm:w-auto"
        >
          <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          BOOK A DISCOVERY CALL
          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
        <span className="font-inter text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4 text-center">
          30-minute strategy session • No commitment required
        </span>
      </motion.div>
    </motion.div>
  );
};

/**
 * Main CaseStudies section with animated grid and modal.
 * Includes animated overlay and modal transitions for immersive UX.
 */
const CaseStudies = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-brand-black via-brand-cod-gray to-brand-black text-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(21, 206, 160, 0.08) 0%, transparent 60%)",
            "radial-gradient(circle at 80% 20%, rgba(12, 154, 119, 0.08) 0%, transparent 60%)",
            "radial-gradient(circle at 40% 40%, rgba(21, 206, 160, 0.08) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            className="font-playfair text-3xl sm:text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-brand-mountain-meadow to-white bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            Case Studies
          </motion.h2>
          <motion.p
            className="font-inter text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore how we solve real-world problems and create impact for our
            clients.
          </motion.p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
          variants={cardGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {caseStudies.map((cs, i) => (
            <CaseStudyCard
              key={cs.id}
              cs={cs}
              i={i}
              onClick={() => {
                setSelected(cs);
                setOpen(true);
              }}
            />
          ))}
        </motion.div>
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              onClick={() => setOpen(false)}
            />
          )}
        </AnimatePresence>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl w-full bg-gradient-to-br from-brand-black via-brand-cod-gray to-brand-black text-white rounded-2xl shadow-2xl p-0 overflow-hidden">
            <AnimatePresence>
              {selected && (
                <motion.div
                  className="flex flex-col h-[90vh] max-h-[90vh]"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={modalContentVariants}
                >
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <CaseStudyModalContent selected={selected} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default CaseStudies;
