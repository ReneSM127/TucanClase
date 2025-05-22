import React from 'react';
import '../../Styles/Tutores.css';

const TutorCardFeatured = ({ tutor }) => {
  return (
    <div className="tutor-card featured">
      <div className="tutor-avatar">
      </div>
      <div className="tutor-info">
        <h3>{tutor.nombre} {tutor.apellido} </h3>
        <p className="subject">{tutor.descripcion}</p>
      </div>
    </div>
  );
};

export default TutorCardFeatured;