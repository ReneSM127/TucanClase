import React from "react";
import "../../Styles/Tutores.css";
import { useNavigate } from "react-router-dom";

const UsuariosInscritosCard = ({ estudiante }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/perfil/${estudiante.id_estudiante}`);
  };
  return (
    <div className="tutor-card">
      <div className="tutor-header">
        <h3>
          {estudiante.nombre_estudiante}
        </h3>
      </div>
      <div className="instructor-avatar">{estudiante.nombre_estudiante.charAt(0)}</div>
      <button className="profile-button" onClick={handleClick}>
        Revisar Perfil
      </button>
    </div>
  );
};

export default UsuariosInscritosCard;
