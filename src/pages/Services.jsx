

// import React, { useEffect, useRef, useState } from 'react';
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { createServiceBooking, getServices } from "../store/servicesSlice";
// import Banner from "../components/Banner";
// import CardDetails from "../components/CardDetails";
// import { useTranslation } from 'react-i18next';
// import Pagination from '../components/Pagination/Pagination';
 
// const Services = () => {
//   const { t } = useTranslation();
//   const services = useSelector((state) => state.services.services);
//   const booking = useSelector((state) => state.services.booking);
//   const dispatch = useDispatch();

//   const location = useLocation();
//   const navigate = useNavigate();
//   const hasSent = useRef(false);

//   //   Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 12;  

//   // Get current language from URL
//   const lang = location.pathname.split("/")[1] || "en";

//   // Fetch services
//   useEffect(() => {
//     dispatch(getServices());
//   }, [dispatch]);

//   // Show toast when booking updates
//   useEffect(() => {
//     if (booking && booking.length > 0) {
//       toast.success(booking[0].message);
//     }
//   }, [booking]);

//   // Handle booking from URL/session
//   useEffect(() => {
//     if (hasSent.current) return;

//     const params = new URLSearchParams(location.search);
//     const sessionId = params.get("session_id");

//     if (!sessionId) {
//       const storedData = localStorage.getItem("user");
//       if (storedData) {
//         const user = JSON.parse(storedData);
//         const dataToSend = {
//           ...user,
//           isPaid: true,
//           session_id: sessionId,
//         };

//         dispatch(createServiceBooking(dataToSend));
//         localStorage.setItem("user", JSON.stringify(dataToSend));

//         hasSent.current = true;

//         navigate(`/${lang}`);
//       }
//     }
//   }, [location.search, dispatch, navigate, lang]);

//   const servicesList = Array.isArray(services) ? services : services ? [services] : [];

//    const totalPages = Math.ceil(servicesList.length / itemsPerPage);
  
//    const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentServices = servicesList.slice(startIndex, endIndex);

//    const handlePageChange = (page) => {
//     setCurrentPage(page);
//      window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//    useEffect(() => {
//     setCurrentPage(1);
//   }, [servicesList.length]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Banner 
//         title={t('services.ourServices')}
//         breadcrumbs={{ home: t('common.home'), current: t('services.ourServices') }}
//         backgroundImage="url('https://shazmlc.com/book-service/images/ahmed.jpg')"
//       />

//       <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-12">
//         {servicesList.length > 0 ? (
//           <>
             

//              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
//               {currentServices.map((service) => (
//                 <CardDetails 
//                   key={service.id} 
//                   btn={t('common.booking')} 
//                   id={service.id}  
//                   link={`/${lang}/book`} 
//                   service={service}
//                 />
//               ))}
//             </div>

//             {/* Pagination */}
//             {servicesList.length > itemsPerPage && (
//               <div className="mt-12">
//                 <Pagination 
//                   totalPages={totalPages}
//                   currentPage={currentPage}
//                   onPageChange={handlePageChange}
//                 />
//               </div>
//             )}
//           </>
//         ) : (
//           <p className="col-span-full text-center text-gray-500">{t('services.loadingServices')}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Services;


import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createServiceBooking, getServices } from "../store/servicesSlice";
import Banner from "../components/Banner";
import CardDetails from "../components/CardDetails";
import { useTranslation } from 'react-i18next';
import Pagination from '../components/Pagination/Pagination';

const Services = () => {
  const { t } = useTranslation();
  const services = useSelector((state) => state.services.services);
  const booking = useSelector((state) => state.services.booking);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const hasSent = useRef(false);

  // States for search and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Get current language from URL
  const lang = location.pathname.split("/")[1] || "en";

  // Fetch services
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  // Show toast when booking updates
  useEffect(() => {
    if (booking && booking.length > 0) {
      toast.success(booking[0].message);
    }
  }, [booking]);

  // Handle booking from URL/session
  useEffect(() => {
    if (hasSent.current) return;

    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      const storedData = localStorage.getItem("user");
      if (storedData) {
        const user = JSON.parse(storedData);
        const dataToSend = {
          ...user,
          isPaid: true,
          session_id: sessionId,
        };

        dispatch(createServiceBooking(dataToSend));
        localStorage.setItem("user", JSON.stringify(dataToSend));

        hasSent.current = true;

        navigate(`/${lang}`);
      }
    }
  }, [location.search, dispatch, navigate, lang]);

  // Filter services based on search term
  const filteredServices = Array.isArray(services) 
    ? services.filter(service => 
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Pagination calculations
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when services or search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredServices.length, searchTerm]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch(searchTerm.trim());
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Banner 
        title={t('services.ourServices')}
        breadcrumbs={{ home: t('common.home'), current: t('services.ourServices') }}
        backgroundImage="url('https://shazmlc.com/book-service/images/ahmed.jpg')"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-12">
        {Array.isArray(services) && services.length > 0 ? (
          <>
            {/* Search Input */}
            <div className="mb-8 max-w-2xl mx-auto">
              <div className='flex items-center justify-center gap-4 '>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('services.searchPlaceholder')+"..." || "Search services by title..."}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-3 pl-12 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0d8d82] focus:border-transparent shadow-sm"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                )}
              </div>
              <button className="  px-6 py-3 bg-[#0d8d82] text-white rounded-lg font-medium hover:bg-[#096d63] transition" onClick={handleSearchSubmit}>
              {t('services.searchPlaceholder')}
            </button>
              </div>
             
              
              {/* Search results count */}
              {searchTerm && (
                <div className="mt-2 text-center text-sm text-gray-600">
                  {filteredServices.length === 0 ? (
                    <span>{t('services.noResults') || "No services found matching your search."}</span>
                  ) : (
                    " "
                  )}
                </div>
              )}
            </div>

            {/* Services Grid */}
            {filteredServices.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
                  {currentServices.map((service) => (
                    <CardDetails 
                      key={service.id} 
                      btn={t('common.booking')} 
                      id={service.id}  
                      link={`/${lang}/book`} 
                      service={service}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {filteredServices.length > itemsPerPage && (
                  <div className="mt-12">
                    <Pagination 
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-gray-500 py-8">
                {searchTerm 
                  ? " "
                  : (t('services.loadingServices') || "Loading services...")
                }
              </p>
            )}
          </>
        ) : (
          <p className="col-span-full text-center text-gray-500">{t('services.loadingServices')}</p>
        )}
      </div>
    </div>
  );
};

export default Services;