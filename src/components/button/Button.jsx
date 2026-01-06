import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const Button = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`
        fixed bottom-5 w-11 h-11 bg-[#0d8d82] text-white rounded 
        cursor-pointer transition-all duration-500 ease-in-out
        flex items-center justify-center z-[99999]
        ${isVisible ? 'opacity-100 left-5 pointer-events-auto' : 'opacity-0 left-0 pointer-events-none'}
        hover:bg-[#0d8d82] active:scale-95
      `}
      onClick={scrollToTop}
    >
      <ArrowUp className="w-5 h-5" />
    </div>
  );
};

export default Button;