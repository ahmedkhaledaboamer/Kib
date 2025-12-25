import React, { useState } from 'react';

function Pagination({ totalPages = 5, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div className="flex items-center justify-center gap-3 py-8">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`w-14 h-14 rounded-lg flex items-center justify-center font-semibold transition-all ${
          currentPage === 1
            ? 'bg-[#2f6fb2] text-white/50 cursor-not-allowed'
            : 'bg-[#2f6fb2] text-white hover:bg-[#2f6fb2]'
        }`}
      >
        ←
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`w-14 h-14 rounded-lg flex items-center justify-center font-semibold transition-all ${
              currentPage === pageNumber
                ? 'bg-orange-400 text-white'
                : 'bg-[#2f6fb2] text-white hover:bg-[#2f6fb2]'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-14 h-14 rounded-lg flex items-center justify-center font-semibold transition-all ${
          currentPage === totalPages
            ? 'bg-[#2f6fb2] text-white/50 cursor-not-allowed'
            : 'bg-[#2f6fb2] text-white hover:bg-teal-600'
        }`}
      >
        →
      </button>
    </div>
  );
}


export default Pagination