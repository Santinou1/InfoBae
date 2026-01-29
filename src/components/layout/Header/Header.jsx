import { useAuth } from '../../../context/AuthContext';
import './Header.css';

export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleNavigation = (page) => {
    if (window.navigateTo) {
      window.navigateTo(page);
    }
  };

  const handleLogout = () => {
    logout();
    handleNavigation('posts');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" onClick={() => handleNavigation('posts')}>
          <h1>InfoPosts</h1>
        </div>
        <nav className="header-nav">
          <a 
            href="#" 
            className="header-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('posts');
            }}
          >
            Posts
          </a>
          <a 
            href="#" 
            className="header-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('users');
            }}
          >
            Usuarios
          </a>
          {isAuthenticated && (
            <a 
              href="#" 
              className="header-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('favorites');
              }}
            >
              ❤️ Favoritos
            </a>
          )}
          
          {isAuthenticated && (
            <div className="header-user">
              <img 
                src={user.picture} 
                alt={user.name}
                className="header-user-avatar"
              />
              <span className="header-user-name">{user.givenName}</span>
              <button 
                className="header-logout"
                onClick={handleLogout}
                title="Cerrar sesión"
              >
                Salir
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
