// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

// const ProfessionalSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   const slides = [
//     {
//       id: 1,
//       number: '01',
//       title: 'Business Strategies Development',
//       image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
//       description: 'Develop comprehensive business strategies tailored to your corporate needs'
//     },
//     {
//       id: 2,
//       number: '02',
//       title: 'Customer Experience Solutions',
//       image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop',
//       description: 'Enhance customer satisfaction with innovative experience solutions'
//     },
//     {
//       id: 3,
//       number: '03',
//       title: 'Digital Transformation',
//       image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
//       description: 'Transform your business with cutting-edge digital solutions'
//     },
//     {
//       id: 4,
//       number: '04',
//       title: 'Technology Integration',
//       image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
//       description: 'Seamlessly integrate modern technology into your operations'
//     }
//   ];

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   // Auto play
//   useEffect(() => {
//     if (!isAutoPlaying) return;
//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, [isAutoPlaying, currentSlide]);

//   // Calculate visible slides (show 3 at once)
//   const getVisibleSlides = () => {
//     const visible = [];
//     for (let i = 0; i < 3; i++) {
//       const index = (currentSlide + i) % slides.length;
//       visible.push({ ...slides[index], position: i });
//     }
//     return visible;
//   };

//   const visibleSlides = getVisibleSlides();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 text-teal-600 font-semibold mb-4">
//             <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
//               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
//               </svg>
//             </div>
//             OUR SOLUTIONS
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
//             Tailor Business Solutions
//             <br />
//             <span className="text-gray-700">for Corporates.</span>
//           </h1>
//         </div>

//         {/* Slider Container */}
//         <div 
//           className="relative"
//           onMouseEnter={() => setIsAutoPlaying(false)}
//           onMouseLeave={() => setIsAutoPlaying(true)}
//         >
//           {/* Cards */}
//           <div className="flex gap-6 justify-center items-stretch mb-8 overflow-hidden px-4">
//             {visibleSlides.map((slide, idx) => (
//               <div
//                 key={slide.id}
//                 className={`
//                   flex-shrink-0 w-full md:w-[380px] transition-all duration-700 ease-out
//                   ${idx === 1 ? 'scale-100 opacity-100' : 'scale-95 opacity-60'}
//                 `}
//                 style={{
//                   transform: `translateX(${(idx - 1) * 10}px)`
//                 }}
//               >
//                 <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full group">
//                   {/* Image */}
//                   <div className="relative h-72 overflow-hidden">
//                     <img
//                       src={slide.image}
//                       alt={slide.title}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   </div>

//                   {/* Content */}
//                   <div className="p-8">
//                     <div className="text-gray-400 text-lg font-bold mb-3">
//                       {slide.number}
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
//                       {slide.title}
//                     </h3>
//                     <p className="text-gray-600 mb-6">
//                       {slide.description}
//                     </p>
                    
//                     {/* Arrow Button */}
//                     <button className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-teal-600 transition-all duration-300 transform group-hover:scale-110">
//                       <ArrowUpRight className="w-5 h-5 text-white" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all duration-300 group z-10"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
          
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all duration-300 group z-10"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Dots Indicator */}
//         <div className="flex justify-center gap-2 mt-8">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 index === currentSlide
//                   ? 'w-12 bg-teal-600'
//                   : 'w-2 bg-gray-300 hover:bg-gray-400'
//               }`}
//             />
//           ))}
//         </div>

//         {/* Stats or Additional Info */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
//           {[
//             { number: '500+', label: 'Projects Completed' },
//             { number: '98%', label: 'Client Satisfaction' },
//             { number: '15+', label: 'Years Experience' }
//           ].map((stat, idx) => (
//             <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
//               <div className="text-4xl font-bold text-teal-600 mb-2">{stat.number}</div>
//               <div className="text-gray-600">{stat.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfessionalSlider;

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const ProfessionalSlider = () => {
  const swiperRef = useRef(null);

  const slides = [
    {
      id: 1,
      number: '01',
      title: 'Business Strategies Development',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
      description: 'Develop comprehensive business strategies tailored to your corporate needs'
    },
    {
      id: 2,
      number: '02',
      title: 'Customer Experience Solutions',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop',
      description: 'Enhance customer satisfaction with innovative experience solutions'
    },
    {
      id: 3,
      number: '03',
      title: 'Digital Transformation',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      description: 'Transform your business with cutting-edge digital solutions'
    },
    {
      id: 4,
      number: '04',
      title: 'Technology Integration',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
      description: 'Seamlessly integrate modern technology into your operations'
    },
    {
      id: 5,
      number: '05',
      title: 'Innovation Management',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
      description: 'Drive innovation and stay ahead of market trends'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-teal-600 font-semibold mb-4">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
              </svg>
            </div>
            OUR SOLUTIONS
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Tailor Business Solutions
            <br />
            <span className="text-gray-700">for Corporates.</span>
          </h1>
        </div>

        {/* Swiper Slider */}
        <div className="relative px-16">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1.5,
              slideShadows: false,
            }}
            className="pb-16"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                {({ isActive }) => (
                  <div
                    className={`
                      bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl 
                      transition-all duration-500 h-full group
                      ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'}
                    `}
                  >
                    {/* Image */}
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="text-gray-400 text-lg font-bold mb-3">
                        {slide.number}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                        {slide.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {slide.description}
                      </p>
                      
                      {/* Arrow Button */}
                      <button className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-teal-600 transition-all duration-300 transform group-hover:scale-110">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { number: '500+', label: 'Projects Completed' },
            { number: '98%', label: 'Client Satisfaction' },
            { number: '15+', label: 'Years Experience' }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl font-bold text-teal-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Pagination Styles */}
      <style jsx>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          width: 40px;
          border-radius: 4px;
          background: #0d9488;
        }
      `}</style>
    </div>
  );
};

export default ProfessionalSlider;