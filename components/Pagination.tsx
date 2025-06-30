import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-between px-4 items-center gap-2 my-8">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center text-black px-3 py-2 rounded-full cursor-pointer border border-gray-300 hover:bg-gray-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="h-4 w-4 mr-1" />
        Previous
      </button>

      {/*page numbers*/}
      <div className="flex gap-2">
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-[12px] py-[6px] rounded-full cursor-pointer border ${
              currentPage === pageNum
                ? 'bg-violet-600 text-white'
                : 'hover:bg-gray-50'
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 cursor-pointer rounded-full hover:bg-gray-200/50 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRightIcon className="h-4 w-4 ml-1" />
      </button>
    </div>
  );
};
export default Pagination;
