import { useEffect, useCallback, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const BOTPRESS_CONFIG = {
  BASE_SCRIPT_URL: 'https://cdn.botpress.cloud/webchat/v2.3/inject.js',
  CUSTOM_SCRIPT_URL: 'https://files.bpcontent.cloud/2025/04/02/00/20250402001816-WWLOGL5R.js',
  BOT_ID: process.env.REACT_APP_BOTPRESS_BOT_ID,
  HOST_URL: process.env.REACT_APP_BOTPRESS_HOST_URL || 'https://cdn.botpress.cloud/webchat/v2.2',
  MESSAGING_URL: process.env.REACT_APP_BOTPRESS_MESSAGING_URL || 'https://messaging.botpress.cloud'
};

// Función para generar un ID de cliente único y consistente
const generateClientId = () => {
  const timestamp = new Date();
  const formattedDate = timestamp.getFullYear() +
    String(timestamp.getMonth() + 1).padStart(2, '0') +
    String(timestamp.getDate()).padStart(2, '0') +
    String(timestamp.getHours()).padStart(2, '0') +
    String(timestamp.getMinutes()).padStart(2, '0') +
    String(timestamp.getSeconds()).padStart(2, '0');
  
  const randomStr = Math.random().toString(36).substring(2, 11).toUpperCase();
  return `${formattedDate}-${randomStr}`;
};

const ChatBot = () => {
  const { t, language } = useLanguage();
  const [isBaseScriptLoaded, setIsBaseScriptLoaded] = useState(false);
  const [isCustomScriptLoaded, setIsCustomScriptLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [clientId] = useState(generateClientId); // Genera el ID una vez y lo mantiene
  const [showTooltip, setShowTooltip] = useState(true); // Nuevo estado para el tooltip
  const [isChatAvailable, setIsChatAvailable] = useState(false); // Nuevo estado para rastrear si el chat está disponible

  const initializeBotpress = useCallback(async () => {
    if (!window.botpressWebChat || isInitialized) {
      return;
    }

    try {
      const config = {
        botId: BOTPRESS_CONFIG.BOT_ID,
        hostUrl: BOTPRESS_CONFIG.HOST_URL,
        messagingUrl: BOTPRESS_CONFIG.MESSAGING_URL,
        clientId: clientId, // Usa el ID generado
        composerPlaceholder: t('chat.placeholder'),
        botConversationDescription: t('chat.start_message'),
        lazySocket: false,
        frontendVersion: '2.2',
        showPoweredBy: false,
        theme: 'dark',
        themeName: 'dark',
        lang: language,
        hideWidget: false,
        showConversationsButton: false,
        enableTranscriptDownload: false,
        closeOnEscape: true,
        disableAnimations: false,
        enableReset: true,
        showTimestamp: true,
        enablePersistHistory: true,
        avatarUrl: `${process.env.PUBLIC_URL}/icons/bt-favicon.svg`,
        containerWidth: 400,
        layoutWidth: 400,
        buttonWidth: 'auto',
        buttonHeight: 56,
        disableNotificationSound: false,
        stylesheet: `
          :root {
            --bp-font-family: Inter, sans-serif;
            --bp-bg-color: #1f2937;
            --bp-color: white;
            --bp-primary-color: #3B82F6;
            --bp-primary-dark: #1E40AF;
          }
        `
      };
      
      if (!window.botpressWebChat.isInitialized) {
        await window.botpressWebChat.init(config);
        console.log('Botpress initialized successfully');
      }
      
      setIsInitialized(true);
      setHasError(false);
      setIsChatAvailable(true);

    } catch (error) {
      console.log('Initialization attempt failed, but chat might still be working');
    }
  }, [t, language, clientId, isInitialized]);

  useEffect(() => {
    const loadScripts = async () => {
      try {
        // Eliminar scripts existentes
        const existingScripts = document.querySelectorAll('script[src*="botpress"]');
        existingScripts.forEach(script => script.remove());

        // Cargar el script base primero
        const baseScript = document.createElement('script');
        baseScript.src = BOTPRESS_CONFIG.BASE_SCRIPT_URL;
        baseScript.async = true;
        baseScript.defer = true;
        
        baseScript.onload = () => {
          console.log('Base Botpress script loaded successfully');
          setIsBaseScriptLoaded(true);
          setHasError(false); // Reset error on successful load
          
          // Cargar el script personalizado después
          const customScript = document.createElement('script');
          customScript.src = BOTPRESS_CONFIG.CUSTOM_SCRIPT_URL;
          customScript.async = true;
          customScript.defer = true;
          
          customScript.onload = () => {
            console.log('Custom Botpress script loaded successfully');
            setIsCustomScriptLoaded(true);
            setHasError(false); // Reset error on successful load
          };
          
          customScript.onerror = (error) => {
            console.error('Error loading custom Botpress script:', error);
            setHasError(true);
          };
          
          document.body.appendChild(customScript);
        };
        
        baseScript.onerror = (error) => {
          console.error('Error loading base Botpress script:', error);
          setHasError(true);
        };
        
        document.body.appendChild(baseScript);
      } catch (error) {
        console.error('Error creating script elements:', error);
        setHasError(true);
      }
    };

    loadScripts();
    return () => {
      setHasError(false); // Reset error on unmount
    };
  }, []);

  useEffect(() => {
    if (isBaseScriptLoaded && isCustomScriptLoaded && !isInitialized) {
      // Solo intentar inicializar si window.botpressWebChat no está ya inicializado
      if (window.botpressWebChat && window.botpressWebChat.isInitialized) {
        console.log('Botpress already initialized, skipping...');
        setIsInitialized(true);
        return;
      }

      let attempts = 0;
      const maxAttempts = 3; // Reducir el número de intentos
      const interval = setInterval(() => {
        if (window.botpressWebChat) {
          clearInterval(interval);
          if (!isInitialized) {
            initializeBotpress();
          }
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          console.log('Botpress initialization skipped - widget might be already running');
        }
        attempts++;
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isBaseScriptLoaded, isCustomScriptLoaded, isInitialized, initializeBotpress]);

  return (
    <>
      <div id="bp-web-widget-container" className="z-[9999]" />
      {showTooltip && (
        <div className="fixed bottom-24 right-8 z-[9998] bg-primary text-white px-4 py-2 rounded-lg shadow-lg max-w-xs animate-bounce">
          <div className="relative">
            <p className="pr-6">{t('chat.let_me_help_you')}</p>
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute top-0 right-0 text-white hover:text-gray-200"
              aria-label="Close tooltip"
            >
              ×
            </button>
            <div className="absolute -bottom-2 right-4 transform translate-y-full">
              <div className="border-8 border-transparent border-t-primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
