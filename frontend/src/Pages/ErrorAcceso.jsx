import React from 'react';
import '../Styles/ErrorAcceso.css';
import Tucan from '../Components/Assets/Tucan.gif';

const AccessDenied = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <img src={Tucan} alt="Acceso denegado" className="error-gif" />
        <h1>Acceso restringido</h1>
        <p>No tienes permisos para acceder a esta sección. Por favor inicia sesión con una cuenta autorizada.</p>
        <div className="error-actions">
          <a href="/login" className="error-button">Iniciar sesión</a>
          <a href="/registro" className="error-button secondary">Crear cuenta</a>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;