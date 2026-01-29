import { ASSETS } from '../../../constants/assets';
import './EmptyState.css';

export const EmptyState = ({ 
  title = 'No hay contenido disponible', 
  description = 'Intenta recargar la página o vuelve más tarde',
  image = ASSETS.PLACEHOLDER_IMAGE 
}) => {
  return (
    <div className="empty-state">
      <img src={image} alt="Empty state" className="empty-state-image" />
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
    </div>
  );
};
