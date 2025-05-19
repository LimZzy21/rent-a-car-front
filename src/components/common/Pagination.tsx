import React from "react";

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
  const renderPageNumbers = () => {
    const pages = [];

    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`border border-black px-3 py-1 rounded ${
          currentPage === 1 ? "bg-black text-white" : ""
        }`}
      >
        1
      </button>
    );

    if (totalPages > 1) {
      if (currentPage > 3) {
        pages.push(<span key="ellipsis1">...</span>);
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (i !== 1 && i !== totalPages) {
          pages.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`border px-3 py-1 rounded cursor-pointer ${
                currentPage === i ? "bg-black text-white" : ""
              }`}
            >
              {i}
            </button>
          );
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push(<span key="ellipsis2">...</span>);
      }

      if (totalPages > 1) {
        pages.push(
          <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className={`border px-3 py-1 rounded cursor-pointer ${
              currentPage === totalPages ? "bg-black text-white" : ""
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <nav className="flex items-center gap-2">
      <button
        className="border px-3 py-1 rounded cursor-pointer" 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {renderPageNumbers()}

      <button
        className="border px-3 py-1 rounded cursor-pointer"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
