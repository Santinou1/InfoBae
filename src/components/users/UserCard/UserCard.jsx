import { ASSETS } from '../../../constants/assets';
import './UserCard.css';

export const UserCard = ({ user, onClick }) => {
  return (
    <article className="user-card" onClick={() => onClick(user)}>
      <img
        src={user.picture || ASSETS.PLACEHOLDER_IMAGE}
        alt={`${user.firstName} ${user.lastName}`}
        className="user-card-image"
        onError={(e) => {
          e.target.src = ASSETS.PLACEHOLDER_IMAGE;
        }}
      />
      <div className="user-card-content">
        <h3 className="user-card-name">
          {user.title} {user.firstName} {user.lastName}
        </h3>
        <p className="user-card-email">{user.email}</p>
      </div>
    </article>
  );
};
