import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FaFileDownload } from 'react-icons/fa';

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
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src={`${process.env.PUBLIC_URL}/profile-image.jpg`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 max-w-full"
            >
              <div className="space-y-4">
                <p className="text-lg text-gray-300">
                  {t('about.description')}
                </p>
                <p className="text-lg text-gray-300">
                  {t('about.extended_description')}
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="card p-4 text-center"
                >
                  <div className="text-2xl font-bold text-primary">8+</div>
                  <div className="text-sm text-gray-400">{t('about.stats.years')}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="card p-4 text-center"
                >
                  <div className="text-2xl font-bold text-primary">7</div>
                  <div className="text-sm text-gray-400">{t('about.stats.projects')}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="card p-4 text-center"
                >
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-sm text-gray-400">{t('about.stats.clients')}</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="card p-4 text-center"
                >
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-gray-400">{t('about.stats.areas')}</div>
                </motion.div>
              </div>

              <div className="flex gap-4 mt-8">
                <a 
                  href="#contact" 
                  className="button-primary inline-block"
                >
                  {t('about.cta')}
                </a>
                
                <button
                  onClick={handleDownloadCV}
                  className="button-outline inline-flex items-center gap-2"
                >
                  <FaFileDownload />
                  {t('hero.download_cv')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;








