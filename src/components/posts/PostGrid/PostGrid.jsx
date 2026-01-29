import { PostCard } from '../PostCard/PostCard';
import { SkeletonCard } from '../../common/Skeleton/Skeleton';
import { EmptyState } from '../../common/EmptyState/EmptyState';
import './PostGrid.css';

export const PostGrid = ({ posts, loading, error, onPostClick, commentsCount = {} }) => {
  if (loading) {
    return (
      <div className="post-grid">
        {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Error al cargar los posts"
        description={error}
      />
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <EmptyState
        title="No hay posts disponibles"
        description="No se encontraron posts para mostrar"
      />
    );
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          onClick={onPostClick}
          commentsCount={commentsCount[post.id]}
        />
      ))}
    </div>
  );
};
