import React from 'react';
import './Rating.css'; // Opcional: si quieres estilos específicos

const Rating = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {/* Estrellas llenas */}
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="star full">★</span>
      ))}
      
      {/* Media estrella (si aplica) */}
      {hasHalfStar && <span className="star half">★</span>}
      
      {/* Estrellas vacías */}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="star empty">★</span>
      ))}
      
      {/* Texto opcional con el valor numérico */}
      <span className="rating-text">({parseFloat(rating).toFixed(1)})</span>
    </div>
  );
};

export default Rating;