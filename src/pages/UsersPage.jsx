import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../components/auth/ProtectedRoute/ProtectedRoute';
import { Header } from '../components/layout/Header/Header';
import { UserGrid } from '../components/users/UserGrid/UserGrid';
import { Pagination } from '../components/common/Pagination/Pagination';
import { Modal } from '../components/common/Modal/Modal';
import { UserDetail } from '../components/users/UserDetail/UserDetail';
import { PostDetail } from '../components/posts/PostDetail/PostDetail';
import { useUsers } from '../hooks/useUsers';
import './UsersPage.css';

export const UsersPage = () => {
  const { 
    users, 
    loading, 
    error,
    page,
    setPage,
    total,
    totalPages,
    hasMore
  } = useUsers({ limit: 20 });
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // Scroll to top cuando cambia la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <ProtectedRoute>
      <div className="app">
        <Header />
        <main className="users-main">
          <div className="users-content">
            <div className="users-header">
              <h2 className="users-title">Usuarios</h2>
              <p className="users-stats">
                Mostrando {users.length} de {total} usuarios
                {page > 0 && ` - Página ${page + 1} de ${totalPages}`}
              </p>
            </div>

            <UserGrid 
              users={users} 
              loading={loading} 
              error={error}
              onUserClick={handleUserClick}
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              loading={loading}
              hasMore={hasMore}
            />
          </div>
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
    </ProtectedRoute>
  );
};
