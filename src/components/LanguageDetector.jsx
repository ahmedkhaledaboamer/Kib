import React, { useEffect } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import i18n from '../i18n';

const LanguageDetector = () => {
  const { lang } = useParams();
  const location = useLocation();

  useEffect(() => {
     const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentLang = lang || (pathSegments.length > 0 ? pathSegments[0] : 'en');
    
    const supportedLanguages = ['en', 'ar', 'fr', 'du'];
    
    if (supportedLanguages.includes(currentLang)) {
      i18n.changeLanguage(currentLang);
      console.log('Language changed to:', currentLang);
    } else {
      i18n.changeLanguage('en');
      console.log('Default language (en) set');
    }
  }, [lang, location.pathname]);

  return <Outlet />;
};

export default LanguageDetector;