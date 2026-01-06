

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, User, Mail, Phone, Home, Globe, FileText, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function AppointmentForm() {
  const { t } = useTranslation();
  const locationState = window.history.state?.usr || {};
  const serviceId = locationState.serviceId || null;
  const service = locationState.service || null;

  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirming, setIsConfirming] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    timezone: 'UTC',
    duration: 30,
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const timeSlots = [
    '7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM',
    '8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM',
    '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM',
    '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM',
    '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM',
    '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM',
    '1:00 PM', '1:15 PM', '1:30 PM', '1:45 PM',
    '2:00 PM', '2:15 PM', '2:30 PM', '2:45 PM',
    '3:00 PM', '3:15 PM', '3:30 PM', '3:45 PM',
    '4:00 PM', '4:15 PM', '4:30 PM', '4:45 PM',
    '5:00 PM', '5:15 PM', '5:30 PM', '5:45 PM',
  ];

  const timezones = [
    'Asia/Jerusalem',  
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Dubai',
  ];

  const durationOptions = {
    30: `30 ${t('paymentForm.minutes')}`,
    45: `45 ${t('paymentForm.minutes')}`,
    60: `1 ${t('paymentForm.hour')}`,
    90: `1.5 ${t('paymentForm.hours')}`,
    120: `2 ${t('paymentForm.hours')}`
  };


  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        if (!value) return t('paymentForm.firstNameRequired');
        if (value.length < 2) return t('paymentForm.mustBe2Chars');
        return '';
      case 'lastName':
        if (!value) return t('paymentForm.lastNameRequired');
        if (value.length < 2) return t('paymentForm.mustBe2Chars');
        return '';
      case 'email':
        if (!value) return t('paymentForm.emailRequired');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t('paymentForm.invalidEmail');
        return '';
      case 'phone':
        if (!value) return t('paymentForm.phoneRequired');
        if (!/^\+?[0-9]{10,15}$/.test(value)) return t('paymentForm.phoneInvalid');
        return '';
       
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

 const calculateEndTime = (date, time, duration) => {
  const timeStr = convertTo24Hour(time);
  const [hours, minutes] = timeStr.split(':').map(Number);

  const startDate = new Date(date);
  startDate.setHours(hours, minutes, 0, 0);

  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + duration);

  const format = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(
      d.getMinutes()
    ).padStart(2, '0')}:00`;

  return format(endDate);
};

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };

  const formatDuration = (minutes) => {
    // Convert to number to handle string values from select
    const mins = Number(minutes);
    // Return exact match from durationOptions if available
    if (durationOptions[mins]) {
      return durationOptions[mins];
    }
    // Fallback for any other duration
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (hours === 0) return `${mins} Minutes`;
    if (remainingMins === 0) return `${hours} ${hours === 1 ? 'Hour' : 'Hours'}`;
    return `${hours}.${remainingMins / 60 * 10} Hours`;
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!selectedDate) {
      newErrors.date = t('paymentForm.pleaseSelectDate');
    }
    if (!selectedTime) {
      newErrors.time = t('paymentForm.pleaseSelectTime');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    const newTouched = {};
    
    Object.keys(formData).forEach(key => {
      if (key !== 'notes' && key !== 'duration' && key !== 'timezone') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
        newTouched[key] = true;
      }
    });

    setErrors(newErrors);
    setTouched(newTouched);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (isConfirming) {
      setIsConfirming(false);
      setCurrentStep(2);
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      setIsConfirming(true);
    }
  };

  const handleConfirm = () => {
const dateStr = selectedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD
    const timeStr = convertTo24Hour(selectedTime);
    
    const bookingData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zip: formData.zip,
      timezone: formData.timezone,
      notes: formData.notes,
      start: `${dateStr} ${timeStr}:00`,
      end: calculateEndTime(dateStr, selectedTime, formData.duration),
      location: `${formData.address}, ${formData.zip} ${formData.city}`,
       providerId: 20,
serviceId: serviceId < 6 ? 6 : serviceId,    };
    
    try {
      const userData = {
         firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zip: formData.zip,
      timezone: formData.timezone,
      notes: formData.notes,
      start: `${dateStr} ${timeStr}:00`,
      end: calculateEndTime(dateStr, selectedTime, formData.duration),
      location: `${formData.address}, ${formData.zip} ${formData.city}`,
       providerId: 20,
     serviceId: serviceId < 6 ? 6 : serviceId,      
      };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
      
      console.log('Service ID:', serviceId);
      console.log('Service Info:', service);
      console.log('Data saved to localStorage:', bookingData);
      
      window.open("https://buy.stripe.com/test_bJe3cuayXgRk3jFd96eIw01", "_blank");
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      alert(t('paymentForm.errorSaving'));
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

const renderCalendar = () => {
  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="h-10"></div>);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isSelected = selectedDate && 
      date.toDateString() === selectedDate.toDateString();
    const isToday = date.toDateString() === today.toDateString();
    const isPastDate = date < today;
    
    days.push(
      <button
        key={day}
        type="button"
        onClick={() => !isPastDate && setSelectedDate(date)}
        disabled={isPastDate}
        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition ${
          isSelected
            ? 'bg-teal-600 text-white'
            : isPastDate
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : isToday
            ? 'bg-teal-100 text-teal-600 hover:bg-teal-200'
            : 'hover:bg-gray-100 text-gray-700'
        } ${!isPastDate ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      >
        {day}
      </button>
    );
  }
  
  return days;
};

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  const monthNames = [
    t('paymentForm.january'), t('paymentForm.february'), t('paymentForm.march'),
    t('paymentForm.april'), t('paymentForm.may'), t('paymentForm.june'),
    t('paymentForm.july'), t('paymentForm.august'), t('paymentForm.september'),
    t('paymentForm.october'), t('paymentForm.november'), t('paymentForm.december')
  ];

  // Confirmation Page
  if (isConfirming) {
    return (
      <div className="  min-h-screen bg-gray-50 mt-[10%] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-8 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold">{t('paymentForm.appointmentConfirmation')}</h1>
            </div>

            <div className="p-8">
              {service && (
                <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="text-sm text-teal-700 font-semibold">{t('paymentForm.service')}:</p>
                  <p className="text-xl font-bold text-teal-900">{service.title || t('paymentForm.service')}</p>
                   <p className="text-teal-700 mt-1">{t('paymentForm.price')}:AED {service.price  && service.price}</p>

                 </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-teal-600" />
                    {t('paymentForm.contactInfo')}
                  </h2>
                  
                  <div className="space-y-3">
                    <InfoItem 
                      label={t('paymentForm.name')} 
                      value={`${formData.firstName} ${formData.lastName}`}
                    />
                    <InfoItem 
                      label={t('paymentForm.email')} 
                      value={formData.email}
                    />
                    <InfoItem 
                      label={t('paymentForm.phone')} 
                      value={formData.phone}
                    />
                    <InfoItem 
                      label={t('paymentForm.address')} 
                      value={formData.address}
                    />
                    <InfoItem 
                      label={t('paymentForm.city')} 
                      value={formData.city}
                    />
                    <InfoItem 
                      label={t('paymentForm.zipCode')} 
                      value={formData.zip}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    {t('paymentForm.appointmentDetails')}
                  </h2>
                  
                  <div className="space-y-3">
                    <InfoItem 
                      label={t('paymentForm.date')} 
                      value={selectedDate?.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    />
                    <InfoItem 
                      label={t('paymentForm.time')} 
                      value={selectedTime}
                    />
                    <InfoItem 
                      label={t('paymentForm.duration')} 
                      value={formatDuration(formData.duration)}
                    />
                    <InfoItem 
                      label={t('paymentForm.timezone')} 
                      value={formData.timezone}
                    />
                    <InfoItem 
                      label={t('paymentForm.location')} 
                      value={`${formData.address}, ${formData.zip} ${formData.city}`}
                    />
                    {formData.notes && (
                      <InfoItem 
                        label={t('paymentForm.notes')} 
                        value={formData.notes}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-8 border-t">
                <button
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t('common.back').toUpperCase()}
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  {t('paymentForm.confirmToPay')}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                {t('paymentForm.secureTransaction')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-gray-50 mt-[10%] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {service && (
            <div className="mb-6 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-600">
              <p className="text-sm text-teal-800 font-semibold">{t('paymentForm.selectedService')}</p>
              <p className="text-lg font-bold text-teal-900">{service.title || t('paymentForm.service')}</p>
              <p className="text-teal-700 mt-1">{t('paymentForm.price')}:AED {service.price  && service.price}</p>

             </div>
          )}
          
           <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-teal-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep === 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <span className="font-semibold hidden sm:inline">{t('paymentForm.selectDate')} & {t('paymentForm.selectTime')}</span>
              </div>
              
              <div className="w-20 h-1 bg-gray-200">
                <div className={`h-full ${currentStep === 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
              </div>
              
              <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-teal-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep === 2 ? 'bg-teal-600 text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className="font-semibold hidden sm:inline">{t('paymentForm.yourDetails')}</span>
              </div>
            </div>
          </div>

          {/* Step 1: Date & Time */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
                {t('paymentForm.selectDate')} & {t('paymentForm.selectTime')}
              </h1>
              <p className="text-gray-600 text-center mb-8">
                {t('paymentForm.selectDate')} & {t('paymentForm.selectTime')}
              </p>

              <div className="bg-[#eff0f2] rounded-xl p-6 shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#0d9488]" />
                  {t('paymentForm.appointmentDetails')}
                </h3>
                
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Calendar */}
                  <div>
                    <div className="bg-teal-600 text-white rounded-t-lg p-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => changeMonth(-1)}
                        className="p-1 hover:bg-teal-700 rounded"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="font-semibold text-lg">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </div>
                      <button
                        type="button"
                        onClick={() => changeMonth(1)}
                        className="p-1 hover:bg-teal-700 rounded"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="bg-white border border-teal-600 rounded-b-lg p-4">
                      <div className="grid grid-cols-7 gap-2 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="text-center text-sm font-semibold text-gray-600">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {renderCalendar()}
                      </div>
                    </div>
                    {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date}</p>}
                  </div>

                  {/* Time & Timezone */}
                  <div>
                    <div className="mb-4">
                      <label className="block font-semibold mb-3 text-gray-700">
                        {t('paymentForm.timezone')} <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="timezone"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-700"
                        onChange={handleChange}
                        value={formData.timezone}
                      >
                        {timezones.map(tz => (
                          <option key={tz} value={tz}>{tz}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-3 text-gray-700">
                        {t('paymentForm.selectTime')} <span className="text-red-500">*</span>
                      </label>
                      <div className="max-h-80 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-3 bg-white">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`w-full py-3 px-4 rounded-lg text-center font-medium transition ${
                              selectedTime === time
                                ? 'bg-teal-600 text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {errors.time && <p className="text-red-500 text-sm mt-2">{errors.time}</p>}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block font-semibold mb-2 text-gray-700">
                    {t('paymentForm.duration')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="duration"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    onChange={handleChange}
                    value={formData.duration}
                  >
                    <option value="30">30 {t('paymentForm.minutes')}</option>
                    <option value="45">45 {t('paymentForm.minutes')}</option>
                    <option value="60">1 {t('paymentForm.hour')}</option>
                    <option value="90">1.5 {t('paymentForm.hours')}</option>
                    <option value="120">2 {t('paymentForm.hours')}</option>
                  </select>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-bold text-lg hover:from-teal-700 hover:to-teal-800 transition shadow-lg flex items-center justify-center gap-2"
              >
                {t('common.next')}: {t('paymentForm.yourDetails')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
                {t('paymentForm.yourDetails')}
              </h1>
              <p className="text-gray-600 text-center mb-8">
                {t('paymentForm.yourDetails')}
              </p>

              {/* Personal Information */}
              <div className="bg-[#eff0f2] rounded-xl p-6 shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  {t('paymentForm.contactInfo')}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    label={t('paymentForm.firstName')}
                    name="firstName"
                    placeholder={t('paymentForm.firstName')}
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && errors.firstName}
                    required
                  />
                  <FormField
                    label={t('paymentForm.lastName')}
                    name="lastName"
                    placeholder={t('paymentForm.lastName')}
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && errors.lastName}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <FormField
                    label={t('paymentForm.email')}
                    name="email"
                    type="email"
                    placeholder={t('paymentForm.email')}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                    required
                  />
                  <FormField
                    label={t('paymentForm.phoneNumber')}
                    name="phone"
                    placeholder={t('paymentForm.phone')}
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && errors.phone}
                    required
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-[#eff0f2] rounded-xl p-6 shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Home className="w-5 h-5 text-green-600" />
                  {t('paymentForm.addressDetails')}
                </h3>
                
                <FormField
                  label={t('paymentForm.address')}
                  name="address"
                  placeholder={t('paymentForm.addressDetails')}
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && errors.address}
                   
                />

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <FormField
                    label={t('paymentForm.city')}
                    name="city"
                    placeholder={t('paymentForm.city')}
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && errors.city}
                     
                  />
                  <FormField
                    label={t('paymentForm.zipCode')}
                    name="zip"
                    placeholder="00000"
                    value={formData.zip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.zip && errors.zip}
                     
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="bg-[#eff0f2] rounded-xl p-6 shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  {t('paymentForm.notes')} ({t('common.cancel')})
                </h3>
                
                <textarea
                  name="notes"
                  rows="4"
                  placeholder={t('paymentForm.notes')}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  onChange={handleChange}
                  value={formData.notes}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t('common.back')}
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-bold text-lg hover:from-teal-700 hover:to-teal-800 transition shadow-lg flex items-center justify-center gap-2"
                >
                  {t('common.confirm')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({ label, name, type = 'text', placeholder, value, onChange, onBlur, error, required }) {
  return (
    <div>
      <label className="block font-semibold mb-2 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-sm font-semibold text-gray-600 mb-1">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  );
}

export default AppointmentForm;






// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Banner from '../components/Banner';
// import { useNavigate } from 'react-router-dom';

// function PaymentForm() {
//   const navigate = useNavigate();

//   // Validation Schema
//   const validationSchema = Yup.object({
//     fullName: Yup.string()
//       .min(3, 'Name must be at least 3 characters')
//       .required('Full name is required'),
//     email: Yup.string()
//       .email('Invalid email address')
//       .required('Email is required'),
//     phone: Yup.string()
//       .matches(/^[0-9]{10,15}$/, 'Phone number must be 10–15 digits')
//       .required('Phone number is required'),
//     address: Yup.string()
//       .min(10, 'Address must be at least 10 characters')
//       .required('Address is required'),
//     consultationType: Yup.string()
//       .required('Please select consultation type'),
//   });

//   // Formik
//   const formik = useFormik({
//     initialValues: {
//       fullName: '',
//       email: '',
//       phone: '',
//       address: '',
//       consultationType: '',
//     },
//     validationSchema,
//    onSubmit: (values) => {
//    localStorage.setItem('user', JSON.stringify(values));
//  window.open("https://buy.stripe.com/test_bJe3cuayXgRk3jFd96eIw01")

//   //  navigate('/otp');
// },
//   });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Banner */}
//       <Banner
//         title="Payment Details"
//         breadcrumbs={{ home: 'Home', current: 'Payment' }}
//       />

//       {/* Form Container */}
//       <div className="container mx-auto px-4 py-12">
//         <div className="max-w-3xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//               Enter Payment Information
//             </h2>

//             <form onSubmit={formik.handleSubmit} className="space-y-6">
//               {/* Full Name */}
//               <div>
//                 <label className="block font-semibold mb-2">
//                   Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="fullName"
//                   placeholder="Enter your full name"
//                   className={`w-full px-4 py-3 border-2 rounded-lg ${
//                     formik.touched.fullName && formik.errors.fullName
//                       ? 'border-red-500'
//                       : 'border-gray-300'
//                   }`}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.fullName}
//                 />
//                 {formik.touched.fullName && formik.errors.fullName && (
//                   <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block font-semibold mb-2">
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="email"
//                   type="email"
//                   placeholder="example@email.com"
//                   className={`w-full px-4 py-3 border-2 rounded-lg ${
//                     formik.touched.email && formik.errors.email
//                       ? 'border-red-500'
//                       : 'border-gray-300'
//                   }`}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.email}
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <p className="text-red-500 text-sm">{formik.errors.email}</p>
//                 )}
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block font-semibold mb-2">
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   name="phone"
//                   placeholder="0501234567"
//                   className={`w-full px-4 py-3 border-2 rounded-lg ${
//                     formik.touched.phone && formik.errors.phone
//                       ? 'border-red-500'
//                       : 'border-gray-300'
//                   }`}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.phone}
//                 />
//                 {formik.touched.phone && formik.errors.phone && (
//                   <p className="text-red-500 text-sm">{formik.errors.phone}</p>
//                 )}
//               </div>

//               {/* Address */}
//               <div>
//                 <label className="block font-semibold mb-2">
//                   Address <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   name="address"
//                   rows="3"
//                   placeholder="Enter your full address"
//                   className={`w-full px-4 py-3 border-2 rounded-lg ${
//                     formik.touched.address && formik.errors.address
//                       ? 'border-red-500'
//                       : 'border-gray-300'
//                   }`}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.address}
//                 />
//                 {formik.touched.address && formik.errors.address && (
//                   <p className="text-red-500 text-sm">{formik.errors.address}</p>
//                 )}
//               </div>

//               {/* Consultation Type */}
//               <div>
//                 <label className="block font-semibold mb-3">
//                   Consultation Type <span className="text-red-500">*</span>
//                 </label>

//                 <label className="flex items-center gap-3 p-4 border rounded-lg">
//                   <input
//                     type="radio"
//                     name="consultationType"
//                     value="Office"
//                     onChange={formik.handleChange}
//                   />
//                   <div>
//                     <p className="font-semibold">Office Visit</p>
//                     <p className="text-sm text-gray-600">In-person consultation</p>
//                   </div>
//                 </label>

//                 <label className="flex items-center gap-3 p-4 border rounded-lg mt-3">
//                   <input
//                     type="radio"
//                     name="consultationType"
//                     value="Online"
//                     onChange={formik.handleChange}
//                   />
//                   <div>
//                     <p className="font-semibold">Online</p>
//                     <p className="text-sm text-gray-600">Virtual consultation</p>
//                   </div>
//                 </label>
//               </div>

         
//               {/* Submit */}
//               <button
//                 type="submit"
//                 className="w-full py-4 bg-[#2f6fb2] text-white rounded-full font-bold text-lg hover:bg-blue-700"
//               >
//                 Complete Payment
//               </button>

//               <p className="text-center text-sm text-gray-500">
//                 Your transaction is fully secure and protected 🔒
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PaymentForm;
