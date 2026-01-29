import { ASSETS } from '../../../constants/assets';
import { CommentList } from '../../comments/CommentList/CommentList';
import { useComments } from '../../../hooks/useComments';
import './PostDetail.css';

export const PostDetail = ({ post }) => {
  const { comments, loading, error } = useComments(post.id);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="post-detail">
      <div className="post-detail-image-container">
        <img
          src={post.image || ASSETS.PLACEHOLDER_IMAGE}
          alt={post.text}
          className="post-detail-image"
          onError={(e) => {
            e.target.src = ASSETS.PLACEHOLDER_IMAGE;
          }}
        />
      </div>

      <div className="post-detail-content">
        {post.tags && post.tags.length > 0 && (
          <div className="post-detail-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="post-detail-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <p className="post-detail-text">{post.text}</p>

        <div className="post-detail-meta">
          <div className="post-detail-author">
            <img
              src={post.owner?.picture || ASSETS.PLACEHOLDER_IMAGE}
              alt={`${post.owner?.firstName} ${post.owner?.lastName}`}
              className="post-detail-avatar"
              onError={(e) => {
                e.target.src = ASSETS.PLACEHOLDER_IMAGE;
              }}
            />
            <div className="post-detail-author-info">
              <p className="post-detail-author-name">
                {post.owner?.title} {post.owner?.firstName} {post.owner?.lastName}
              </p>
              <p className="post-detail-date">{formatDate(post.publishDate)}</p>
            </div>
          </div>

          <div className="post-detail-likes">
            <span className="post-detail-likes-icon">❤️</span>
            <span className="post-detail-likes-count">{post.likes} likes</span>
          </div>
        </div>
      </div>

      <div className="post-detail-comments">
        <h3 className="post-detail-comments-title">
          Comentarios ({comments.length})
        </h3>
        <CommentList comments={comments} loading={loading} error={error} />
      </div>
    </div>
  );
};
