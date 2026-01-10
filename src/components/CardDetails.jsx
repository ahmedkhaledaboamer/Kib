import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import CategoriesModal from './CategoriesModal';
import { useTranslation } from 'react-i18next';

function CardDetails({ link, btn, service, disableModal = false }) {
  const { t, i18n } = useTranslation();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  if (!service) return null;

  const openSubServices = () => {
    if (!disableModal && service.subservices?.length > 0) {
      setIsCategoriesOpen(true);
    }
  };

  const handleChatClick = () => {
    if (window.$chatwoot) {
      window.$chatwoot.toggle('open');
    } else if (window.openChatwootChat) {
      window.openChatwootChat();
    } else {
      setTimeout(() => window.$chatwoot?.toggle('open'), 1000);
    }
  };

  return (
    <div className="
      group relative w-full 
      max-w-3xl 
      xl1366:max-w-2xl    
      xl2:max-w-4xl       
      uw:max-w-5xl         
      h-full 
      rounded-[28px] 
      overflow-hidden 
      bg-white 
      shadow-[0_10px_40px_rgba(0,0,0,0.08)] 
      hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] 
      transition-all duration-500 
      flex flex-col
    ">
      
      {/* IMAGE */}
      <div
        onClick={openSubServices}
        className={`
          relative 
          h-48            
          xl1366:h-48     
          lg:h-72         
          xl2:h-80
          uw:h-[28rem]
          overflow-hidden 
          ${!disableModal && service.subservices?.length > 0 ? 'cursor-pointer' : ''}
        `}
      >
        <img
          src={service.image || 'https://shazmlc.com/book-service/images/ahmed.jpg'}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => { e.target.src = 'https://shazmlc.com/book-service/images/ahmed.jpg'; }}
        />

        {/* CUSTOM OVERLAY COLOR */}
        <div className="absolute inset-0 group-hover:bg-[#000]/40 transition" />

        {/* BADGE */}
        {!disableModal && service.subservices?.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCategoriesOpen(true);
            }}
            className="absolute top-5 end-5 backdrop-blur-xl bg-white/90 text-gray-900 px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg hover:bg-[#0e9185] hover:text-white transition"
          >
            <Sparkles className="inline w-4 h-4 me-1" />
            {service.subservices.length} {t('services.subServices')}
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 lg:p-8 xl2:p-9 uw:p-10 flex flex-col flex-1">
        <div className="space-y-3">
          <h2 className="
            text-lg               
            xl1366:text-lg       
            lg:text-2xl          
            xl2:text-3xl          
            uw:text-4xl          
            font-extrabold 
            text-gray-900 
            leading-tight 
            line-clamp-2
          ">
            {service.title}
          </h2>

          <p className="
            text-sm               
            xl1366:text-sm        
            lg:text-base          
            xl2:text-lg           
            uw:text-xl            
            text-gray-600 
            leading-relaxed 
            line-clamp-3
          ">
            {service.description}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 w-full mt-auto pt-6">
          <button
            onClick={handleChatClick}
            className="
              flex-1 flex items-center justify-center gap-2 
              px-4 py-2 xl1366:px-4 xl1366:py-2   
              lg:px-6 lg:py-3 
              uw:px-8 uw:py-4 
              rounded-xl 
              border border-[#0d8d82] 
              text-[#0d8d82] 
              font-semibold 
              hover:bg-[#0d8d82] hover:text-white 
              transition-all duration-300 
              text-sm xl1366:text-sm lg:text-base uw:text-lg
            "
          >
            <MessageCircle className="w-5 h-5" />
            {t('common.chat')}
          </button>

          <Link to={link} state={{ serviceId: service.id, service }} className="w-full">
            <button className="
              w-full flex items-center justify-center gap-2 
              px-4 py-2 xl1366:px-4 xl1366:py-2    
              lg:px-6 lg:py-3 
              uw:px-8 uw:py-4 
              rounded-xl 
              bg-gradient-to-r from-[#0d8d82] to-[#12b3a6] 
              text-white font-bold 
              hover:scale-[1.02] lg:hover:scale-[1.03] uw:hover:scale-[1.04] 
              transition-all duration-300 shadow-lg 
              text-sm xl1366:text-sm lg:text-base uw:text-lg
            ">
              {btn}
              {i18n.language === 'ar' ? (
                <ArrowLeft className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </Link>
        </div>
      </div>

      {/* MODALS */}
      {!disableModal && service.subservices?.length > 0 && (
        <CategoriesModal
          isOpen={isCategoriesOpen}
          onClose={() => setIsCategoriesOpen(false)}
          service={service}
        />
      )}
    </div>
  );
}

export default CardDetails;
