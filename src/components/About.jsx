import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20">
      <motion.div className="container mx-auto px-4">
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
            <p className="text-gray-300 mb-6">
              {t('about.description')}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-2">8+</h3>
                <p className="text-gray-400">{t('about.stats.years')}</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-2">50+</h3>
                <p className="text-gray-400">{t('about.stats.projects')}</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-2">30+</h3>
                <p className="text-gray-400">{t('about.stats.clients')}</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-2">15+</h3>
                <p className="text-gray-400">{t('about.stats.awards')}</p>
              </div>
            </div>

            <a href="#contact" className="button-primary inline-block">
              {t('about.cta')}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
