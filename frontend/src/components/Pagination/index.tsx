import React from 'react';
import { PaginationProps } from './@types/PaginationProps';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToShow = 5;

  const getPageButtons = () => {
    const buttons = [];
    const halfPagesToShow = Math.floor(pagesToShow / 2);

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - halfPagesToShow && i <= currentPage + halfPagesToShow)
      ) {
        buttons.push(
          <button
            key={i}
            className={`mx-1 px-3 py-1 border rounded ${
              i === currentPage ? 'bg-[#645188]  text-white' : 'bg-white text-gray-800'
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      } else if (buttons[buttons.length - 1] !== '...') {
        buttons.push('...');
      }
    }

    return buttons;
  };

  return (
    <div className="flex mt-4">
      <button
        className={`mx-1 px-3 py-1 border rounded ${
          currentPage === 1 ? 'bg-white text-gray-400 cursor-not-allowed' : 'bg-white text-gray-800'
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      {getPageButtons()}
      <button
        className={`mx-1 px-3 py-1 border rounded ${
          currentPage === totalPages ? 'bg-white text-gray-400 cursor-not-allowed' : 'bg-white text-gray-800'
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
