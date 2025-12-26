import React, { useEffect } from 'react';
import { X } from 'lucide-react';

function ChatWidget({ isOpen, onClose, service }) {
  useEffect(() => {
    // Load Chatwoot script only once
    if (!window.chatwootSDK && isOpen) {
      window.chatwootSettings = {
        position: "right",
        type: "standard",
        launcherTitle: "Chat with us"
      };

      const BASE_URL = "https://chatwoot.pro-shazmlc.cloud";
      const script = document.createElement('script');
      script.src = BASE_URL + "/packs/js/sdk.js";
      script.async = true;
      
      script.onload = function() {
        window.chatwootSDK.run({
          websiteToken: 'q3fHEnngXuLtAXyHaLBnnw4h',
          baseUrl: BASE_URL
        });
        
        // Open immediately after initialization
        setTimeout(() => {
          if (window.$chatwoot) {
            window.$chatwoot.toggle('open');
          }
        }, 500);
      };
      
      document.body.appendChild(script);
    }
  }, [isOpen]);

  useEffect(() => {
    // Control Chatwoot visibility
    if (window.$chatwoot) {
      if (isOpen) {
        window.$chatwoot.toggle('open');
        
        // Style the Chatwoot widget to appear centered
        const chatwootWidget = document.querySelector('.woot-widget-holder');
        if (chatwootWidget) {
          chatwootWidget.style.cssText = `
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            right: auto !important;
            bottom: auto !important;
            z-index: 9999 !important;
          `;
        }
      } else {
        window.$chatwoot.toggle('close');
      }
    }
  }, [isOpen]);

  // Add backdrop when chat is open
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[9998] bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Close button overlay */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[10000] bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        <X className="w-6 h-6 text-gray-700" />
      </button>
    </>
  );
}

export default ChatWidget;