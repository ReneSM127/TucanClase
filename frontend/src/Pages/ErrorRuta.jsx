import React from 'react';
import '../Styles/ErrorRuta.css';
import Tucan from '../Components/Assets/Tucan.gif';

const RouteNotFound = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <img src={Tucan} alt="Ruta no encontrada" className="error-gif" />
        <h1>Ruta no disponible</h1>
        <p>La dirección que ingresaste no corresponde a una ruta válida en nuestra plataforma.</p>
        <div className="error-actions">
          <a href="/" className="error-button">Ir al inicio</a>
          <a href="/contacto" className="error-button secondary">Reportar problema</a>
        </div>
      </div>
    </div>
  );
};

export default RouteNotFound;