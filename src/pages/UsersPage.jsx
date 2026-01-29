import { useState } from 'react';
import { Header } from '../components/layout/Header/Header';
import { UserGrid } from '../components/users/UserGrid/UserGrid';
import { Modal } from '../components/common/Modal/Modal';
import { UserDetail } from '../components/users/UserDetail/UserDetail';
import { PostDetail } from '../components/posts/PostDetail/PostDetail';
import { useUsers } from '../hooks/useUsers';

export const UsersPage = () => {
  const { users, loading, error } = useUsers({ limit: 20 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseUserModal = () => {
    setSelectedUser(null);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePostModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="app">
      <Header />
      <main>
        <UserGrid 
          users={users} 
          loading={loading} 
          error={error}
          onUserClick={handleUserClick}
        />
      </main>

      <Modal
        isOpen={!!selectedUser}
        onClose={handleCloseUserModal}
        title="Perfil de Usuario"
      >
        {selectedUser && (
          <UserDetail 
            user={selectedUser} 
            onPostClick={handlePostClick}
          />
        )}
      </Modal>

      <Modal
        isOpen={!!selectedPost}
        onClose={handleClosePostModal}
        title="Detalle del Post"
      >
        {selectedPost && <PostDetail post={selectedPost} />}
      </Modal>
    </div>
  );
};
