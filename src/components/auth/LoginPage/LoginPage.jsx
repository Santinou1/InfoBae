import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../../context/AuthContext';
import { ASSETS } from '../../../constants/assets';
import './LoginPage.css';

export const LoginPage = () => {
  const { login } = useAuth();

  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      
      const userData = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        givenName: decoded.given_name,
        familyName: decoded.family_name,
      };

      console.log('Login successful:', userData);
      login(userData);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">InfoPosts</h1>
          <p className="login-subtitle">Inicia sesión para ver usuarios</p>
        </div>

        <div className="login-illustration">
          <img 
            src={ASSETS.PLACEHOLDER_IMAGE} 
            alt="Login illustration" 
            className="login-image"
          />
        </div>

        <div className="login-content">
          <h2 className="login-welcome">Bienvenido</h2>
          <p className="login-description">
            Accede con tu cuenta de Google para explorar perfiles de usuarios y sus posts
          </p>

          <div className="login-button-container">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              useOneTap
              theme="filled_blue"
              size="large"
              text="signin_with"
              shape="rectangular"
            />
          </div>

          <div className="login-info">
            <p className="login-info-text">
              🔒 Tu información está segura. Solo usamos tu cuenta de Google para autenticación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
