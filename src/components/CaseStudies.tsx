
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowLeft, Calendar, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CaseStudy {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  screens: number;
  image: string;
  tags: string[];
  problemStatement: string;
  solution: string[];
  myRole: string[];
  toolsUsed: string[];
  designProcess: {
    phase: string;
    description: string;
    icon: string;
  }[];
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Online Rental App",
    subtitle: "UX CASE STUDY",
    category: "Mobile App Design",
    duration: "14 Weeks",
    screens: 35,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["UX Research", "UI Design", "Prototyping", "User Testing"],
    problemStatement: "Fair Rental is a platform where you can rent furniture, appliances & electronics at an affordable price. The existing platform was outdated and user experience needed improvement to increase user engagement and conversion rates.",
    solution: [
      "Created a modern design for the furniture, appliances & electronics rental platform",
      "Improved user experience and interface design",
      "Can easily discover the marketplace from our app flow",
      "Can apply filters for various categories",
      "Easy checkout & maintenance"
    ],
    myRole: [
      "User research",
      "Wireframing", 
      "Competitor analysis",
      "Information architecture",
      "Usability testing"
    ],
    toolsUsed: ["Figma", "Adobe XD", "Miro", "Notion", "Google Sheets"],
    designProcess: [
      { phase: "Empathize", description: "User Research, Interviews", icon: "🔍" },
      { phase: "Define", description: "Problem Definition, Personas", icon: "🎯" },
      { phase: "Ideate", description: "Card Sorting, Information Architecture", icon: "💡" },
      { phase: "Design", description: "Wireframes, Logo Testing", icon: "🎨" },
      { phase: "Test", description: "Usability Testing, Implementation Feedback", icon: "✅" }
    ]
  },
  {
    id: 2,
    title: "E-commerce Platform",
    subtitle: "DESIGN SYSTEM",
    category: "Web Application",
    duration: "8 Weeks", 
    screens: 28,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    tags: ["Design System", "Component Library", "E-commerce", "Responsive Design"],
    problemStatement: "A growing e-commerce company needed a comprehensive design system to ensure consistency across all digital touchpoints and improve development efficiency.",
    solution: [
      "Developed a comprehensive design system with reusable components",
      "Created detailed component documentation",
      "Established design tokens for colors, typography, and spacing",
      "Built responsive component library",
      "Implemented accessibility guidelines"
    ],
    myRole: [
      "Design system architect",
      "Component design",
      "Documentation",
      "Developer collaboration",
      "Quality assurance"
    ],
    toolsUsed: ["Figma", "Storybook", "React", "TypeScript", "Sketch"],
    designProcess: [
      { phase: "Audit", description: "Component Inventory, Gap Analysis", icon: "📊" },
      { phase: "Strategy", description: "Design Principles, Token System", icon: "🎯" },
      { phase: "Design", description: "Component Creation, Documentation", icon: "🎨" },
      { phase: "Build", description: "Code Implementation, Testing", icon: "⚙️" },
      { phase: "Scale", description: "Adoption, Maintenance", icon: "📈" }
    ]
  }
];

const CaseStudies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const openStudy = (study: CaseStudy) => {
    setSelectedStudy(study);
  };

  const closeStudy = () => {
    setSelectedStudy(null);
  };

  return (
    <>
      <section ref={ref} className="py-20 bg-gradient-to-br from-brand-black via-brand-cod-gray to-brand-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #15cea0 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #15cea0 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 30px 30px',
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Case Studies
            </motion.h2>
            <motion.p
              className="text-gray-300 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Dive deep into our design process and see how we solve complex problems
            </motion.p>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-brand-mountain-meadow to-brand-gossamer mx-auto mt-6"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="cursor-pointer"
                onClick={() => openStudy(study)}
              >
                <Card className="bg-gradient-to-br from-brand-mountain-meadow/10 via-brand-gossamer/5 to-brand-mountain-meadow/5 backdrop-blur-sm border-brand-mountain-meadow/20 hover:border-brand-mountain-meadow/40 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-brand-mountain-meadow text-sm font-medium bg-brand-black/50 px-2 py-1 rounded">
                        {study.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="font-playfair text-2xl text-white mb-1">
                          {study.title}
                        </CardTitle>
                        <p className="text-brand-mountain-meadow font-medium">
                          {study.subtitle}
                        </p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-brand-mountain-meadow" />
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {study.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{study.screens}+ Screens</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="text-xs bg-brand-mountain-meadow/20 text-brand-mountain-meadow px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {study.tags.length > 3 && (
                        <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded-full">
                          +{study.tags.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {study.problemStatement}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {selectedStudy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-brand-black/95 backdrop-blur-sm overflow-y-auto"
        >
          <div className="min-h-screen py-8">
            <div className="container mx-auto px-6 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <Button
                    onClick={closeStudy}
                    variant="outline"
                    className="bg-brand-mountain-meadow/20 border-brand-mountain-meadow/40 hover:bg-brand-mountain-meadow/30 text-white"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Case Studies
                  </Button>
                  
                  <div className="text-center">
                    <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">
                      {selectedStudy.title}
                    </h1>
                    <p className="text-brand-mountain-meadow text-lg font-medium">
                      {selectedStudy.subtitle}
                    </p>
                  </div>
                  
                  <div className="w-32" /> {/* Spacer for centering */}
                </div>

                {/* Hero Image */}
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-12">
                  <img 
                    src={selectedStudy.image} 
                    alt={selectedStudy.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 to-transparent" />
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <Card className="bg-brand-cod-gray/50 border-brand-mountain-meadow/20">
                    <CardHeader>
                      <CardTitle className="text-brand-mountain-meadow text-lg">Project Duration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white text-2xl font-bold">{selectedStudy.duration}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-brand-cod-gray/50 border-brand-mountain-meadow/20">
                    <CardHeader>
                      <CardTitle className="text-brand-mountain-meadow text-lg">Screens</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white text-2xl font-bold">{selectedStudy.screens}+</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-brand-cod-gray/50 border-brand-mountain-meadow/20">
                    <CardHeader>
                      <CardTitle className="text-brand-mountain-meadow text-lg">Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white text-lg">{selectedStudy.category}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Content Sections */}
                <div className="space-y-12">
                  {/* Problem Statement */}
                  <section>
                    <h2 className="font-playfair text-2xl font-bold text-white mb-4">Problem Statement</h2>
                    <p className="text-gray-300 leading-relaxed">{selectedStudy.problemStatement}</p>
                  </section>

                  {/* Solution */}
                  <section>
                    <h2 className="font-playfair text-2xl font-bold text-white mb-4">The Solution</h2>
                    <ul className="space-y-2">
                      {selectedStudy.solution.map((item, index) => (
                        <li key={index} className="text-gray-300 flex items-start">
                          <span className="text-brand-mountain-meadow mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* My Role & Tools */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section>
                      <h2 className="font-playfair text-2xl font-bold text-white mb-4">My Role</h2>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedStudy.myRole.map((role, index) => (
                          <span 
                            key={index}
                            className="text-sm bg-brand-mountain-meadow/20 text-brand-mountain-meadow px-3 py-2 rounded text-center"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h2 className="font-playfair text-2xl font-bold text-white mb-4">Tools Used</h2>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudy.toolsUsed.map((tool, index) => (
                          <span 
                            key={index}
                            className="text-sm bg-brand-gossamer/20 text-white px-3 py-2 rounded border border-brand-gossamer/30"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>

                  {/* Design Process */}
                  <section>
                    <h2 className="font-playfair text-2xl font-bold text-white mb-6">Design Process</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {selectedStudy.designProcess.map((phase, index) => (
                        <div key={index} className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-brand-mountain-meadow/20 to-brand-gossamer/20 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto border border-brand-mountain-meadow/30">
                            {phase.icon}
                          </div>
                          <h3 className="font-semibold text-brand-mountain-meadow mb-2">{phase.phase}</h3>
                          <p className="text-sm text-gray-400">{phase.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CaseStudies;
