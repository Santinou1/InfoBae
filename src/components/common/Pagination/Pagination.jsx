import './Pagination.css';

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  loading,
  hasMore 
}) => {
  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasMore || currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage < 3) {
        for (let i = 0; i < 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages - 1);
      } else if (currentPage > totalPages - 4) {
        pages.push(0);
        pages.push('...');
        for (let i = totalPages - 4; i < totalPages; i++) pages.push(i);
      } else {
        pages.push(0);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages - 1);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1 && !hasMore) return null;

  return (
    <div className="pagination">
      <button
        className="pagination-button pagination-prev"
        onClick={handlePrevious}
        disabled={currentPage === 0 || loading}
      >
        ← Anterior
      </button>

      <div className="pagination-numbers">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`pagination-number ${
                currentPage === page ? 'active' : ''
              }`}
              onClick={() => onPageChange(page)}
              disabled={loading}
            >
              {page + 1}
            </button>
          )
        ))}
      </div>

      <button
        className="pagination-button pagination-next"
        onClick={handleNext}
        disabled={(!hasMore && currentPage >= totalPages - 1) || loading}
      >
        Siguiente →
      </button>
    </div>
  );
};
