

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import CategoriesModal from './CategoriesModal';
// import ChatWidget from '../utils/chatwoot';
// import { useTranslation } from 'react-i18next';

// function CardDetails({ link, btn, service, disableModal = false }) {
//   const { t } = useTranslation();
//   const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   if (!service) return null;

//   return (
//     <div className="relative group bg-white p-4 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-full max-w-2xl">
      
//       {/* Image */}
//       <div className="w-full max-w-2xl overflow-hidden relative rounded-xl h-80">
//         <img
//           src={service.image || 'https://shazmlc.com/book-service/images/ahmed.jpg'}
//           alt={service.title || 'Service'}
//           className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
//           onError={(e) => { e.target.src = 'https://shazmlc.com/book-service/images/ahmed.jpg'; }}
//         /> 

//         {/* Open Categories Button */}
//         {!disableModal && service.subservices?.length > 0 && (
//           <button
//             onClick={() => setIsCategoriesOpen(true)}
//             className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl text-white text-lg font-bold cursor-pointer"
//           >
//             {t('services.subServices')} ({service.subservices.length})
//           </button>
//         )}
//       </div>

//       {/* Info */}
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-2 text-gray-900 line-clamp-2">{service.title}</h2>
//         <p className="text-black text-xl mb-4 line-clamp-3">{service.description}</p>

//         <div className="flex gap-3 w-full">
//           <button
//             onClick={() => setIsChatOpen(true)}
//             className="w-full px-4 py-2 border border-[#0d8d82] text-[#0d8d82] rounded-lg font-medium hover:text-[#fff] hover:bg-[#0d8d82] transition"
//           >
//             {t('common.chat')}
//           </button>

//           <Link to={link} state={{ serviceId: service.id, service }} className="w-full">
//             <button className="w-full px-4 py-2 bg-[#0d8d82] text-white rounded-lg font-medium hover:bg-[#096d63] transition">
//               {btn}
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Categories Modal */}
//       {!disableModal && service.subservices?.length > 0 && (
//         <CategoriesModal
//           isOpen={isCategoriesOpen}
//           onClose={() => setIsCategoriesOpen(false)}
//           service={service}
//         />
//       )}

//       {/* Chat Widget */}
//       <ChatWidget
//         isOpen={isChatOpen}
//         onClose={() => setIsChatOpen(false)}
//         service={{ ...service, chatToken: 'rpVangi8xrXgUAg7t8puLwtz' }}
//       />
//     </div>
//   );
// }

// export default CardDetails;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import CategoriesModal from './CategoriesModal';
import ChatWidget from '../utils/chatwoot';
import { useTranslation } from 'react-i18next';

function CardDetails({ link, btn, service, disableModal = false }) {
  const { t } = useTranslation();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!service) return null;

  return (
    <div className="group relative w-full max-w-3xl rounded-[28px] overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500">

      {/* IMAGE */}
      <div className="relative h-[340px] overflow-hidden">
        <img
          src={service.image || 'https://shazmlc.com/book-service/images/ahmed.jpg'}
          alt={service.title}
          className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://shazmlc.com/book-service/images/ahmed.jpg';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Subservices Badge */}
        {!disableModal && service.subservices?.length > 0 && (
          <button
            onClick={() => setIsCategoriesOpen(true)}
            className="absolute top-5 right-5 backdrop-blur-xl bg-white/90 text-gray-900 px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg hover:bg-[#0d8d82] hover:text-white transition"
          >
            <Sparkles className="inline w-4 h-4 mr-1" />
            {service.subservices.length} {t('services.subServices')}
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-8 space-y-4">
        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight line-clamp-2">
          {service.title}
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed line-clamp-3">
          {service.description}
        </p>

        {/* ACTIONS */}
        
        <div className="flex gap-3 w-full">
        <button
            onClick={() => setIsChatOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#0d8d82] text-[#0d8d82] font-semibold hover:bg-[#0d8d82] hover:text-white transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            {t('common.chat')}
          </button>
          <Link to={link} state={{ serviceId: service.id, service }} className="w-full">
          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0d8d82] to-[#12b3a6] text-white font-bold hover:scale-[1.02] transition-all duration-300 shadow-lg">
              {btn}
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
        
      </div>

      {/* Categories Modal */}
      {!disableModal && service.subservices?.length > 0 && (
        <CategoriesModal
          isOpen={isCategoriesOpen}
          onClose={() => setIsCategoriesOpen(false)}
          service={service}
        />
      )}

      {/* Chat Widget */}
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        service={{ ...service, chatToken: 'rpVangi8xrXgUAg7t8puLwtz' }}
      />
    </div>
  );
}

export default CardDetails;
