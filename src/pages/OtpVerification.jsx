import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  
   const phone = location.state?.phone;
 
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

     console.log('OTP Verified:', otp);

     navigate('/success');  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">OTP Verification</h2>
        <p className="text-gray-600 mb-6">
          Enter the 6-digit code sent to
          <span className="font-semibold"> {phone}</span>
        </p>

        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full text-center text-2xl tracking-widest border-2 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
          placeholder="------"
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* <button
          onClick={handleVerify}
          className="w-full mt-6 py-3 bg-[#2f6fb2] text-white rounded-full font-bold hover:bg-blue-700 transition"
        >
          Verify OTP
        </button> */}
<button  className="w-full mt-6 py-3 bg-[#2f6fb2] text-white rounded-full font-bold hover:bg-blue-700 transition" onClick={() => window.open("https://buy.stripe.com/test_bJe3cuayXgRk3jFd96eIw01")}>
Verify OTP</button>
        <button className="text-sm text-[#2f6fb2] mt-4">
          Resend OTP
        </button>
      </div>
    </div>
  );
}

export default OtpVerification;
