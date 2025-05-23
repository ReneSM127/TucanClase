import React from "react";
import "../../Styles/Tutores.css";
import { useNavigate } from "react-router-dom";

//onClick={() => window.location.href=`/tutoria/${tutoria.tutoria_id}`}
const TutorCard = ({ tutor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/perfil/${tutor.id}`);
  };
  return (
    <div className="tutor-card">
      <div className="tutor-header">
        <h3>
          {tutor.nombre} {tutor.apellidos}
        </h3>
      </div>
      <div className="instructor-avatar">{tutor.nombre.charAt(0) + tutor.apellidos.charAt(0)}</div>

      <p className="description">{tutor.descripcion}</p>
      <button className="profile-button" onClick={handleClick}>
        Revisar Perfil
      </button>
    </div>
  );
};

export default TutorCard;
