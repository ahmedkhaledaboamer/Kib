import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./ar.json";
import en from "./en.json";
import fr from "./fr.json";
import du from "./du.json";

// Function to detect language from URL
const detectLanguageFromURL = () => {
  const pathname = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const fullUrl = (pathname + search + hash).toLowerCase();

  // Check if URL contains language codes
  if (fullUrl.includes('/ar') || fullUrl.includes('?ar') || fullUrl.includes('#ar') || fullUrl.includes('lang=ar')) {
    return 'ar';
  } else if (fullUrl.includes('/en') || fullUrl.includes('?en') || fullUrl.includes('#en') || fullUrl.includes('lang=en')) {
    return 'en';
  } else if (fullUrl.includes('/fr') || fullUrl.includes('?fr') || fullUrl.includes('#fr') || fullUrl.includes('lang=fr')) {
    return 'fr';
  } else if (fullUrl.includes('/du') || fullUrl.includes('?du') || fullUrl.includes('#du') || fullUrl.includes('lang=du')) {
    return 'du';
  }
  
  // Default to Arabic if no language detected
  return 'ar';
};

// Get detected language
const detectedLanguage = detectLanguageFromURL();

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    en: { translation: en },
    fr: { translation: fr },
    du: { translation: du }
  },
  lng: detectedLanguage,
  fallbackLng: "ar",
  interpolation: { escapeValue: false }
});

// Listen for URL changes (popstate for back/forward, and custom events for navigation)
const handleLanguageChange = () => {
  const newLanguage = detectLanguageFromURL();
  if (i18n.language !== newLanguage) {
    i18n.changeLanguage(newLanguage);
  }
};

// Listen to popstate (back/forward browser buttons)
window.addEventListener('popstate', handleLanguageChange);

// Listen to custom navigation events (for React Router)
window.addEventListener('pushstate', handleLanguageChange);
window.addEventListener('replacestate', handleLanguageChange);

// Override pushState and replaceState to trigger language detection
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function(...args) {
  originalPushState.apply(history, args);
  setTimeout(handleLanguageChange, 0);
};

history.replaceState = function(...args) {
  originalReplaceState.apply(history, args);
  setTimeout(handleLanguageChange, 0);
};

export default i18n;
