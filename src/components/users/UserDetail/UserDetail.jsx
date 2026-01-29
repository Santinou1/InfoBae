import { ASSETS } from '../../../constants/assets';
import { PostGrid } from '../../posts/PostGrid/PostGrid';
import { useUserPosts } from '../../../hooks/useUserPosts';
import './UserDetail.css';

export const UserDetail = ({ user, onPostClick }) => {
  const { posts, loading, error } = useUserPosts(user.id);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="user-detail">
      <div className="user-detail-header">
        <img
          src={user.picture || ASSETS.PLACEHOLDER_IMAGE}
          alt={`${user.firstName} ${user.lastName}`}
          className="user-detail-avatar"
          onError={(e) => {
            e.target.src = ASSETS.PLACEHOLDER_IMAGE;
          }}
        />
        <div className="user-detail-info">
          <h2 className="user-detail-name">
            {user.title} {user.firstName} {user.lastName}
          </h2>
          <p className="user-detail-email">{user.email}</p>
          {user.dateOfBirth && (
            <p className="user-detail-birth">
              Fecha de nacimiento: {formatDate(user.dateOfBirth)}
            </p>
          )}
          {user.phone && (
            <p className="user-detail-phone">Teléfono: {user.phone}</p>
          )}
        </div>
      </div>

      {user.location && (
        <div className="user-detail-location">
          <h3 className="user-detail-section-title">📍 Ubicación</h3>
          <p className="user-detail-location-text">
            {user.location.street}, {user.location.city}, {user.location.state}, {user.location.country}
          </p>
        </div>
      )}

      <div className="user-detail-posts">
        <h3 className="user-detail-section-title">
          Posts del usuario ({posts.length})
        </h3>
        <PostGrid 
          posts={posts} 
          loading={loading} 
          error={error}
          onPostClick={onPostClick}
        />
      </div>
    </div>
  );
};
