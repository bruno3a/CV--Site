import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    title: "AI Assisted Chatbot (RAG)",
    description: "Implemented a Retrieval-Augmented Generation chatbot using LangChain and enterprise documentation, improving response accuracy by 85% and reducing support tickets by 40%",
    image: `${process.env.PUBLIC_URL}/projects/ai-chatbot.jpg`,
    tags: ["LLMs", "RAG", "Python", "Azure", "Vector DB", "LangChain"],
  },
  {
    title: "ERP Discovery & Implementation",
    description: "Led the discovery phase and implementation of an enterprise-wide ERP system, coordinating with stakeholders across 5 departments and managing integration with legacy systems",
    image: `${process.env.PUBLIC_URL}/projects/erp-system.jpg`,
    tags: ["Business Analysis", "Process Optimization", "Change Management", "ERP", "Integration"],
  },
  {
    title: "CPQ Implementation",
    description: "Managed the implementation of a Configure-Price-Quote solution across 5 countries in Central America, resulting in a 60% reduction in quote generation time and 30% increase in sales accuracy",
    image: `${process.env.PUBLIC_URL}/projects/cpq-system.jpg`,
    tags: ["CPQ", "Sales Operations", "Multi-country", "Process Design", "Training"],
  },
  {
    title: "API Catalog Management",
    description: "Developed and maintained an enterprise API catalog system, implementing governance policies and improving API discovery and reusability across the organization",
    image: `${process.env.PUBLIC_URL}/projects/api-catalog.jpg`,
    tags: ["API Management", "Documentation", "Governance", "Azure", "Developer Experience"],
  },
  {
    title: "Personal CV Webpage",
    description: "Designed and developed a responsive personal portfolio website using React and Tailwind CSS, featuring multi-language support and interactive components",
    image: `${process.env.PUBLIC_URL}/projects/portfolio-site.jpg`,
    tags: ["React", "Tailwind CSS", "Frontend", "UI/UX", "Personal Branding"],
  },
  {
    title: "eCommerce Integration Platform",
    description: "Currently developing an eCommerce solution with integrated billing system and Mercado Libre marketplace connectivity, focusing on automated inventory and order management",
    image: `${process.env.PUBLIC_URL}/projects/ecommerce-integration.jpg`,
    tags: ["eCommerce", "API Integration", "Marketplace", "In Progress", "System Design"],
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

