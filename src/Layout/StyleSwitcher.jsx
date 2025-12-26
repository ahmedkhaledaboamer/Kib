import React, { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';

const StyleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('orange');
  const [darkMode, setDarkMode] = useState(false);
  const [glassEffect, setGlassEffect] = useState(false);

  const themes = [
    { name: 'green', color: 'bg-lime-500', primary: '#84cc16' },
    { name: 'orange', color: 'bg-orange-500', primary: '#f97316' },
    { name: 'teal', color: 'bg-teal-400', primary: '#2dd4bf' },
    { name: 'pink', color: 'bg-pink-300', primary: '#f9a8d4' },
    { name: 'cyan', color: 'bg-cyan-400', primary: '#22d3ee' }
  ];

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', 
      themes.find(t => t.name === theme)?.primary || '#f97316'
    );
  }, [theme]);

  const containerClass = `min-h-screen transition-colors duration-300 ${
    darkMode ? 'bg-gray-900' : 'bg-gray-50'
  }`;

  const cardClass = `rounded-2xl p-8 transition-all duration-300 ${
    glassEffect 
      ? darkMode 
        ? 'bg-white/10 backdrop-blur-lg border border-white/20' 
        : 'bg-white/40 backdrop-blur-lg border border-white/60'
      : darkMode
        ? 'bg-gray-800'
        : 'bg-white'
  }`;

  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={containerClass}>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: themes.find(t => t.name === theme)?.primary }}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Settings className="w-6 h-6 text-white" />}
      </button>

      {/* Style Switcher Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${cardClass}`}
      >
        <div className="p-8">
          <h2 className={`text-2xl font-bold mb-8 ${textClass}`}>Style Switcher</h2>

          {/* Theme Colors */}
          <div className="mb-8">
            <h3 className={`text-sm font-medium mb-4 ${textMutedClass}`}>theme colors</h3>
            <div className="flex gap-3">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTheme(t.name)}
                  className={`w-10 h-10 rounded-full ${t.color} relative transition-transform hover:scale-110`}
                >
                  {theme === t.name && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="mb-6 flex items-center justify-between">
            <span className={`${textMutedClass}`}>dark mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors ${
                darkMode ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                } mt-0.5`}
              />
            </button>
          </div>

          {/* Glass Effect Toggle */}
          <div className="flex items-center justify-between">
            <span className={`${textMutedClass}`}>glass effect</span>
            <button
              onClick={() => setGlassEffect(!glassEffect)}
              className={`w-12 h-6 rounded-full transition-colors ${
                glassEffect ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  glassEffect ? 'translate-x-6' : 'translate-x-1'
                } mt-0.5`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className={cardClass}>
            <h1 className={`text-4xl font-bold mb-4 ${textClass}`}>
              مرحباً بك في موقعنا
            </h1>
            <p className={`text-lg mb-6 ${textMutedClass}`}>
              جرب تغيير الألوان والثيم من القائمة على اليسار
            </p>
            <button
              className="px-6 py-3 rounded-lg text-white font-medium transition-transform hover:scale-105"
              style={{ backgroundColor: themes.find(t => t.name === theme)?.primary }}
            >
              ابدأ الآن
            </button>
          </div>

          <div className={`${cardClass} mt-6`}>
            <h2 className={`text-2xl font-bold mb-4 ${textClass}`}>المميزات</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full mb-3 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: themes.find(t => t.name === theme)?.primary }}
                  >
                    {i}
                  </div>
                  <h3 className={`font-semibold mb-2 ${textClass}`}>ميزة {i}</h3>
                  <p className={`text-sm ${textMutedClass}`}>
                    وصف تفصيلي للميزة رقم {i}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleSwitcher;