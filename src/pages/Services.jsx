import Banner from "../components/Banner";
 import React, { useEffect, useState } from 'react';
import Pagination from "../components/Pagination/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getServices } from "../store/servicesSlice";
import CardDetails from "../components/CardDetails";
 
const Services = () => {
  const services = useSelector((state) => state.services.services);
  console.log(services);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    const get = async() => {
      await dispatch(getServices());
    }
    get();
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      const storedData = localStorage.getItem('user');

      if (sessionId) {
        const user = JSON.parse(storedData);

        const updatedData = {
          ...user,
          isPaid: true,  
        };

        localStorage.setItem('user', JSON.stringify(updatedData));
        toast.success('Payment submitted successfully!');
      }
    }
    navigate('/services');
  }, [location.search]);

   const servicesList = Array.isArray(services) ? services : services ? [services] : [];

  return (
    <div className="min-h-screen bg-gray-100">
       <Banner 
        title="Our Services"
        breadcrumbs={{ home: "Home", current: "Our Services" }}
        backgroundImage="url('/images/ahmed.jpg')"
      />

       <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-12">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
          {servicesList.length > 0 ? (
            servicesList.map((service) => (
              <CardDetails 
                key={service.id} 
                btn={"Booking"} 
                id={service.id}  
                link={"/book"} 
                service={service}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Loading services...</p>
          )}
        </div>
      </div>
      <Pagination 
        totalPages={Math.ceil(servicesList.length / 8) || 1} 
        onPageChange={(newPage) => {
          setPage(newPage);
          console.log('Page changed to:', newPage);
        }} 
      /> 
    </div>
  );
};

export default Services;