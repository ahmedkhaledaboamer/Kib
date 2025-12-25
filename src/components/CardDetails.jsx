import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ServiceModal from './ServiceModal';

function CardDetails({ link, btn, service }) {
  const location = useLocation();
  const isServicesPage = location.pathname === '/services';
  const [isOpen, setIsOpen] = useState(false);

   if (!service) {
    return null;
  }

  return (
    <div className="relative group bg-white p-4 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      
      <div className="w-full overflow-hidden relative rounded-xl h-80">
        <img
          src={service.image || '/images/ahmed.jpg'}
          alt={service.title || 'Service'}
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = '/images/ahmed.jpg';  
          }}
        />

        {isServicesPage && service.subservices?.length > 0 && (
          <Link
            to={`/categories?serviceId=${service.id}`}
            className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl text-white text-lg font-bold"
          >
            Categories ({service.subservices.length})
          </Link>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 line-clamp-2">
          {service.title}
        </h2>

        <p className="text-black text-xl mb-4 line-clamp-3">
          {service.description}
        </p>

        <div className="flex gap-3 w-full">
          {isServicesPage && (
            <button
              onClick={() => setIsOpen(true)}
              className="w-full px-4 py-2 border border-[#2f6fb2] text-[#2f6fb2] rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Chat
            </button>
          )}
 {!isServicesPage && (
            <button
              onClick={() => setIsOpen(true)}
              className="w-full px-4 py-2 border border-[#2f6fb2] text-[#2f6fb2] rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Read More
            </button>
          )}
          <Link
            to={link}
            state={{ serviceId: service.id, service: service }}
            className="w-full"
          >
            <button className="w-full px-4 py-2 bg-[#2f6fb2] text-white rounded-lg font-medium hover:bg-blue-700 transition">
              {btn}
            </button>
          </Link>
        </div>
      </div>

      <ServiceModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        service={service}
      />
    </div>
  );
}

export default CardDetails;