import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../pages/Home';
import Services from '../pages/Services';
import Categories from '../pages/Categories';
 import PaymentForm from '../pages/PaymentForm';
import OtpVerification from '../pages/OtpVerification';
import PaymentSuccess from '../pages/PaymentSuccess';
  
 
 

const Routers = () => { 
 
  return (
     <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/categories" element={<Categories />} />
       <Route path="/book" element={<PaymentForm />} />
      <Route path="/otp" element={<OtpVerification />} />    
            <Route path="/PaymentSuccess" element={<PaymentSuccess />} />   

      </Routes>
  )
}

export default Routers