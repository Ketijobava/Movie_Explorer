import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem('language') || 'en'
  );

  useEffect(() => {
    localStorage.setItem('language', language);
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

export const useLanguage = () => useContext(LanguageContext);
