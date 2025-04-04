import { useState, useEffect } from 'react';

const SecureContent = ({ content, type = 'text', children, name }) => {
  const [isHuman, setIsHuman] = useState(false);
  const [decodedContent, setDecodedContent] = useState('');
  
  // Versión ofuscada para SEO (no revela la dirección exacta pero mantiene formato reconocible)
  const getObfuscatedContent = () => {
    try {
      const decoded = atob(content);
      if (type === 'email') {
        return decoded.replace('@', '[at]').replace(/\./g, '[dot]');
      }
      if (type === 'url') {
        return decoded.replace('https://', '').replace('http://', '').split('/')[0] + '/...';
      }
      return '...';
    } catch (e) {
      return '...';
    }
  };
  
  useEffect(() => {
    let interactions = 0;
    const handleInteraction = () => {
      interactions++;
      if (interactions > 2) {
        setIsHuman(true);
      }
    };
    
    const handleKeyDown = () => {
      handleInteraction();
    };

    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  useEffect(() => {
    if (isHuman) {
      const decoded = atob(content);
      setDecodedContent(decoded);
    }
  }, [isHuman, content]);
  
  const handleClick = () => {
    if (!isHuman) {
      setIsHuman(true);
      return;
    }
    
    if (type === 'email') {
      window.location.href = `mailto:${decodedContent}`;
    } else if (type === 'url') {
      window.open(decodedContent, '_blank');
    }
  };
  
  return (
    <>
      <div 
        onClick={handleClick}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        className="cursor-pointer focus:outline-blue-500 focus:ring-2"
        tabIndex={0}
        role="button"
        aria-label={type === 'url' ? `Visit ${name} profile` : `Contact via ${name}`}
      >
        {children}
      </div>
      
      {/* Versión para SEO y usuarios sin JS */}
      <span className="sr-only">
        {type === 'url' ? `${name}: ${getObfuscatedContent()}` : `${name}: ${getObfuscatedContent()}`}
      </span>
      
      {/* Metadatos estructurados para SEO usando versión ofuscada */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ 
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'url' ? "SocialMediaPosting" : "ContactPoint",
          "name": name,
          "url": type === 'url' ? getObfuscatedContent() : undefined,
          "email": type === 'email' ? getObfuscatedContent() : undefined
        })
      }} />
    </>
  );
};

export default SecureContent;