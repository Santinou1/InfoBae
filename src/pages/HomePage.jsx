import { useState, useMemo, useEffect } from 'react';
import { Header } from '../components/layout/Header/Header';
import { PostGrid } from '../components/posts/PostGrid/PostGrid';
import { TagSidebar } from '../components/common/TagSidebar/TagSidebar';
import { SortFilter } from '../components/common/SortFilter/SortFilter';
import { Pagination } from '../components/common/Pagination/Pagination';
import { Modal } from '../components/common/Modal/Modal';
import { PostDetail } from '../components/posts/PostDetail/PostDetail';
import { usePosts } from '../hooks/usePosts';
import { useTags } from '../hooks/useTags';
import { usePostsByTag } from '../hooks/usePostsByTag';
import { useCommentsCount } from '../hooks/useCommentsCount';
import { sortPosts } from '../utils/sortPosts';
import './HomePage.css';

export const HomePage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  // Cargar todos los posts o posts filtrados por tag
  const { 
    posts: allPosts, 
    loading: loadingAllPosts, 
    error: errorAllPosts,
    page: allPostsPage,
    setPage: setAllPostsPage,
    total: allPostsTotal,
    totalPages: allPostsTotalPages,
    hasMore: allPostsHasMore
  } = usePosts({ limit: 20 });
  
  const { 
    posts: tagPosts, 
    loading: loadingTagPosts, 
    error: errorTagPosts,
    page: tagPostsPage,
    setPage: setTagPostsPage,
    total: tagPostsTotal,
    totalPages: tagPostsTotalPages,
    hasMore: tagPostsHasMore
  } = usePostsByTag(selectedTag, { limit: 20 });

  // Cargar todos los tags
  const { tags, loading: loadingTags } = useTags();

  // Determinar qué posts mostrar (antes de ordenar)
  const basePosts = selectedTag ? tagPosts : allPosts;
  const loading = selectedTag ? loadingTagPosts : loadingAllPosts;
  const error = selectedTag ? errorTagPosts : errorAllPosts;
  const currentPage = selectedTag ? tagPostsPage : allPostsPage;
  const setCurrentPage = selectedTag ? setTagPostsPage : setAllPostsPage;
  const total = selectedTag ? tagPostsTotal : allPostsTotal;
  const totalPages = selectedTag ? tagPostsTotalPages : allPostsTotalPages;
  const hasMore = selectedTag ? tagPostsHasMore : allPostsHasMore;

  // Obtener conteo de comentarios para ordenamiento
  const { commentsCount, loading: loadingComments } = useCommentsCount(basePosts);

  // Ordenar posts según el criterio seleccionado
  const posts = useMemo(() => {
    return sortPosts(basePosts, sortBy, commentsCount);
  }, [basePosts, sortBy, commentsCount]);

  // Scroll to top cuando cambia la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  const handleClearTag = () => {
    setSelectedTag(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="app">
      <Header />
      <main className="home-main">
        <TagSidebar
          tags={tags}
          selectedTag={selectedTag}
          onTagSelect={handleTagSelect}
          onClearTag={handleClearTag}
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          loading={loadingTags}
        />
        
        <div className="home-content">
          <div className="home-filters">
            {selectedTag && (
              <div className="home-filter-badge">
                <span className="home-filter-text">
                  Filtrando por: <strong>#{selectedTag}</strong>
                </span>
                <button className="home-filter-clear" onClick={handleClearTag}>
                  ✕ Limpiar
                </button>
              </div>
            )}
            
            <SortFilter 
              selectedSort={sortBy} 
              onSortChange={handleSortChange}
            />
          </div>

          {sortBy === 'comments' && loadingComments && (
            <div className="home-loading-message">
              ⏳ Cargando conteo de comentarios... (algunos posts pueden no tener comentarios disponibles)
            </div>
          )}

          <div className="home-stats">
            <p className="home-stats-text">
              Mostrando {posts.length} de {total} posts
              {currentPage > 0 && ` - Página ${currentPage + 1} de ${totalPages}`}
            </p>
          </div>
          
          <PostGrid 
            posts={posts} 
            loading={loading} 
            error={error}
            onPostClick={handlePostClick}
            commentsCount={commentsCount}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={loading}
            hasMore={hasMore}
          />
        </div>
      </main>

      <Modal
        isOpen={!!selectedPost}
        onClose={handleCloseModal}
        title="Detalle del Post"
      >
        {selectedPost && <PostDetail post={selectedPost} />}
      </Modal>
    </div>
  );
};
