import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Banner from '../components/Banner';
import { useNavigate } from 'react-router-dom';

function PaymentForm() {
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Full name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10,15}$/, 'Phone number must be 10–15 digits')
      .required('Phone number is required'),
    address: Yup.string()
      .min(10, 'Address must be at least 10 characters')
      .required('Address is required'),
    consultationType: Yup.string()
      .required('Please select consultation type'),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      consultationType: '',
    },
    validationSchema,
   onSubmit: (values) => {
   localStorage.setItem('user', JSON.stringify(values));
 window.open("https://buy.stripe.com/test_bJe3cuayXgRk3jFd96eIw01")

  //  navigate('/otp');
},
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <Banner
        title="Payment Details"
        breadcrumbs={{ home: 'Home', current: 'Payment' }}
      />

      {/* Form Container */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Enter Payment Information
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block font-semibold mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="fullName"
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 border-2 rounded-lg ${
                    formik.touched.fullName && formik.errors.fullName
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  className={`w-full px-4 py-3 border-2 rounded-lg ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  placeholder="0501234567"
                  className={`w-full px-4 py-3 border-2 rounded-lg ${
                    formik.touched.phone && formik.errors.phone
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block font-semibold mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  rows="3"
                  placeholder="Enter your full address"
                  className={`w-full px-4 py-3 border-2 rounded-lg ${
                    formik.touched.address && formik.errors.address
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-red-500 text-sm">{formik.errors.address}</p>
                )}
              </div>

              {/* Consultation Type */}
              <div>
                <label className="block font-semibold mb-3">
                  Consultation Type <span className="text-red-500">*</span>
                </label>

                <label className="flex items-center gap-3 p-4 border rounded-lg">
                  <input
                    type="radio"
                    name="consultationType"
                    value="Office"
                    onChange={formik.handleChange}
                  />
                  <div>
                    <p className="font-semibold">Office Visit</p>
                    <p className="text-sm text-gray-600">In-person consultation</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border rounded-lg mt-3">
                  <input
                    type="radio"
                    name="consultationType"
                    value="Online"
                    onChange={formik.handleChange}
                  />
                  <div>
                    <p className="font-semibold">Online</p>
                    <p className="text-sm text-gray-600">Virtual consultation</p>
                  </div>
                </label>
              </div>

         
              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-[#2f6fb2] text-white rounded-full font-bold text-lg hover:bg-blue-700"
              >
                Complete Payment
              </button>

              <p className="text-center text-sm text-gray-500">
                Your transaction is fully secure and protected 🔒
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
