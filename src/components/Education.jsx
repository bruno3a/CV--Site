import { motion } from 'framer-motion';

const education = [
  {
    degree: "Master in Business Administration",
    institution: "Stanford University",
    period: "2014 - 2016",
    description: "Specialized in Technology Management and Digital Transformation. Graduated with honors.",
    achievements: [
      "Led digital innovation projects",
      "Published research on AI in Business",
      "President of Tech Business Club"
    ]
  },
  {
    degree: "Bachelor in Business Analytics",
    institution: "University of California",
    period: "2010 - 2014",
    description: "Focus on data-driven decision making and business intelligence systems.",
    achievements: [
      "Dean's List all semesters",
      "Founded Analytics Society",
      "Internship at Fortune 500 company"
    ]
  },
  {
    degree: "Professional Certifications",
    institution: "Various Institutions",
    period: "2016 - Present",
    description: "Continuous professional development through industry-recognized certifications.",
    achievements: [
      "Certified Scrum Product Owner (CSPO)",
      "Professional Scrum Master (PSM I)",
      "Advanced Business Analysis Professional (CBAP)",
      "Project Management Professional (PMP)"
    ]
  }
];

const Education = () => {
  return (
    <section id="education" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Education & Certifications</h2>

        <div className="space-y-8">
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
      </motion.div>
    </section>
  );
};

export default Education;