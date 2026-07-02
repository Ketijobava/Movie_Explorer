import { useState, useEffect } from 'react';
import { LanguageContext } from './LanguageContextObject';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem('language') || 'en'
  );

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language === 'ka' ? 'ka' : 'en';
  }, [language]);

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === 'en' ? 'ka' : 'en'));

  const apiLanguage = language === 'ka' ? 'ka-GE' : 'en-US';

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, apiLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
