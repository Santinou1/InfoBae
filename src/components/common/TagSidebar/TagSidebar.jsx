import { useState } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import './TagSidebar.css';

export const TagSidebar = ({ 
  tags = [], 
  selectedTag, 
  onTagSelect, 
  onClearTag,
  isOpen,
  onToggle,
  loading 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar tags basado en búsqueda
  const filteredTags = searchTerm
    ? tags.filter(tag => tag && tag.toLowerCase().includes(searchTerm.toLowerCase()))
    : tags;

  // Mostrar solo 10 tags inicialmente si no hay búsqueda
  const displayedTags = searchTerm ? filteredTags : filteredTags.slice(0, 10);

  return (
    <>
      {/* Botón flotante para abrir sidebar */}
      <button 
        className={`tag-sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
        title="Filtrar por tags"
      >
        {isOpen ? '✕' : '🏷️'}
      </button>

      {/* Overlay oscuro cuando está abierto */}
      {isOpen && (
        <div className="tag-sidebar-overlay" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <aside className={`tag-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="tag-sidebar-header">
          <h3 className="tag-sidebar-title">
            🏷️ Filtrar por Tags
          </h3>
          {selectedTag && (
            <button 
              className="tag-sidebar-clear-all"
              onClick={onClearTag}
            >
              Limpiar
            </button>
          )}
        </div>

        <div className="tag-sidebar-search">
          <input
            type="text"
            placeholder="Buscar tags..."
            value={searchTerm}
            onChange={(e) => {
              e.stopPropagation();
              setSearchTerm(e.target.value);
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            className="tag-sidebar-search-input"
          />
        </div>

        <div className="tag-sidebar-content">
          {loading ? (
            <div className="tag-sidebar-loading">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} height="32px" borderRadius="16px" />
              ))}
            </div>
          ) : (
            <>
              {displayedTags.length > 0 ? (
                <>
                  <div className="tag-sidebar-chips">
                    {displayedTags.map((tag) => (
                      <button
                        key={tag}
                        className={`tag-chip ${selectedTag === tag ? 'active' : ''}`}
                        onClick={() => onTagSelect(tag)}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                  
                  {!searchTerm && filteredTags.length > 10 && (
                    <p className="tag-sidebar-hint">
                      💡 Usa el buscador para ver los {filteredTags.length - 10} tags restantes
                    </p>
                  )}

                  {searchTerm && (
                    <p className="tag-sidebar-results">
                      {displayedTags.length} resultado{displayedTags.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </>
              ) : (
                <p className="tag-sidebar-empty">
                  No se encontraron tags con "{searchTerm}"
                </p>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
};
