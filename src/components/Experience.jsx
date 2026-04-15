import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const getExperienceData = (t) => [
  {
    title: t('experience.roles.farmers.title'),
    company: t('experience.roles.farmers.company'),
    period: t('experience.roles.farmers.period'),
    logo: `${process.env.PUBLIC_URL}/images/farmers-logo.png`,
    website: 'https://www.farmers.com/',
    description: [
      t('experience.roles.farmers.description.1'),
      t('experience.roles.farmers.description.2'),
      t('experience.roles.farmers.description.3'),
      t('experience.roles.farmers.description.4'),
      t('experience.roles.farmers.description.5'),
      t('experience.roles.farmers.description.6'),
    ],
  },
  {
    title: t('experience.roles.tech_consultant.title'),
    company: t('experience.roles.tech_consultant.company'),
    period: t('experience.roles.tech_consultant.period'),
    logo: `${process.env.PUBLIC_URL}/images/neurasur-logo.png`,
    website: 'https://neurasur.com/',
    description: [
      t('experience.roles.tech_consultant.description.1'),
      t('experience.roles.tech_consultant.description.2'),
      t('experience.roles.tech_consultant.description.3'),
      t('experience.roles.tech_consultant.description.4'),
      t('experience.roles.tech_consultant.description.5'),
      t('experience.roles.tech_consultant.description.6'),
      t('experience.roles.tech_consultant.description.7'),
      t('experience.roles.tech_consultant.description.8'),
    ],
  },
  {
    title: t('experience.roles.ey.title'),
    company: t('experience.roles.ey.company'),
    period: t('experience.roles.ey.period'),
    logo: `${process.env.PUBLIC_URL}/images/ey-logo.png`,
    website: 'https://www.ey.com/es_ar',
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
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-2">{exp.title}</h3>
                    <span className="text-gray-400 block mb-2">
                      {exp.website ? (
                        <>
                          <a 
                            href={exp.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors underline relative z-10"
                          >
                            {exp.company.split(' - ')[0]}
                          </a>
                          {exp.company.includes(' - ') && ` - ${exp.company.split(' - ')[1]}`}
                        </>
                      ) : (
                        exp.company
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {exp.logo && (
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} logo`}
                        className="w-16 h-16 object-contain"
                      />
                    )}
                    <span className="text-sm text-gray-500 whitespace-nowrap">{exp.period}</span>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {exp.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Hover effect - removido pointer-events-none */}
              <div className="absolute inset-0 border border-primary/0 rounded-lg transition-all duration-300 hover:border-primary/50 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;

