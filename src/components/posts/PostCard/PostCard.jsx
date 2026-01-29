import { ASSETS } from '../../../constants/assets';
import { FavoriteButton } from '../../common/FavoriteButton/FavoriteButton';
import './PostCard.css';

export const PostCard = ({ post, onClick, commentsCount }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Mostrar contador solo si está disponible y es mayor a 0
  const showCommentsCount = commentsCount !== undefined && commentsCount !== null;

  return (
    <article className="post-card" onClick={() => onClick(post)}>
      {/* Botón de favorito */}
      <FavoriteButton postId={post.id} />
      
      <div className="post-card-image-container">
        <img
          src={post.image || ASSETS.PLACEHOLDER_IMAGE}
          alt={post.text}
          className="post-card-image"
          onError={(e) => {
            e.target.src = ASSETS.PLACEHOLDER_IMAGE;
          }}
        />
        {post.tags && post.tags.length > 0 && (
          <div className="post-card-tags">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="post-card-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="post-card-content">
        <p className="post-card-text">{post.text}</p>
        
        <div className="post-card-footer">
          <div className="post-card-author">
            <img
              src={post.owner?.picture || ASSETS.PLACEHOLDER_IMAGE}
              alt={`${post.owner?.firstName} ${post.owner?.lastName}`}
              className="post-card-avatar"
              onError={(e) => {
                e.target.src = ASSETS.PLACEHOLDER_IMAGE;
              }}
            />
            <div className="post-card-author-info">
              <p className="post-card-author-name">
                {post.owner?.title} {post.owner?.firstName} {post.owner?.lastName}
              </p>
              <p className="post-card-date">{formatDate(post.publishDate)}</p>
            </div>
          </div>
          
          <div className="post-card-stats">
            <div className="post-card-likes">
              <span className="post-card-likes-icon">❤️</span>
              <span className="post-card-likes-count">{post.likes}</span>
            </div>
            {showCommentsCount && (
              <div className="post-card-comments">
                <span className="post-card-comments-icon">💬</span>
                <span className="post-card-comments-count">{commentsCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
