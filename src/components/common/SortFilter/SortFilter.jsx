import './SortFilter.css';

export const SortFilter = ({ selectedSort, onSortChange }) => {
  const sortOptions = [
    { value: 'recent', label: '🕒 Más recientes', icon: '🕒' },
    { value: 'likes', label: '❤️ Más likes', icon: '❤️' },
    { value: 'comments', label: '💬 Más comentados', icon: '💬' },
  ];

  return (
    <div className="sort-filter">
      <label className="sort-filter-label">Ordenar por:</label>
      <div className="sort-filter-options">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            className={`sort-filter-button ${
              selectedSort === option.value ? 'active' : ''
            }`}
            onClick={() => onSortChange(option.value)}
          >
            <span className="sort-filter-icon">{option.icon}</span>
            <span className="sort-filter-text">{option.label.replace(option.icon + ' ', '')}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
