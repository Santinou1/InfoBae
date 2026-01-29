import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { UsersPage } from './pages/UsersPage';
import { FavoritesPage } from './pages/FavoritesPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('posts');

  // Simple routing sin react-router
  const renderPage = () => {
    switch (currentPage) {
      case 'users':
        return <UsersPage />;
      case 'favorites':
        return <FavoritesPage />;
      default:
        return <HomePage />;
    }
  };

  // Pasar función de navegación a través de context o props
  window.navigateTo = setCurrentPage;

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error('VITE_GOOGLE_CLIENT_ID not found in environment variables');
    return <div>Error: Google Client ID not configured</div>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        {renderPage()}
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
