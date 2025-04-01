import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Business Analysis",
    skills: [
      { name: "Requirements Gathering", level: 87 },
      { name: "Process Modeling", level: 80 },
      { name: "Stakeholder Management", level: 95 },
      { name: "Data Analysis", level: 85 },
    ],
  },
  {
    title: "Product Management",
    skills: [
      { name: "Product Strategy", level: 92 },
      { name: "Roadmap Planning", level: 90 },
      { name: "User Story Mapping", level: 85 },
      { name: "Product Analytics", level: 85 },
    ],
  },
  {
    title: "Methodologies",
    skills: [
      { name: "Agile/Scrum", level: 95 },
      { name: "Kanban", level: 90 },
      { name: "Lean", level: 75 },
      { name: "Design Thinking", level: 75 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Jira", level: 85 },
      { name: "Confluence", level: 80 },
      { name: "Tableau", level: 75 },
      { name: "Figma", level: 85 },
    ],
  },
];

const Skills = () => {
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