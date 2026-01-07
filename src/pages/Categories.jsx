import React, { useState } from 'react';
 import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft } from 'lucide-react';
import CardDetails from '../components/CardDetails';
import { useTranslation } from 'react-i18next';

function Categories() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Get current language from URL
  const lang = location.pathname.split("/")[1] || "en";

  const searchParams = new URLSearchParams(location.search);
  const serviceId = searchParams.get('serviceId');

  const services = useSelector((state) => state.services.services);

  const servicesList = Array.isArray(services) ? services : services ? [services] : [];
  const selectedService = servicesList.find(service => service.id === serviceId);
  const subservices = selectedService?.subservices || [];

  return (
    <div>
       

      <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-[#2f6fb2] transition-colors" />
            <span className="text-gray-700 font-medium group-hover:text-[#2f6fb2] transition-colors">
              {t('common.back')}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
          {subservices.length > 0 ? (
            subservices.map((subservice) => (
              <CardDetails 
                key={subservice.id} 
                link={`/${lang}/book`}
                btn={t('common.bookNow')}
                id={subservice.id}
                service={subservice}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">{t('services.noCategories')}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
