import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import i18n from '../i18n';

const LanguageDetector = () => {
  const { lang } = useParams();

  useEffect(() => {
    const supportedLanguages = ['en', 'ar', 'fr', 'du'];

    if (supportedLanguages.includes(lang)) {
      i18n.changeLanguage(lang);
    } else {
      i18n.changeLanguage('en');
    }
  }, [lang]);

  return <Outlet />;
};

export default LanguageDetector;
