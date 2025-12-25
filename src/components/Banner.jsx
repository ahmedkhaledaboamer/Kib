import React from 'react';
import { useNavigate } from 'react-router-dom';

function Banner({ title, breadcrumbs, backgroundImage }) {
  const navigate = useNavigate();

  return (
    <div className="relative h-96 w-full overflow-hidden">
       <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage || `url('/images/ahmed.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          {title || "Our Categories"}
        </h1>

        <div className="flex items-center gap-2 text-lg">
           <span
            onClick={() => navigate(-1)}
            className="hover:text-yellow-400 transition-colors cursor-pointer"
          >
            {breadcrumbs?.home || "Home"}
          </span>

          <span className="text-yellow-400">≫</span>

          <span className="text-yellow-400">
            {breadcrumbs?.current || "Our Categories"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Banner;
