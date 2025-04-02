import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const WorldMap = () => {
  const { t } = useLanguage();
  const workExperience = [
    {
      country: "Chile",
      projects: 1,
      description: "RAG Implementation on chatbot",
      flagUrl: "https://flagcdn.com/cl.svg"
    },
    {
      country: "Guatemala",
      projects: 1,
      description: "CRM Implementation",
      flagUrl: "https://flagcdn.com/gt.svg"
    },
    {
      country: "Panamá",
      projects: 1,
      description: "CRM Implementation",
      flagUrl: "https://flagcdn.com/pa.svg"
    },
    {
      country: "México",
      projects: 1,
      description: "Stakeholder Management",
      flagUrl: "https://flagcdn.com/mx.svg"
    },
    {
      country: "Honduras",
      projects: 1,
      description: "CRM Implementation",
      flagUrl: "https://flagcdn.com/hn.svg"
    },
    {
      country: "El Salvador",
      projects: 1,
      description: "CRM Implementation",
      flagUrl: "https://flagcdn.com/sv.svg"
    },
    {
      country: "Nicaragua",
      projects: 1,
      description: "CRM Implementation",
      flagUrl: "https://flagcdn.com/ni.svg"
    },
    {
      country: "Costa Rica",
      projects: 1,
      description: "Cloud services",
      flagUrl: "https://flagcdn.com/cr.svg"
    },
    {
      country: "United States",
      projects: 5, // Actualizado de 20 a 5
      description: "RAG Implementation on chatbot | Stakeholder Management",
      flagUrl: "https://flagcdn.com/us.svg"
    },
    {
      country: "España",
      projects: 2,
      description: "IT outsourcing - collaboration",
      flagUrl: "https://flagcdn.com/es.svg"
    },
    {
      country: "United Kingdom",
      projects: 1,
      description: "IT outsourcing - collaboration | Stakeholder Management",
      flagUrl: "https://flagcdn.com/gb.svg"
    },
    {
      country: "India",
      projects: 3,
      description: "IT outsourcing | Stakeholder Management",
      flagUrl: "https://flagcdn.com/in.svg"
    },
    {
      country: "Ukraine",
      projects: 3,
      description: "IT outsourcing",
      flagUrl: "https://flagcdn.com/ua.svg"
    },
    {
      country: "Argentina",
      projects: 1,
      description: "ERP Implementation",
      flagUrl: "https://flagcdn.com/ar.svg"
    },
    {
      country: "Brazil",
      projects: 1,
      description: "RAG Implementation on chatbot",
      flagUrl: "https://flagcdn.com/br.svg"
    }
  ];

  return (
    <section id="worldmap" className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-center mb-10">{t('sections.worldmap.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto px-4">
        {workExperience.map((experience, index) => (
          <motion.div
            key={experience.country}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background-light rounded-lg p-4 hover:bg-background-dark transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <img 
                src={experience.flagUrl}
                alt={`${experience.country} flag`}
                className="w-8 h-6 object-cover rounded shadow-sm"
                loading="lazy"
              />
              <span className="text-primary font-bold">
                {experience.projects}
                <span className="text-sm ml-1">projects</span>
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">{experience.country}</h3>
            <p className="text-gray-400 text-sm">{experience.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WorldMap;






