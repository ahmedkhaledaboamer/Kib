// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {  Undo2 } from 'lucide-react';
// import ServiceModal from './ServiceModal';

// function CardDetails({ link, btn, service }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isServicesPage = location.pathname === '/services';
//   const [isOpen, setIsOpen] = useState(false);

//    if (!service) {
//     return null;
//   }

//   return (
//     <div className="relative group bg-white p-4 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      
//       <div className="w-full overflow-hidden relative rounded-xl h-80">
//         {!isServicesPage && (
//           <button
//             onClick={() => navigate(-1)}
//             className="absolute top-3 left-3 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
//           >
//              <Undo2 className="w-5 h-5 text-[#2f6fb2]"  />
//           </button>
//         )}

//         <img
//           src={service.image || '/images/ahmed.jpg'}
//           alt={service.title || 'Service'}
//           className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
//           onError={(e) => {
//             e.target.src = '/images/ahmed.jpg';  
//           }}
//         />

//         {isServicesPage && service.subservices?.length > 0 && (
//           <Link
//             to={`/categories?serviceId=${service.id}`}
//             className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl text-white text-lg font-bold"
//           >
//             Categories ({service.subservices.length})
//           </Link>
//         )}
//       </div>

//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-2 text-gray-900 line-clamp-2">
//           {service.title}
//         </h2>

//         <p className="text-black text-xl mb-4 line-clamp-3">
//           {service.description}
//         </p>

//         <div className="flex gap-3 w-full">
//           {isServicesPage && (
//             <button
//               onClick={() => setIsOpen(true)}
//               className="w-full px-4 py-2 border border-[#2f6fb2] text-[#2f6fb2] rounded-lg font-medium hover:bg-blue-50 transition"
//             >
//               Chat
//             </button>
//           )}
//           {!isServicesPage && (
//             <button
//               onClick={() => setIsOpen(true)}
//               className="w-full px-4 py-2 border border-[#2f6fb2] text-[#2f6fb2] rounded-lg font-medium hover:bg-blue-50 transition"
//             >
//               Read More
//             </button>
//           )}
//           <Link
//             to={link}
//             state={{ serviceId: service.id, service: service }}
//             className="w-full"
//           >
//             <button className="w-full px-4 py-2 bg-[#2f6fb2] text-white rounded-lg font-medium hover:bg-blue-700 transition">
//               {btn}
//             </button>
//           </Link>
//         </div>
//       </div>

//       <ServiceModal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         service={service}
//       />
//     </div>
//   );
// }

// export default CardDetails;









import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Undo2 } from 'lucide-react';
import ServiceModal from './ServiceModal';
import CategoriesModal from './CategoriesModal';
import ChatWidget from '../utils/chatwoot';
 
function CardDetails({ link, btn, service,id }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isServicesPage = location.pathname === '/services';
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!service) {
    return null;
  }

  const hasCategories = service.subservices?.length > 0;

  return (
    <div className="relative group bg-white p-4 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-full max-w-2xl" >
      
      <div className="w-full max-w-2xl overflow-hidden relative rounded-xl h-80">
        {!isServicesPage && (
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 left-3 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <Undo2 className="w-5 h-5 text-[#2f6fb2]" />
          </button>
        )}

        <img
          src={service.image || '/images/ahmed.jpg'}
          alt={service.title || 'Service'}
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = '/images/ahmed.jpg';
          }}
        />

        {isServicesPage && hasCategories && (
          <button
            onClick={() => setIsCategoriesOpen(true)}
            className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl text-white text-lg font-bold cursor-pointer"
          >
            Sub Services ({service.subservices.length})
          </button>
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
              onClick={() => setIsChatOpen(true)}
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

      <CategoriesModal
        isOpen={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
        service={service}
      />

    <ChatWidget
  isOpen={isChatOpen}
  onClose={() => setIsChatOpen(false)}
  service={{ ...service, chatToken: "rpVangi8xrXgUAg7t8puLwtz" }}
/>
    </div>
  );
}

export default CardDetails;