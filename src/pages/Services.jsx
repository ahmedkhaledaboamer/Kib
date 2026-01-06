

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

  //   Pagination
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

  const servicesList = Array.isArray(services) ? services : services ? [services] : [];

   const totalPages = Math.ceil(servicesList.length / itemsPerPage);
  
   const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentServices = servicesList.slice(startIndex, endIndex);

   const handlePageChange = (page) => {
    setCurrentPage(page);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

   useEffect(() => {
    setCurrentPage(1);
  }, [servicesList.length]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Banner 
        title={t('services.ourServices')}
        breadcrumbs={{ home: t('common.home'), current: t('services.ourServices') }}
        backgroundImage="url('https://shazmlc.com/book-service/images/ahmed.jpg')"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-12">
        {servicesList.length > 0 ? (
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
            {servicesList.length > itemsPerPage && (
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
          <p className="col-span-full text-center text-gray-500">{t('services.loadingServices')}</p>
        )}
      </div>
    </div>
  );
};

export default Services;