import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const BOTPRESS_SCRIPTS = [
  'https://cdn.botpress.cloud/webchat/v2.2/inject.js',
  'https://files.bpcontent.cloud/2025/04/02/00/20250402001816-WWLOGL5R.js'
];

const ChatBot = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    window.botpressReady = false;
    console.log('Initializing Botpress...');

    const loadScripts = async () => {
      try {
        const scriptPromises = BOTPRESS_SCRIPTS.map(scriptUrl => new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = scriptUrl;
          script.async = true;
          script.onload = () => {
            console.log('Script loaded:', scriptUrl);
            resolve(true);
          };
          script.onerror = reject;
          document.body.appendChild(script);
        }));
        await Promise.all(scriptPromises);

        if (!window.botpressWebChat) {
          console.error('Botpress WebChat object not found after loading scripts.');
          return;
        }
        
        console.log('Initializing Botpress WebChat...');        
        window.botpressWebChat.init({
          composerPlaceholder: t('chat.placeholder'),
          botConversationDescription: t('chat.start_message'),
          botName: "Bruno's AI profile assistant",
          botId: "Bruno's AI profile assistant",
          userId: "Bruno's AI profile assistant",
          hostUrl: 'https://cdn.botpress.cloud/webchat/v2',
          messagingUrl: 'https://messaging.botpress.cloud',
          lazySocket: true,
          themeName: 'dark',
          frontendVersion: '2.2',
          showPoweredBy: false,
          theme: 'dark',
          lang: language,
          hideWidget: true,
          showConversationsButton: false,
          enableTranscriptDownload: false,
          closeOnEscape: true,
          disableAnimations: false,
          enableReset: true,
          showTimestamp: true,
          enablePersistHistory: true,
          avatarUrl: `${process.env.PUBLIC_URL}/icons/bt-favicon.svg`,
          buttonWidth: 'auto',
          buttonHeight: 56,
          disableNotificationSound: false,
          botButtonText: t('chat.let_me_help_you'),
          stylesheet: `${existingStyles}`
        }).then(() => {
          console.log('Botpress initialization complete');
          window.botpressReady = true;
        }).catch(error => {
          console.error('Error initializing Botpress:', error);
          window.botpressReady = false;
        });
      } catch (error) {
        console.error('Error loading Botpress:', error);
      }
    };

    loadScripts();

    return () => {
      console.log('Cleaning up Botpress...');
      BOTPRESS_SCRIPTS.forEach(scriptUrl => {
        const script = document.querySelector(`script[src="${scriptUrl}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
      delete window.botpressWebChat;
      delete window.botpressReady;
    };
  }, [t, language]);

  return (
    <>
      {/* Leyenda permanente */}
      <div className="fixed bottom-24 right-4 z-50 bg-primary text-white px-4 py-2 rounded-full shadow-lg hidden md:block">
        {t('chat.let_me_help_you')}
        <div className="absolute bottom-[-8px] right-8 w-0 h-0 
                      border-l-[8px] border-l-transparent
                      border-t-[8px] border-t-primary
                      border-r-[8px] border-r-transparent">
        </div>
      </div>
    </>
  );
};

// Mantén los estilos existentes en una constante
const existingStyles = `
  :root {
    --bp-font-family: Inter, sans-serif;
    --bp-bg-color: #1f2937;
    --bp-color: white;
    --bp-primary-color: #3B82F6;
    --bp-primary-dark: #1E40AF;
  }

  .bpw-floating-button {
    width: auto !important;
    padding: 0 20px !important;
    border-radius: 28px !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    transition: all 0.3s ease !important;
    background-color: var(--bp-primary-color) !important;
    position: relative !important;
  }

  .bpw-floating-button:hover {
    background-color: var(--bp-primary-dark) !important;
    transform: scale(1.05) !important;
  }

  .bpw-button-text {
    display: inline-block !important;
    margin-left: 8px !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    white-space: nowrap !important;
    color: white !important;
  }

  @media (max-width: 640px) {
    .bpw-floating-button {
      width: 56px !important;
      padding: 0 !important;
    }
    
    .bpw-button-text {
      display: none !important;
    }
  }
`;

export default ChatBot;
