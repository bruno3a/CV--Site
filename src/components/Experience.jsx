import { motion } from 'framer-motion';

const experiences = [
  {
    title: "Business Analyst - Product Owner",
    company: "Ernst & Young - in representation of Hexaware Technologies",
    period: "December 2021 - Present",
    description: [
      "Gathered product requirements and managed backlog refinement in Azure DevOps",
    "Led Scrum-ban ceremonies, release planning, and cross-functional team coordination",
    "Drove the development of an API Management solution for EY’s collaborators",
    "Implemented LLMs for AI-assisted chat (RAG), enhancing user experience and simplifying processes",
    "Collaborated with global teams, leveraging Postman, MongoDB, Miro, and Azure DevOps",
    "Managed a product backlog of 150+ items and coordinated/managed with stakeholders",
    ],
  },
  {
    title: "Sr. Business Analyst",
    company: "Deloitte - in representation of Globant",
    period: "June 2021 - December 2021",
    description: [
      "Participated in the BA Academy, enhancing business analysis expertise and sharing knowledge with colleagues",
    "Documented user stories and managed backlog in Jira",
    "Supported the development and maintenance of an internal engagement management solution",
    "Applied Agile framework to improve project execution and team collaboration",
    "Completed Udemy certifications to strengthen BA and Agile skills",
    "Developed comprehensive business requirements and user stories",
    "Facilitated workshops and training sessions for stakeholders",
    ],
  },
  {
    title: "Functional Product Leader & Business Analyst",
    company: "Beesion Technologies (Claro CenAm & IPLAN clients)",
    period: "Feb 2016 - June 2021",
    description: [
      "Led requirement analysis, backlog prioritization, and product improvements",
    "Conducted user training, onsite implementations, and provided client support",
    "Managed documentation, user testing, and issue monitoring for CPQ (Configure-Price-Quote) solution",
    "Worked closely with developers, managers, and end users to enhance usability",
    "Implemented the CPQ suite for Claro Central America across 5 countries",
    "Developed strong problem-solving, communication, and stakeholder management skills",
    "Conducted discovery sessions for an ERP implementation project (IPLAN)",
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