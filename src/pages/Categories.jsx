import React, { useState } from 'react';
import Banner from "../components/Banner";
import Pagination from "../components/Pagination/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft } from 'lucide-react';
import CardDetails from '../components/CardDetails';

function Categories() {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const serviceId = searchParams.get('serviceId');
  
  const services = useSelector((state) => state.services.services);
  
  const servicesList = Array.isArray(services) ? services : services ? [services] : [];
  const selectedService = servicesList.find(service => service.id === serviceId);
  const subservices = selectedService?.subservices || [];
  
  console.log('Service ID from URL:', serviceId);
  console.log('Services List:', servicesList);
  console.log('Selected Service:', selectedService);
  console.log('Subservices:', subservices);

  return (
    <div>
      <Banner 
        title={selectedService?.title || "Categories"}
        breadcrumbs={{
          home: selectedService?.title,
          services: "Services",
          current: "Categories"
        }}
        backgroundImage={`url(${selectedService?.image})`}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-[#2f6fb2] transition-colors" />
            <span className="text-gray-700 font-medium group-hover:text-[#2f6fb2] transition-colors">
              Back
            </span>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
          {subservices.length > 0 ? (
            subservices.map((subservice) => (
              <CardDetails 
                key={subservice.id} 
                link={"/book"} 
                btn={"Book Now"}
                id={subservice.id}
                service={subservice}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No categories available</p>
          )}
        </div>
      </div>

      <Pagination 
        totalPages={Math.ceil(subservices.length / 8) || 1} 
        onPageChange={(newPage) => {
          setPage(newPage);
          console.log('Page changed to:', newPage);
        }} 
      />
    </div>
  );
}

export default Categories;