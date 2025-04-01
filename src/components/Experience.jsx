import { motion } from 'framer-motion';

const experiences = [
  {
    title: "Senior Product Owner",
    company: "Tech Solutions Inc.",
    period: "2020 - Present",
    description: [
      "Led cross-functional teams in developing and launching 5 major product features",
      "Increased user engagement by 45% through data-driven product improvements",
      "Managed a product backlog of 200+ items and coordinated with stakeholders",
    ],
  },
  {
    title: "Business Analyst",
    company: "Digital Innovations Corp",
    period: "2018 - 2020",
    description: [
      "Conducted market research and competitor analysis for new product initiatives",
      "Developed comprehensive business requirements and user stories",
      "Facilitated workshops and training sessions for stakeholders",
    ],
  },
  {
    title: "Product Analyst",
    company: "StartUp Ventures",
    period: "2016 - 2018",
    description: [
      "Analyzed user behavior and created detailed product usage reports",
      "Collaborated with UX team to improve product usability",
      "Implemented agile methodologies and best practices",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Experience</h2>

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