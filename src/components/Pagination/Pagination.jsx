import React, { useState, useEffect } from 'react';

function Pagination({ totalPages = 5, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // مراقبة عرض النافذة للتجاوب
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  // تحديد عدد الصفحات المرئية بناءً على حجم الشاشة
  const getVisiblePages = () => {
    if (windowWidth < 640) { // موبايل
      return 3;
    } else if (windowWidth < 1024) { // تابلت
      return 5;
    } else { // ديسكتوب
      return Math.min(7, totalPages);
    }
  };

  // إنشاء أرقام الصفحات المرئية بذكاء
  const getPageNumbers = () => {
    const visiblePages = getVisiblePages();
    
    // إذا كان عدد الصفحات قليلاً، عرض كل الصفحات
    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages - 1) {
      endPage = totalPages - 1;
      startPage = Math.max(2, endPage - visiblePages + 1);
    }

    const pages = [1];

    if (startPage > 2) {
      pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // تحديد أحجام الأزرار بناءً على حجم الشاشة
  const getButtonSize = () => {
    if (windowWidth < 640) return 'w-10 h-10 text-sm';
    if (windowWidth < 768) return 'w-11 h-11';
    return 'w-12 h-12';
  };

  const buttonSizeClass = getButtonSize();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-6 sm:py-8 px-4">
      
      
      <div className="flex items-center justify-center gap-1 sm:gap-2 lg:gap-3">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`${buttonSizeClass} rounded-lg flex items-center justify-center font-semibold transition-all ${
            currentPage === 1
              ? 'bg-[#0d8d82] text-white/50 cursor-not-allowed'
              : 'bg-[#0d8d82] text-white hover:bg-[#3ec9bb] active:scale-95'
          }`}
          aria-label="Previous page"
        >
          <span className="sr-only">Previous</span>
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 sm:gap-2">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span 
                  key={`ellipsis-${index}`} 
                  className={`${buttonSizeClass} flex items-center justify-center text-gray-500 font-medium`}
                >
                  ...
                </span>
              );
            }
            
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${buttonSizeClass} rounded-lg flex items-center justify-center font-semibold transition-all ${
                  currentPage === page
                    ? 'bg-[#0d8d82] text-white shadow-md'
                    : 'border border-[#0d8d82] text-[#0d8d82] hover:bg-[#0d8d82] hover:text-white active:scale-95'
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`${buttonSizeClass} rounded-lg flex items-center justify-center font-semibold transition-all ${
            currentPage === totalPages
              ? 'bg-[#0d8d82] text-white/50 cursor-not-allowed'
              : 'bg-[#0d8d82] text-white hover:bg-[#3ec9bb] active:scale-95'
          }`}
          aria-label="Next page"
        >
          <span className="sr-only">Next</span>
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile friendly navigation */}
      <div className="mt-4 sm:hidden flex items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#0d8d82] text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#0d8d82] text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;