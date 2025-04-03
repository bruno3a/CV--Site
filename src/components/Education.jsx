import { motion } from 'framer-motion';
import { IoLanguage } from 'react-icons/io5';
import { FaVolumeUp, FaStop } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import Tooltip from './Tooltip';
import { useState, useRef, useEffect } from 'react';

const Education = () => {
  const { t } = useLanguage();
  
  // Verificar en la consola si las traducciones están funcionando
  console.log('Current translations:', {
    title: t('sections.education.title'),
    dataScience: t('education.items.data_science.degree'),
    business: t('education.items.business.degree')
  });

  const education = [
    {
      degree: t('education.items.data_science.degree'),
      institution: t('education.items.data_science.institution'),
      period: t('education.items.data_science.period'),
      description: t('education.items.data_science.description'),
      achievements: [
        t('education.items.data_science.achievements.0'),
        t('education.items.data_science.achievements.1'),
        t('education.items.data_science.achievements.2')
      ]
    },
    {
      degree: t('education.items.business.degree'),
      institution: t('education.items.business.institution'),
      period: t('education.items.business.period'),
      description: t('education.items.business.description'),
      achievements: [
        t('education.items.business.achievements.0'),
        t('education.items.business.achievements.1'),
        t('education.items.business.achievements.2')
      ]
    }
  ];

  const [playingAudio, setPlayingAudio] = useState(null);
  const [showTooltips, setShowTooltips] = useState(false);
  const audioRefs = useRef({});
  const tooltipTimeoutRef = useRef(null);

  const handleSectionHover = () => {
    setShowTooltips(true);
    
    // Limpiar el timeout anterior si existe
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }

    // Aumentar el timeout a 3 segundos
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltips(false);
    }, 3000);
  };

  // Limpiar el timeout cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  const playAudio = (langCode, audioSrc) => {
    // Si hay un audio reproduciéndose, lo detenemos
    if (playingAudio) {
      audioRefs.current[playingAudio].pause();
      audioRefs.current[playingAudio].currentTime = 0;
      
      // Si el usuario hace clic en el mismo audio que se está reproduciendo, solo lo detenemos
      if (playingAudio === langCode) {
        setPlayingAudio(null);
        return;
      }
    }

    // Si no existe el audio ref para este idioma, lo creamos
    if (!audioRefs.current[langCode]) {
      audioRefs.current[langCode] = new Audio(audioSrc);
      
      // Agregamos el evento para cuando termine el audio
      audioRefs.current[langCode].addEventListener('ended', () => {
        setPlayingAudio(null);
      });
    }

    // Reproducimos el nuevo audio
    audioRefs.current[langCode].play();
    setPlayingAudio(langCode);
  };

  const stopAudio = (langCode) => {
    if (audioRefs.current[langCode]) {
      audioRefs.current[langCode].pause();
      audioRefs.current[langCode].currentTime = 0;
      setPlayingAudio(null);
    }
  };

  // Traducciones fijas para cada idioma
  const fixedTranslations = {
    es: {
      listen: "¡Escucha mi pronunciación!",
      stop: "Detener pronunciación"
    },
    en: {
      listen: "Listen to my pronunciation!",
      stop: "Stop pronunciation"
    },
    pt: {
      listen: "Ouça minha pronúncia!",
      stop: "Parar pronúncia"
    },
    ru: {
      listen: "Послушайте моё произношение!",
      stop: "Остановить произношение"
    }
  };

  const languages = [
    { 
      code: 'es',
      name: t('languages.spanish'), 
      level: t('sections.education.levels.native'), 
      flag: `${process.env.PUBLIC_URL}/flags/es.svg`,
      progress: 100,
      audio: `${process.env.PUBLIC_URL}/audio/spanish-pronunciation.mp3`
    },
    { 
      code: 'en',
      name: t('languages.english'), 
      level: t('sections.education.levels.advanced'), 
      flag: `${process.env.PUBLIC_URL}/flags/us.svg`,
      progress: 90,
      audio: `${process.env.PUBLIC_URL}/audio/english-pronunciation.mp3`
    },
    { 
      code: 'pt',
      name: t('languages.portuguese'), 
      level: t('sections.education.levels.advanced'), 
      flag: `${process.env.PUBLIC_URL}/flags/br.svg`,
      progress: 85,
      audio: `${process.env.PUBLIC_URL}/audio/portuguese-pronunciation.mp3`
    },
    { 
      code: 'ru',
      name: t('languages.russian'), 
      level: t('sections.education.levels.basic'), 
      flag: `${process.env.PUBLIC_URL}/flags/ru.svg`,
      progress: 30,
      audio: `${process.env.PUBLIC_URL}/audio/russian-pronunciation.mp3`
    }
  ];

  const certificates = [
    {
      key: 'ba_modeling',
      icon: 'ba-icon.svg',
      url: 'http://ude.my/UC-226abde9-3f4c-468b-9907-5114fe534991'
    },
    {
      key: 'git',
      icon: 'git-icon.svg',
      url: 'http://ude.my/UC-7ea39e70-19cd-489c-842c-f1cc55c35263'
    },
    {
      key: 'ba_problem',
      icon: 'ba-icon.svg',
      url: 'http://ude.my/UC-700507d3-5700-4c6e-95b9-5f8e5eb0616d'
    },
    {
      key: 'agile_ba',
      icon: 'agile-icon.svg',
      url: 'http://ude.my/UC-98f78080-65f2-451e-8e07-dea84d3a3976'
    },
    {
      key: 'agile_fundamentals',
      icon: 'agile-icon.svg',
      url: 'http://ude.my/UC-0c856929-c734-4d59-9a7f-49e85c135981'
    },
    {
      key: 'azure_devops',
      icon: 'azure-icon.svg',
      url: 'http://ude.my/UC-077ad9fe-f71f-4fe3-a196-fb188df734b2'
    },
    {
      key: 'business_writing',
      icon: 'writing-icon.svg',
      url: 'http://ude.my/UC-1d3646eb-0d53-4383-be92-bb03b0506067'
    },
    {
      key: 'ba_requirements',
      icon: 'ba-icon.svg',
      url: 'http://ude.my/UC-3de3b103-9484-4421-a2b7-73f060ac9b6b'
    },
    {
      key: 'user_story',
      icon: 'agile-icon.svg',
      url: 'http://ude.my/UC-958cc0ed-4578-411a-9814-8c9900a35ea5'
    },
    {
      key: 'data_science_ml',
      icon: 'data-icon.svg',
      url: 'https://drive.google.com/file/d/1UnzQvjfoRtnZm4Lnwm3I_stNDL3fmU9j/view?usp=sharing'
    },
    {
      key: 'data_analyst',
      icon: 'data-icon.svg',
      url: 'https://drive.google.com/file/d/1HNvGNq2OG11aZtl5J65DMaiQaP2sE-cf/view?usp=sharing'
    }
  ].map(cert => ({
    ...cert,
    title: t(`education.certificates.items.${cert.key}.title`),
    issuer: t(`education.certificates.items.${cert.key}.issuer`),
    date: t(`education.certificates.items.${cert.key}.date`)
  }));

  const CertificateBadge = ({ certificate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const handleClick = (e) => {
      if (window.innerWidth < 768) {
        e.preventDefault();
        setIsExpanded(!isExpanded);
      } else {
        window.open(certificate.url, '_blank', 'noopener,noreferrer');
        console.log(`Opening certificate: ${certificate.title} - ${certificate.url}`);
      }
    };

    return (
      <motion.a
        href={certificate.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className={`card hover:border-primary/50 transition-all duration-300 
          md:flex md:items-start md:gap-4 group
          ${isExpanded ? 'min-h-[70px]' : 'min-h-[45px]'}
          p-2 md:p-6 cursor-pointer`}
        whileHover={{ scale: 1.02 }}
      >
        <div className="text-primary group-hover:text-primary-light transition-colors 
          float-left md:float-none mr-2 md:mr-0">
          <img 
            src={`${process.env.PUBLIC_URL}/icons/${certificate.icon}`} 
            alt={certificate.title}
            className="w-4 h-4 md:w-8 md:h-8"
          />
        </div>
        <div className="flex-1 min-w-0 overflow-hidden pt-0.5 md:pt-0">
          <h3 className="font-medium text-gray-200 text-xs md:text-sm leading-tight mb-0.5 md:mb-1 
            truncate md:normal-case">
            {certificate.title}
          </h3>
          <p className={`text-gray-400 text-[10px] md:text-sm transition-all duration-300
            ${isExpanded ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 md:opacity-100 md:max-h-20'}`}>
            {certificate.issuer} • {certificate.date}
          </p>
        </div>
      </motion.a>
    );
  };

  // Separar el tooltip en su propio componente
  const LanguageTooltip = ({ isVisible, lang, index }) => (
    <motion.div
      initial={false}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 10
      }}
      transition={{ 
        duration: 0.2,
        delay: index * 0.1
      }}
      className="absolute right-2 -top-8 z-50 pointer-events-none"
    >
      <div className="relative bg-gray-900 text-white px-3 py-2 rounded text-sm whitespace-nowrap">
        {fixedTranslations[lang.code]?.listen || fixedTranslations['en'].listen}
        <div 
          className="absolute h-3 w-3 bg-gray-900 
                     bottom-0 right-[18px] translate-y-1/2 
                     transform rotate-45"
        />
      </div>
    </motion.div>
  );

  return (
    <section id="education" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
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
          onMouseEnter={handleSectionHover}
        >
          <div className="flex items-center gap-2 mb-8"> {/* Aumentado el margin-bottom de 6 a 8 */}
            <IoLanguage className="text-2xl text-primary" />
            <h3 className="text-xl font-bold">{t('sections.education.languages')}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4"> {/* Agregado padding-top */}
            {languages.map((lang, index) => (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-background-light rounded-lg p-4 hover:bg-background-dark transition-colors relative"
              >
                {/* Tooltip reposicionado */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: showTooltips ? 1 : 0,
                    y: showTooltips ? 0 : 10
                  }}
                  transition={{ 
                    duration: 0.2,
                    delay: index * 0.1
                  }}
                  className="absolute right-2 -top-8 z-50" /* Cambiado de -top-10 a -top-8 */
                >
                  <div className="relative bg-gray-900 text-white px-3 py-2 rounded text-sm whitespace-nowrap">
                    {fixedTranslations[lang.code]?.listen || fixedTranslations['en'].listen}
                    <div 
                      className="absolute h-3 w-3 bg-gray-900 
                                 bottom-0 right-[18px] translate-y-1/2 
                                 transform rotate-45"
                    />
                  </div>
                </motion.div>

                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={lang.flag} 
                    alt={`${lang.name} flag`} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-300">{lang.name}</h4>
                    <span className="text-sm text-primary">{lang.level}</span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => playingAudio === lang.code 
                        ? stopAudio(lang.code)
                        : playAudio(lang.code, lang.audio)
                      }
                      className="text-gray-400 hover:text-primary transition-colors p-2 
                               rounded-full hover:bg-background/30"
                      aria-label={playingAudio === lang.code 
                        ? fixedTranslations[lang.code]?.stop || fixedTranslations['en'].stop
                        : fixedTranslations[lang.code]?.listen || fixedTranslations['en'].listen
                      }
                    >
                      {playingAudio === lang.code ? (
                        <FaStop className="w-5 h-5" />
                      ) : (
                        <FaVolumeUp className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="h-1.5 bg-background rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.progress}%` }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificates Section */}
        <div className="mt-6 md:mt-8"> {/* Reducido el margen superior en móvil */}
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">{t('education.certificates.title')}</h3>
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1.5 md:gap-4"
            style={{ minHeight: certificates.length > 0 ? 'auto' : '0' }}
          >
            {certificates.map((cert, index) => (
              <CertificateBadge 
                key={cert.key || index} 
                certificate={cert} 
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
