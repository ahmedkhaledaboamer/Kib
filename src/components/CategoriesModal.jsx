import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import CardDetails from './CardDetails';
import ChatWidget from '../utils/chatwoot';

function CategoriesModal({ isOpen, onClose, service }) {
  if (!isOpen) return null;

  const subservices = service?.subservices || [];
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6 text-[#2f6fb2]" />
        </button>

        {/* Header */}
        <div className="flex-shrink-0 p-6 border-b border-gray-200">
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              {service?.title} - Categories
            </h2>

            <button
              onClick={() => setIsChatOpen(true)}
              className="p-3 bg-[#2f6fb2] text-white rounded-full font-medium hover:bg-blue-50 hover:text-[#2f6fb2] transition"
            >
              <MessageCircle />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {subservices.length > 0 ? (
              subservices.map((subservice) => (
                <CardDetails
                  key={subservice.id}
                  link="/book"
                  btn="Book Now"
                  id={subservice.id}
                  service={subservice}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                No categories available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        service={service}
      />
    </div>
  );
}

export default CategoriesModal;
