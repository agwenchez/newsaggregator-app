import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  firstItem?: number;
  lastItem?: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalResults,
  firstItem,
  lastItem,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPaginationLinks = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return pages.map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`relative inline-flex items-center px-4 py-2 border text-sm ${
          page === currentPage
            ? "bg-gray-200 text-gray-700"
            : "bg-white text-gray-500 hover:text-gray-700"
        }`}
        aria-current={page === currentPage ? "page" : undefined}
      >
        {page}
      </button>
    ));
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className="flex items-center justify-between"
    >
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
            currentPage === 1
              ? "text-gray-500 cursor-not-allowed"
              : "text-gray-700 hover:text-gray-500"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium ${
            currentPage === totalPages
              ? "text-gray-500 cursor-not-allowed"
              : "text-gray-700 hover:text-gray-500"
          }`}
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">{firstItem ?? 1}</span> to{" "}
          <span className="font-medium">{lastItem ?? totalResults}</span> of{" "}
          <span className="font-medium">{totalResults}</span> results
        </p>

        <div className="relative z-0 inline-flex shadow-sm rounded-md">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${
              currentPage === 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-700 hover:text-gray-500"
            }`}
          >
            &#8592;
          </button>
          {renderPaginationLinks()}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-2 py-2 text-sm font-medium ${
              currentPage === totalPages
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-700 hover:text-gray-500"
            }`}
          >
            &#8594;
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
