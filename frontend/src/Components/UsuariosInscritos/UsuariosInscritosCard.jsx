import React from "react";
import "../../Styles/Tutores.css";
import { useNavigate } from "react-router-dom";

const UsuariosInscritosCard = ({ estudiante, esTutor, onDeleteStudent }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/perfil/${estudiante.id_estudiante}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Evita que se active el navigate al hacer clic en eliminar
    onDeleteStudent(estudiante.id_inscripcion);
  };

  return (
    <div className="tutor-card">
      <div className="tutor-header">
        <h3>{estudiante.nombre_estudiante}</h3>
      </div>
      <div className="instructor-avatar">
        {estudiante.nombre_estudiante.charAt(0)}
      </div>
      <div className="card-buttons">
        <button className="profile-button" onClick={handleClick}>
          Revisar Perfil
        </button>
        {esTutor && (
          <button className="delete-button" onClick={handleDelete}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default UsuariosInscritosCard;