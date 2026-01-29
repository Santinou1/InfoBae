import { ASSETS } from '../../../constants/assets';
import './CommentCard.css';

export const CommentCard = ({ comment }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="comment-card">
      <img
        src={comment.owner?.picture || ASSETS.PLACEHOLDER_IMAGE}
        alt={`${comment.owner?.firstName} ${comment.owner?.lastName}`}
        className="comment-avatar"
        onError={(e) => {
          e.target.src = ASSETS.PLACEHOLDER_IMAGE;
        }}
      />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">
            {comment.owner?.title} {comment.owner?.firstName} {comment.owner?.lastName}
          </span>
          <span className="comment-date">{formatDate(comment.publishDate)}</span>
        </div>
        <p className="comment-message">{comment.message}</p>
      </div>
    </div>
  );
};
