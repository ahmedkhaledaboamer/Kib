// import React, { useState, useEffect, useRef } from 'react';
// import { X, MessageCircle } from 'lucide-react';
// import CardDetails from './CardDetails';
// import ChatWidget from '../utils/chatwoot';
// import { useTranslation } from 'react-i18next';

// function CategoriesModal({ isOpen, onClose, service }) {
//   const { t } = useTranslation();
//   const subservices = service?.subservices || [];
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const modalRef = useRef(null);

//   // Close modal on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         onClose();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
//       <div
//         ref={modalRef}
//         className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
//       >
//         {/* Header */}
//         <div className="flex-shrink-0 p-6 border-b border-gray-200 flex items-center justify-between">
//           <h2 className="text-3xl font-bold text-gray-900">
//             {service?.title} 
//           </h2>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setIsChatOpen(true)}
//               className="p-3 bg-[#0d8d82] text-white rounded-full font-medium hover:bg-[#096d63]  hover:text-[#fff] transition"
//             >
//               <MessageCircle />
//             </button>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-[#0d8d82]" />
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {subservices.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//               {subservices.map((subservice) => (
//                 <CardDetails
//                   key={subservice.id}
//                   link="/book"
//                   btn={t('common.bookNow')}
//                   service={subservice}
//                   disableModal={true} 
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center text-gray-500 py-12">{t('services.noCategories')}</div>
//           )}
//         </div>
//       </div>

//       {/* Chat Widget */}
//       <ChatWidget
//         isOpen={isChatOpen}
//         onClose={() => setIsChatOpen(false)}
//         service={service}
//       />
//     </div>
//   );
// }

// export default CategoriesModal;
import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle } from 'lucide-react';
import CardDetails from './CardDetails';
import { useTranslation } from 'react-i18next';

function CategoriesModal({ isOpen, onClose, service }) {
  const { t } = useTranslation();
  const subservices = service?.subservices || [];
  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // فتح الشات العام
  const handleChatClick = () => {
    if (window.$chatwoot) {
      window.$chatwoot.toggle('open');
    } 
    else if (window.openChatwootChat) {
      window.openChatwootChat();
    }
    else if (window.chatwootSDK) {
      window.chatwootSDK.toggle();
    }
    else {
      alert(t('chat.loadingMessage', "الرجاء الانتظار، جاري تحميل الدردشة..."));
      setTimeout(() => window.$chatwoot?.toggle('open'), 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex-shrink-0 p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            {service?.title} 
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleChatClick}
              className="p-3 bg-[#0d8d82] text-white rounded-full font-medium hover:bg-[#096d63] hover:text-[#fff] transition"
            >
              <MessageCircle />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-[#0d8d82]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {subservices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {subservices.map((subservice) => (
                <CardDetails
                  key={subservice.id}
                  link="/book"
                  btn={t('common.bookNow')}
                  service={subservice}
                  disableModal={true} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">{t('services.noCategories')}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoriesModal;