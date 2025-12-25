import React, { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';

const StyleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState('orange');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [glassEffect, setGlassEffect] = useState(false);

  // Theme colors configuration
  const colors = [
    { id: 'color-1', name: 'Orange', value: 'hsl(36, 80%, 50%)', bg: 'bg-orange-500' },
    { id: 'color-2', name: 'Blue', value: 'hsl(217, 91%, 60%)', bg: 'bg-blue-500' },
    { id: 'color-3', name: 'Green', value: 'hsl(142, 71%, 45%)', bg: 'bg-green-500' },
    { id: 'color-4', name: 'Purple', value: 'hsl(271, 76%, 53%)', bg: 'bg-purple-500' },
    { id: 'color-5', name: 'Pink', value: 'hsl(340, 82%, 52%)', bg: 'bg-pink-500' }
  ];

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem('color') || 'color-1';
    const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
    const savedGlassEffect = localStorage.getItem('glass-effect') === 'true';

    setActiveColor(savedColor);
    setIsDarkMode(savedDarkMode);
    setGlassEffect(savedGlassEffect);
  }, []);

  // Update CSS variables when color changes
  useEffect(() => {
    const colorObj = colors.find(c => c.id === activeColor);
    if (colorObj) {
      document.documentElement.style.setProperty('--primary-color', colorObj.value);
    }
  }, [activeColor]);

  // Handle color change
  const handleColorChange = (colorId) => {
    setActiveColor(colorId);
    localStorage.setItem('color', colorId);
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('dark-mode', newDarkMode);
  };

  // Handle glass effect toggle
  const handleGlassEffectToggle = () => {
    const newGlassEffect = !glassEffect;
    setGlassEffect(newGlassEffect);
    localStorage.setItem('glass-effect', newGlassEffect);
  };

  return (
    <>
      {/* Main Content Area */}
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        
        {/* Demo Card */}
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className={`
            max-w-2xl w-full p-8 rounded-2xl
            ${glassEffect 
              ? 'backdrop-blur-lg bg-white/10 border border-white/20' 
              : isDarkMode 
                ? 'bg-gray-800' 
                : 'bg-white'
            }
            ${!glassEffect && 'shadow-2xl'}
            transition-all duration-300
          `}>
            <h1 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ancient Egyptian Civilization
            </h1>
            <p className={`text-lg mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Experience the beauty of modern design with customizable themes, dark mode, and stunning glass effects.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`
                    p-6 rounded-xl
                    ${glassEffect 
                      ? 'backdrop-blur-md bg-white/5 border border-white/10' 
                      : isDarkMode 
                        ? 'bg-gray-700' 
                        : 'bg-gray-50'
                    }
                    transition-all duration-300
                  `}
                >
                  <div 
                    className="w-12 h-12 rounded-full mb-4"
                    style={{ backgroundColor: 'var(--primary-color, hsl(36, 80%, 50%))' }}
                  />
                  <h3 className={`font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Feature {item}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    This is a demo card showcasing the theme effects
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Style Switcher Panel */}
      <div className={`
        fixed top-0 transition-all duration-300 z-50
        ${isOpen ? 'right-0' : '-right-64'}
      `}>
        <div className={`
          w-64 h-screen p-6
          ${glassEffect 
            ? 'backdrop-blur-xl bg-white/10 border-l border-white/20' 
            : isDarkMode 
              ? 'bg-gray-800' 
              : 'bg-white'
          }
          shadow-2xl
        `}>
          {/* Header */}
          <h3 className={`text-xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Style Switcher
          </h3>

          {/* Theme Colors */}
          <div className="mb-6">
            <p className={`text-sm mb-3 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Theme Colors
            </p>
            <div className="flex gap-3 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color.id)}
                  className={`
                    w-10 h-10 rounded-full transition-all duration-300
                    ${color.bg}
                    ${activeColor === color.id 
                      ? 'ring-4 ring-offset-2 ring-gray-400 scale-110' 
                      : 'hover:scale-105'
                    }
                  `}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="mb-6">
            <label className="flex items-center justify-between cursor-pointer">
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Dark Mode
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={handleDarkModeToggle}
                  className="sr-only"
                />
                <div
                  onClick={handleDarkModeToggle}
                  className={`
                    w-14 h-8 rounded-full transition-colors duration-300
                    ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'}
                  `}
                >
                  <div className={`
                    w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300
                    absolute top-1
                    ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}
                  `} />
                </div>
              </div>
            </label>
          </div>

          {/* Glass Effect Toggle */}
          <div className="mb-6">
            <label className="flex items-center justify-between cursor-pointer">
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Glass Effect
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={glassEffect}
                  onChange={handleGlassEffectToggle}
                  className="sr-only"
                />
                <div
                  onClick={handleGlassEffectToggle}
                  className={`
                    w-14 h-8 rounded-full transition-colors duration-300
                    ${glassEffect ? 'bg-purple-500' : 'bg-gray-300'}
                  `}
                >
                  <div className={`
                    w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300
                    absolute top-1
                    ${glassEffect ? 'translate-x-7' : 'translate-x-1'}
                  `} />
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-6 right-6 z-50
          w-12 h-12 rounded-full
          flex items-center justify-center
          transition-all duration-300
          ${glassEffect 
            ? 'backdrop-blur-xl bg-white/20 border border-white/30' 
            : isDarkMode 
              ? 'bg-gray-800' 
              : 'bg-white'
          }
          shadow-lg hover:scale-110
        `}
        style={{ 
          backgroundColor: glassEffect ? undefined : 'var(--primary-color, hsl(36, 80%, 50%))'
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Settings className="w-6 h-6 text-white" />
        )}
      </button>
    </>
  );
};

export default StyleSwitcher;