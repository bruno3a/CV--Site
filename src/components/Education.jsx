import { motion } from 'framer-motion';
import { IoLanguage } from 'react-icons/io5';
import { useLanguage } from '../contexts/LanguageContext';

const education = [
  {
    degree: "Data Science Analyst",
    institution: "Digital House",
    period: "February 2021",
    description: "Completed training in data analysis, statistics, and machine learning techniques.",
    achievements: [
      "Developed predictive models using Python",
      "Worked on data-driven decision-making projects",
      "Gained hands-on experience with SQL and visualization tools"
    ]
  },
  {
    degree: "Bachelor in Business Management",
    institution: "Buenos Aires University",
    period: "2009 - 2015",
    description: "Focused on business strategy, organizational behavior, and operational efficiency.",
    achievements: [
      "Strengthened leadership and project management skills",
      "Conducted research on business process optimization",
      "Participated in case study competitions"
    ]
  }
];

const Education = () => {
  const { t } = useLanguage();
  
  const languages = [
    { 
      name: "Spanish", 
      level: t('sections.education.levels.native'), 
      flag: `${process.env.PUBLIC_URL}/flags/es.svg`,
      progress: 100 
    },
    { 
      name: "English", 
      level: t('sections.education.levels.advanced'), 
      flag: `${process.env.PUBLIC_URL}/flags/us.svg`,
      progress: 90 
    },
    { 
      name: "Portuguese", 
      level: t('sections.education.levels.advanced'), 
      flag: `${process.env.PUBLIC_URL}/flags/br.svg`,
      progress: 85 
    },
    { 
      name: "Russian", 
      level: t('sections.education.levels.basic'), 
      flag: `${process.env.PUBLIC_URL}/flags/ru.svg`,
      progress: 30 
    }
  ];

  return (
    <section id="education" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{t('sections.education.title')}</h2>

        <div className="space-y-8 mb-12">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card relative"
            >
              {/* Línea decorativa */}
              <div className="absolute left-0 top-0 h-full w-1 bg-primary/20 rounded-full">
                <div className="w-full h-1/3 bg-primary rounded-full" />
              </div>

              <div className="pl-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{item.degree}</h3>
                    <p className="text-gray-400">{item.institution}</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-background-light px-3 py-1 rounded-full">
                    {item.period}
                  </span>
                </div>

                <p className="text-gray-300 mb-4">{item.description}</p>

                <ul className="space-y-2">
                  {item.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-center text-gray-400">
                      <span className="text-primary mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card"
        >
          <div className="flex items-center gap-2 mb-6">
            <IoLanguage className="text-2xl text-primary" />
            <h3 className="text-xl font-bold">{t('sections.education.languages')}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-background-light rounded-lg p-4 hover:bg-background-dark transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={lang.flag} 
                    alt={`${lang.name} flag`} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-300">{lang.name}</h4>
                    <span className="text-sm text-primary">{lang.level}</span>
                  </div>
                </div>
                <div className="h-1.5 bg-background rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Education;
