import './Header.css';

export const Header = () => {
  const handleNavigation = (page) => {
    if (window.navigateTo) {
      window.navigateTo(page);
    }
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
        </nav>
      </div>
    </header>
  );
};
