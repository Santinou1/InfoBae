import { CommentCard } from '../CommentCard/CommentCard';
import { Skeleton } from '../../common/Skeleton/Skeleton';
import { EmptyState } from '../../common/EmptyState/EmptyState';
import './CommentList.css';

export const CommentList = ({ comments, loading, error }) => {
  if (loading) {
    return (
      <div className="comment-list">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="comment-skeleton">
            <Skeleton width="40px" height="40px" borderRadius="50%" />
            <div className="comment-skeleton-content">
              <Skeleton width="120px" height="14px" />
              <Skeleton width="100%" height="16px" className="mt-sm" />
              <Skeleton width="80%" height="16px" className="mt-xs" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Error al cargar comentarios"
        description={error}
      />
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <EmptyState
        title="No hay comentarios"
        description="Sé el primero en comentar este post"
      />
    );
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
