import React from 'react';
import "../Styles/Error404.css";
import Tucan from '../Components/Assets/Tucan.gif';

const NotFound = () => {
  return (
    <div className="error-container">
      <div className="error-content"> 
        <img src={Tucan} alt="Error 404" className="error-gif" />
        <h1>¡Ups! Página no encontrada</h1>
        <p>Lo sentimos Tucancito, la página que buscas no existe o ha sido movida.</p>
        <div className="error-actions">
          <a href="/" className="error-button">Volver al inicio</a>
          <a href="/tutorial" className="error-button secondary">Ver tutorías</a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;