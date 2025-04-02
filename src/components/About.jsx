import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FaFileDownload, FaEnvelope } from 'react-icons/fa';

const About = () => {
  const { t } = useLanguage();

  const handleDownloadCV = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/files/cv.pdf`;
    link.download = 'BrunoTrezza_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="section-container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Columna izquierda: Imagen y botones */}
            <div className="md:col-span-4">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-4/5 mx-auto md:w-full mb-6"
              >
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={`${process.env.PUBLIC_URL}/profile-image.jpg`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 mt-8">
                <a 
                  href="#contact" 
                  className="button-primary text-center inline-flex items-center justify-center gap-2"
                >
                  <FaEnvelope className="text-xl" />
                  {t('about.contact_me')}
                </a>
                
                <button
                  onClick={handleDownloadCV}
                  className="button-outline inline-flex items-center justify-center gap-2"
                >
                  <FaFileDownload />
                  {t('hero.download_cv')}
                </button>
              </div>
            </div>

            {/* Columna derecha: Texto y stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-8 space-y-8"
            >
              {/* Texto */}
              <div className="space-y-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  {t('about.description')}
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {t('about.extended_description')}
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[120px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="card h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="text-2xl font-bold text-primary">{t('about.stats.years_value')}</div>
                  <div className="text-sm text-gray-400">{t('about.stats.years')}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="card h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="text-2xl font-bold text-primary">7</div>
                  <div className="text-sm text-gray-400">{t('about.stats.projects')}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="card h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-sm text-gray-400">{t('about.stats.clients')}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="card h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-gray-400">{t('about.stats.areas')}</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

















