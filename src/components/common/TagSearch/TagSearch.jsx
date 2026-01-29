import { useState, useRef, useEffect } from 'react';
import './TagSearch.css';

export const TagSearch = ({ tags = [], onTagSelect, selectedTag }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);

  // Filtrar tags basado en el término de búsqueda
  const filteredTags = searchTerm
    ? tags.filter(tag => 
        tag && tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tags.slice(0, 10); // Mostrar solo 10 tags inicialmente

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleTagClick = (tag) => {
    onTagSelect(tag);
    setSearchTerm('');
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleClearFilter = () => {
    onTagSelect(null);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredTags.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredTags[highlightedIndex]) {
          handleTagClick(filteredTags[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="tag-search" ref={searchRef}>
      <div className="tag-search-input-container">
        <span className="tag-search-icon">🔍</span>
        <input
          type="text"
          className="tag-search-input"
          placeholder="Buscar por tag..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {selectedTag && (
          <button 
            className="tag-search-clear"
            onClick={handleClearFilter}
            title="Limpiar filtro"
          >
            ✕
          </button>
        )}
      </div>

      {selectedTag && (
        <div className="tag-search-selected">
          <span className="tag-search-selected-label">Filtrando por:</span>
          <span className="tag-search-selected-tag">
            #{selectedTag}
          </span>
        </div>
      )}

      {isOpen && filteredTags.length > 0 && (
        <div className="tag-search-dropdown">
          <div className="tag-search-dropdown-header">
            {searchTerm ? (
              <span>Resultados ({filteredTags.length})</span>
            ) : (
              <span>Tags populares (mostrando 10 de {tags.length})</span>
            )}
          </div>
          <ul className="tag-search-list">
            {filteredTags.map((tag, index) => (
              <li
                key={tag}
                className={`tag-search-item ${
                  index === highlightedIndex ? 'highlighted' : ''
                } ${selectedTag === tag ? 'selected' : ''}`}
                onClick={() => handleTagClick(tag)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span className="tag-search-item-icon">#</span>
                <span className="tag-search-item-text">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && searchTerm && filteredTags.length === 0 && (
        <div className="tag-search-dropdown">
          <div className="tag-search-empty">
            No se encontraron tags con "{searchTerm}"
          </div>
        </div>
      )}
    </div>
  );
};
