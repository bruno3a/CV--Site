import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const getExperienceData = (t) => [
  {
    title: t('experience.roles.ey.title'),
    company: t('experience.roles.ey.company'),
    period: t('experience.roles.ey.period'),
    description: [
      t('experience.roles.ey.description.1'),
      t('experience.roles.ey.description.2'),
      t('experience.roles.ey.description.3'),
      t('experience.roles.ey.description.4'),
      t('experience.roles.ey.description.5'),
      t('experience.roles.ey.description.6'),
    ],
  },
  {
    title: t('experience.roles.deloitte.title'),
    company: t('experience.roles.deloitte.company'),
    period: t('experience.roles.deloitte.period'),
    description: [
      t('experience.roles.deloitte.description.1'),
      t('experience.roles.deloitte.description.2'),
      t('experience.roles.deloitte.description.3'),
      t('experience.roles.deloitte.description.4'),
      t('experience.roles.deloitte.description.5'),
      t('experience.roles.deloitte.description.6'),
      t('experience.roles.deloitte.description.7'),
    ],
  },
  {
    title: t('experience.roles.beesion.title'),
    company: t('experience.roles.beesion.company'),
    period: t('experience.roles.beesion.period'),
    description: [
      t('experience.roles.beesion.description.1'),
      t('experience.roles.beesion.description.2'),
      t('experience.roles.beesion.description.3'),
      t('experience.roles.beesion.description.4'),
      t('experience.roles.beesion.description.5'),
      t('experience.roles.beesion.description.6'),
      t('experience.roles.beesion.description.7'),
    ],
  },
];

const Experience = () => {
  const { t } = useLanguage();
  const experiences = getExperienceData(t);
  
  return (
    <section id="experience" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{t('experience.title')}</h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-3 top-6 w-6 h-6 bg-primary rounded-full" />
              
              {/* Content */}
              <div className="ml-4">
                <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">{exp.company}</span>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {exp.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 border border-primary/0 rounded-lg transition-all duration-300 hover:border-primary/50" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;

