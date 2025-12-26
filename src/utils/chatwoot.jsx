// import React, { useEffect } from 'react';
// import { X } from 'lucide-react';

// function ChatWidget({ isOpen, onClose, service }) {
//   useEffect(() => {
//     if (!window.chatwootSDK) {
//       window.chatwootSettings = {
//         position: "right",
//         type: "standard",
//         launcherTitle: "Chat with us",
//         hideMessageBubble: true
//       };

//       const BASE_URL = "https://chatwoot.pro-shazmlc.cloud";
//       const script = document.createElement('script');
//       script.src = BASE_URL + "/packs/js/sdk.js";
//       script.async = true;
      
//       script.onload = function() {
//         window.chatwootSDK.run({
//           websiteToken: 'q3fHEnngXuLtAXyHaLBnnw4h',
//           baseUrl: BASE_URL
//         });
        
//         setTimeout(() => {
//           const chatwootWidget = document.querySelector('.woot-widget-holder');
//           const chatwootBubble = document.querySelector('.woot-widget-bubble');
          
//           if (chatwootWidget) {
//             chatwootWidget.style.display = 'none';
//           }
//           if (chatwootBubble) {
//             chatwootBubble.style.display = 'none';
//           }
//         }, 100);
//       };
      
//       document.body.appendChild(script);
//     } else {
//       const chatwootWidget = document.querySelector('.woot-widget-holder');
//       const chatwootBubble = document.querySelector('.woot-widget-bubble');
      
//       if (chatwootWidget) {
//         chatwootWidget.style.display = 'none';
//       }
//       if (chatwootBubble) {
//         chatwootBubble.style.display = 'none';
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (window.$chatwoot) {
//       const chatwootWidget = document.querySelector('.woot-widget-holder');
//       const chatwootBubble = document.querySelector('.woot-widget-bubble');
      
//       if (isOpen) {
//         if (chatwootWidget) {
//           chatwootWidget.style.display = 'block';
//         }
        
//         window.$chatwoot.toggle('open');
        
//         if (chatwootBubble) {
//           chatwootBubble.style.display = 'none';
//         }
        
//         if (chatwootWidget) {
//           const styles = [
//             'display: block !important',
//             'position: fixed !important',
//             'top: 50% !important',
//             'left: 50% !important',
//             'transform: translate(-50%, -50%) !important',
//             'right: auto !important',
//             'bottom: auto !important',
//             'z-index: 9999 !important',
//             'max-width: 90vw !important',
//             'max-height: 90vh !important'
//           ];
//           chatwootWidget.style.cssText = styles.join('; ');
//         }
//       } else {
//         window.$chatwoot.toggle('close');
        
//         if (chatwootWidget) {
//           chatwootWidget.style.display = 'none';
//         }
//         if (chatwootBubble) {
//           chatwootBubble.style.display = 'none';
//         }
//       }
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <>
//       <div 
//         className="fixed inset-0 z-[9998] bg-black bg-opacity-50 backdrop-blur-sm"
//         onClick={onClose}
//       />
      
//       <button
//         onClick={onClose}
//         className="fixed top-4 right-4 z-[10000] bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
//         aria-label="Close chat"
//       >
//         <X className="w-6 h-6 text-gray-700" />
//       </button>
//     </>
//   );
// }

// export default ChatWidget;

import React, { useEffect } from 'react';

function ChatWidget({ isOpen, onClose, service }) {
  useEffect(() => {
    if (!window.chatwootSDK) {
      window.chatwootSettings = {
        position: "right",
        type: "standard",
        launcherTitle: "Chat with us",
        hideMessageBubble: true
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
        
        setTimeout(() => {
          const chatwootWidget = document.querySelector('.woot-widget-holder');
          const chatwootBubble = document.querySelector('.woot-widget-bubble');
          
          if (chatwootWidget) {
            chatwootWidget.style.display = 'none';
          }
          if (chatwootBubble) {
            chatwootBubble.style.display = 'none';
          }
        }, 100);
      };
      
      document.body.appendChild(script);
    } else {
      const chatwootWidget = document.querySelector('.woot-widget-holder');
      const chatwootBubble = document.querySelector('.woot-widget-bubble');
      
      if (chatwootWidget) {
        chatwootWidget.style.display = 'none';
      }
      if (chatwootBubble) {
        chatwootBubble.style.display = 'none';
      }
    }
  }, []);

  useEffect(() => {
    if (window.$chatwoot) {
      const chatwootWidget = document.querySelector('.woot-widget-holder');
      const chatwootBubble = document.querySelector('.woot-widget-bubble');
      
      if (isOpen) {
         if (chatwootWidget) {
          chatwootWidget.style.display = 'block';
          
          const styles = [
            'display: block !important',
            'position: fixed !important',
            'top: 50% !important',
            'left: 50% !important',
            'transform: translate(-50%, -50%) !important',
            'right: auto !important',
            'bottom: auto !important',
            'z-index: 9999 !important',
            'max-width: 500px !important',
            'max-height: 600px !important',
            'width: 100% !important',
            'height: 600px !important'
          ];
          chatwootWidget.style.cssText = styles.join('; ');
        }
        
         window.$chatwoot.toggle('open');
        
         if (chatwootBubble) {
          chatwootBubble.style.display = 'none';
        }
        
      } else {
         if (chatwootWidget) {
          chatwootWidget.style.display = 'none';
        }
        if (chatwootBubble) {
          chatwootBubble.style.display = 'none';
        }
        
        
      }
    }
  }, [isOpen]);

   useEffect(() => {
    const handleClickOutside = (e) => {
      const chatwootWidget = document.querySelector('.woot-widget-holder');
      if (chatwootWidget && 
          isOpen && 
          !chatwootWidget.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return null;
}

export default ChatWidget;