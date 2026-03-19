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
      image: `${process.env.PUBLIC_URL}/projects/personal-site.jpg`,
      tags: ["React", "Tailwind CSS", "Frontend", "UI/UX", "Personal Branding"],
    },
    {
      title: t('projects.items.ecommerce.title'),
      description: t('projects.items.ecommerce.description'),
      image: `${process.env.PUBLIC_URL}/projects/ecommerce-integration.jpg`,
      tags: t('projects.items.ecommerce.tags', { returnObjects: true }),
      link: "https://crwork.neurasur.com/",
      linkText: t('projects.view_demo')
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
              className="card group cursor-pointer"
              whileHover={{ y: -5 }}
            >
              {/* Imagen con botón flotante */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Botón flotante sobre la imagen */}
                {project.link && (
                  <div className="absolute bottom-3 left-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm shadow-lg hover:shadow-xl border border-primary/20 hover:border-primary/40 group/btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="relative z-10">{project.linkText}</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out rounded-lg"></div>
                    </a>
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="space-y-2 md:space-y-4">
                <h3 className="text-lg md:text-xl font-bold text-primary">{project.title}</h3>
                <p className="text-sm md:text-base text-gray-400">{project.description}</p>
                
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;

