import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');

    console.log(sessionId ? 'success' : 'failed');

    if (sessionId) {
      const storedData = localStorage.getItem('user');

      if (storedData) {
        const user = JSON.parse(storedData);

        const updatedData = {
          ...user,
          isPaid: true,  
        };

        localStorage.setItem('user', JSON.stringify(updatedData));
      }
    }
  }, [location.search]);

  const handleBackToServices = () => {
    navigate('/services');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful  
        </h1>

        <p className="text-gray-600 mb-8">
          Your payment has been completed successfully.
        </p>

        <button
          onClick={handleBackToServices}
          className="px-8 py-3 bg-[#2f6fb2] text-white rounded-full font-bold hover:bg-blue-700"
        >
          Back to Services
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
