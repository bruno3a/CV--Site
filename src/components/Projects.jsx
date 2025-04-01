import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: t('projects.items.ai_chatbot.title'),
      description: t('projects.items.ai_chatbot.description'),
      image: `${process.env.PUBLIC_URL}/projects/ai-chatbot.jpg`,
      tags: ["LLMs", "RAG", "Python", "Azure", "Vector DB", "LangChain"],
    },
    {
      title: t('projects.items.erp_implementation.title'),
      description: t('projects.items.erp_implementation.description'),
      image: `${process.env.PUBLIC_URL}/projects/erp-system.jpg`,
      tags: ["Business Analysis", "Process Optimization", "Change Management", "ERP", "Integration"],
    },
    {
      title: t('projects.items.cpq_implementation.title'),
      description: t('projects.items.cpq_implementation.description'),
      image: `${process.env.PUBLIC_URL}/projects/cpq-system.jpg`,
      tags: ["CPQ", "Sales Operations", "Multi-country", "Process Design", "Training"],
    },
    {
      title: t('projects.items.api_catalog.title'),
      description: t('projects.items.api_catalog.description'),
      image: `${process.env.PUBLIC_URL}/projects/api-catalog.jpg`,
      tags: ["API Management", "Documentation", "Governance", "Azure", "Developer Experience"],
    },
    {
      title: t('projects.items.portfolio.title'),
      description: t('projects.items.portfolio.description'),
      image: `${process.env.PUBLIC_URL}/projects/portfolio-site.jpg`,
      tags: ["React", "Tailwind CSS", "Frontend", "UI/UX", "Personal Branding"],
    },
    {
      title: t('projects.items.ecommerce.title'),
      description: t('projects.items.ecommerce.description'),
      image: `${process.env.PUBLIC_URL}/projects/ecommerce-integration.jpg`,
      tags: ["eCommerce", "API Integration", "Marketplace", "In Progress", "System Design"],
    },
  ];

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{t('sections.projects.title')}</h2>
        
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

