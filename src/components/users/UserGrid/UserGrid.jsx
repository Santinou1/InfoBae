import { UserCard } from '../UserCard/UserCard';
import { SkeletonCard } from '../../common/Skeleton/Skeleton';
import { EmptyState } from '../../common/EmptyState/EmptyState';
import './UserGrid.css';

export const UserGrid = ({ users, loading, error, onUserClick }) => {
  if (loading) {
    return (
      <div className="user-grid">
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Error al cargar los usuarios"
        description={error}
      />
    );
  }

  if (!users || users.length === 0) {
    return (
      <EmptyState
        title="No hay usuarios disponibles"
        description="No se encontraron usuarios para mostrar"
      />
    );
  }

  return (
    <div className="user-grid">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onClick={onUserClick} />
      ))}
    </div>
  );
};
