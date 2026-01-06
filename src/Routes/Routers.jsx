// import React from 'react';
// import { Routes, Route, Navigate, useParams } from "react-router-dom";
// import LanguageDetector from '../components/LanguageDetector';

// import Services from '../pages/Services';
// import Categories from '../pages/Categories';
// import PaymentForm from '../pages/PaymentForm';
// import OtpVerification from '../pages/OtpVerification';
// import PaymentSuccess from '../pages/PaymentSuccess';

// const LangRedirect = ({ to }) => {
//   const { lang } = useParams();
//   return <Navigate to={`/${lang || 'en'}/${to}`} replace />;
// };

// const Routers = () => {
//   return (
//     <Routes>

//       {/* ROOT */}
//       <Route path="/" element={<Navigate to="/en/services" replace />} />

//       {/* Redirect old routes without language */}
//       <Route path="/services" element={<Navigate to="/en/services" replace />} />
//       <Route path="/categories" element={<Navigate to="/en/categories" replace />} />
//       <Route path="/book" element={<Navigate to="/en/book" replace />} />
//       <Route path="/otp" element={<Navigate to="/en/otp" replace />} />

//       {/* Language based routes */}
//       <Route path=":lang" element={<LanguageDetector />}>
//         {/* Default index → services */}
//         <Route index element={<LangRedirect to="services" />} />

//         <Route path="services" element={<Services />} />
//         <Route path="categories" element={<Categories />} />
//         <Route path="book" element={<PaymentForm />} />
//         <Route path="otp" element={<OtpVerification />} />
//         <Route path="paymentsuccess" element={<PaymentSuccess />} />

//         {/* Fallback inside language */}
//         <Route path="*" element={<LangRedirect to="services" />} />
//       </Route>

//       {/* Final fallback */}
//       <Route path="*" element={<Navigate to="/en/services" replace />} />
//     </Routes>
//   );
// };

// export default Routers;
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import LanguageDetector from '../components/LanguageDetector';

import Services from '../pages/Services';
import Categories from '../pages/Categories';
import PaymentForm from '../pages/PaymentForm';
import OtpVerification from '../pages/OtpVerification';
import PaymentSuccess from '../pages/PaymentSuccess';

const Routers = () => {
  return (
    <Routes>
      {/* ROOT - مباشرة إلى en */}
      <Route path="/" element={<Navigate to="/en" replace />} />
      
      {/* مسار واحد للغات - جميع اللغات تذهب هنا */}
      <Route path=":lang" element={<LanguageDetector />}>
        {/* index route يظهر Services مباشرة */}
        <Route index element={<Services />} />
        
        {/* باقي الصفحات */}
        <Route path="categories" element={<Categories />} />
        <Route path="book" element={<PaymentForm />} />
        <Route path="otp" element={<OtpVerification />} />
        <Route path="paymentsuccess" element={<PaymentSuccess />} />
        
        {/* Fallback داخل اللغة */}
        <Route path="*" element={<Services />} />
      </Route>

      {/* Redirect old routes without language */}
      <Route path="/services" element={<Navigate to="/en" replace />} />
      <Route path="/categories" element={<Navigate to="/en/categories" replace />} />
      <Route path="/book" element={<Navigate to="/en/book" replace />} />
      <Route path="/otp" element={<Navigate to="/en/otp" replace />} />
      <Route path="/paymentsuccess" element={<Navigate to="/en/paymentsuccess" replace />} />

      {/* Final fallback */}
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
};

export default Routers;