import React, { createContext, useContext, useState, useEffect } from 'react';
import storageHelper from '../utils/storageHelper';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default language is Malayalam ('ml') as requested for special education in Kerala
  const [language, setLanguage] = useState(() => {
    return storageHelper.get('preferred_language', 'ml');
  });

  useEffect(() => {
    storageHelper.set('preferred_language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ml' ? 'en' : 'ml'));
  };

  // Helper to pick Malayalam or English based on current setting
  const t = (mlText, enText) => {
    return language === 'ml' ? mlText : enText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;

