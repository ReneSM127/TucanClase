import React from 'react';
import '../../Styles/Tutores.css';
//onClick={() => window.location.href=`/tutoria/${tutoria.tutoria_id}`}
const TutorCard = ({ tutor }) => {
  return (
    <div className="tutor-card">
      <div className="tutor-header">
        <h3>{tutor.nombre} {tutor.apellidos}</h3>
      </div>
      <p className="description">{tutor.descripcion}</p>
      <button className="profile-button" onClick={() => window.location.href=`/perfil/${tutor.id}`}>Revisar Perfil</button>
    </div>
  );
};

export default TutorCard;