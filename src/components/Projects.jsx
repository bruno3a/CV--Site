import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    title: "Enterprise Analytics Dashboard",
    description: "A comprehensive analytics platform for enterprise-level data visualization and reporting",
    image: `${process.env.PUBLIC_URL}/projects/analytics-dashboard.jpg`,
    tags: ["Product Management", "Data Analytics", "UX Design"],
    link: "#",
  },
  {
    title: "Customer Journey Mapping Tool",
    description: "Interactive tool for mapping and analyzing customer experiences across touchpoints",
    image: `${process.env.PUBLIC_URL}/projects/journey-mapping.jpg`,
    tags: ["User Research", "Process Optimization", "Agile"],
    link: "#",
  },
  {
    title: "Agile Project Management System",
    description: "Custom-built system for managing agile projects and team collaboration",
    image: `${process.env.PUBLIC_URL}/projects/agile-system.jpg`,
    tags: ["Agile", "Team Leadership", "Process Design"],
    link: "#",
  },
  {
    title: "Market Intelligence Platform",
    description: "AI-powered platform for market trend analysis and competitor tracking",
    image: `${process.env.PUBLIC_URL}/projects/market-intelligence.jpg`,
    tags: ["Market Analysis", "Strategy", "Data Science"],
    link: "#",
  },
];

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card group relative overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Imagen del proyecto */}
              <div className="aspect-video overflow-hidden rounded-lg mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Contenido */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={project.link}
                  className="inline-block text-primary hover:text-primary-light transition-colors"
                >
                  Learn more →
                </a>
              </div>

              {/* Hover effect */}
              <div
                className={`absolute inset-0 border-2 border-primary/0 rounded-lg transition-all duration-300 ${
                  hoveredIndex === index ? 'border-primary/50' : ''
                }`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
