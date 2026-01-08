import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Banner({ title, breadcrumbs, backgroundImage }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative pt-[10%] h-[50vh] w-full overflow-hidden">
       <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage || `url('https://shazmlc.com/book-service/images/ahmed.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          {title || t('banner.ourCategories')}
        </h1>

        <div className="flex items-center gap-2 text-lg">
           <span
            onClick={() => navigate(-1)}
            className="hover:text-yellow-400 transition-colors cursor-pointer"
          >
            {breadcrumbs?.home || t('common.home')}
          </span>

          <span className="text-yellow-400">≫</span>

          <span className="text-yellow-400">
            {breadcrumbs?.current || t('banner.subServices')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Banner;
