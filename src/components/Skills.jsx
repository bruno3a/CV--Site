import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t('skills.categories.business_analysis.title'),
      skills: [
        { name: t('skills.categories.business_analysis.skills.requirements_gathering'), level: 87 },
        { name: t('skills.categories.business_analysis.skills.process_modeling'), level: 80 },
        { name: t('skills.categories.business_analysis.skills.stakeholder_management'), level: 95 },
        { name: t('skills.categories.business_analysis.skills.data_analysis'), level: 85 },
      ],
    },
    {
      title: t('skills.categories.product_management.title'),
      skills: [
        { name: t('skills.categories.product_management.skills.product_strategy'), level: 92 },
        { name: t('skills.categories.product_management.skills.roadmap_planning'), level: 90 },
        { name: t('skills.categories.product_management.skills.user_story_mapping'), level: 85 },
        { name: t('skills.categories.product_management.skills.product_analytics'), level: 85 },
      ],
    },
    {
      title: t('skills.categories.methodologies.title'),
      skills: [
        { name: t('skills.categories.methodologies.skills.agile_scrum'), level: 95 },
        { name: t('skills.categories.methodologies.skills.kanban'), level: 90 },
        { name: t('skills.categories.methodologies.skills.lean'), level: 75 },
      ],
    },
    {
      title: t('skills.categories.technical.title'),
      skills: [
        { name: t('skills.categories.technical.skills.sql'), level: 85 },
        { name: t('skills.categories.technical.skills.python'), level: 60 },
        { name: t('skills.categories.technical.skills.r'), level: 60 },
        { name: t('skills.categories.technical.skills.api_management'), level: 85 },
        { name: t('skills.categories.technical.skills.azure_devops'), level: 85 },
        { name: t('skills.categories.technical.skills.data_visualization'), level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Skills & Expertise</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card"
            >
              <h3 className="text-xl font-bold text-primary mb-6">{category.title}</h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-background-dark rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
