import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Imagen de perfil */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src="/profile-image.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border-2 border-primary rounded-2xl" />
          </motion.div>

          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-gray-300">
              With over 8 years of experience in business analysis and product management,
              I specialize in bridging the gap between business needs and technical solutions.
              My approach combines analytical thinking with strategic vision to deliver
              impactful results.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-2">8+</h3>
                <p className="text-gray-400">Years Experience</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-2">50+</h3>
                <p className="text-gray-400">Projects Completed</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-2">30+</h3>
                <p className="text-gray-400">Happy Clients</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-2">15+</h3>
                <p className="text-gray-400">Awards Received</p>
              </div>
            </div>

            <a href="#contact" className="button-primary inline-block">
              Let's Talk
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;