import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header/Header';
import { useFavorites } from '../hooks/useFavorites';
import { usePosts } from '../hooks/usePosts';
import { PostCard } from '../components/posts/PostCard/PostCard';
import { PostDetail } from '../components/posts/PostDetail/PostDetail';
import { Modal } from '../components/common/Modal/Modal';
import { EmptyState } from '../components/common/EmptyState/EmptyState';
import { Skeleton } from '../components/common/Skeleton/Skeleton';
import { useCommentsCount } from '../hooks/useCommentsCount';
import { ASSETS } from '../constants/assets';
import './FavoritesPage.css';

export const FavoritesPage = () => {
  const { favorites, loading: favoritesLoading } = useFavorites();
  const { posts, loading: postsLoading } = usePosts({ limit: 50 });
  const [selectedPost, setSelectedPost] = useState(null);

  // Filtrar posts que están en favoritos
  const favoritePosts = posts.filter(post => 
    favorites.some(fav => fav.postId === post.id)
  );

  // Obtener conteo de comentarios
  const { commentsCount } = useCommentsCount(favoritePosts);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const loading = favoritesLoading || postsLoading;

  return (
    <div className="app">
      <Header />
      <main className="favorites-page">
        <div className="favorites-content">
          <div className="favorites-header">
            <h1 className="favorites-title">Mis Favoritos</h1>
            {!loading && favorites.length > 0 && (
              <span className="favorites-count">
                {favorites.length} {favorites.length === 1 ? 'post' : 'posts'}
              </span>
            )}
          </div>

          {loading ? (
            <div className="favorites-grid">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} type="post" />
              ))}
            </div>
          ) : favorites.length === 0 ? (
            <EmptyState
              image={ASSETS.PLACEHOLDER_IMAGE}
              title="No tienes favoritos aún"
              description="Guarda tus posts favoritos haciendo click en el corazón"
            />
          ) : (
            <div className="favorites-grid">
              {favoritePosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={handlePostClick}
                  commentsCount={commentsCount[post.id]}
                />
              ))}
            </div>
          )}
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
