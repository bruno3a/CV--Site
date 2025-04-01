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
      flag: "🇨🇱"
    },
    {
      country: "Guatemala",
      projects: 1,
      description: "CRM Implementation",
      flag: "🇬🇹"
    },
    {
      country: "Panamá",
      projects: 1,
      description: "CRM Implementation",
      flag: "🇵🇦"
    },
    {
      country: "México",
      projects: 1,
      description: "Stakeholder Management",
      flag: "🇲🇽"
    },
    {
      country: "Honduras",
      projects: 1,
      description: "CRM Implementation",
      flag: "🇭🇳"
    },
    {
      country: "El Salvador",
      projects: 1,
      description: "CRM Implementation",
      flag: "🇸🇻"
    },
    {
      country: "Nicaragua",
      projects: 1,
      description: "CRM Implementation",
      flag: "🇳🇮"
    },
    {
      country: "Costa Rica",
      projects: 1,
      description: "Cloud services",
      flag: "🇨🇷"
    },
    {
      country: "United States",
      projects: 20,
      description: "RAG Implementation on chatbot | Stakeholder Management",
      flag: "🇺🇸"
    },
    {
      country: "España",
      projects: 2,
      description: "IT outsourcing - collaboration",
      flag: "🇪🇸"
    },
    {
      country: "United Kingdom",
      projects: 1,
      description: "IT outsourcing - collaboration | Stakeholder Management",
      flag: "🇬🇧"
    },
    {
      country: "India",
      projects: 3,
      description: "IT outsourcing | Stakeholder Management",
      flag: "🇮🇳"
    },
    {
      country: "Ukraine",
      projects: 3,
      description: "IT outsourcing",
      flag: "🇺🇦"
    },
    {
      country: "Argentina",
      projects: 1,
      description: "ERP Implementation",
      flag: "🇦🇷"
    },
    {
      country: "Brazil",
      projects: 1,
      description: "RAG Implementation on chatbot",
      flag: "🇧🇷"
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
              <span className="text-3xl" role="img" aria-label={`${experience.country} flag`}>
                {experience.flag}
              </span>
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




