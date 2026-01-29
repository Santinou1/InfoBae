import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { UsersPage } from './pages/UsersPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('posts');

  // Simple routing sin react-router
  const renderPage = () => {
    switch (currentPage) {
      case 'users':
        return <UsersPage />;
      default:
        return <HomePage />;
    }
  };

  // Pasar función de navegación a través de context o props
  window.navigateTo = setCurrentPage;

  return renderPage();
}

export default App;
