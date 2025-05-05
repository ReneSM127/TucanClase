import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Inicio</h3>
          <ul>
            <li>Beneficios</li>
            <li>Tutorias</li>
            <li>Testimonios</li>
            <li>Preguntas frecuentes</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Sobre Nosotros</h3>
          <ul>
            <li>Vision</li>
            <li>Logros</li>
            <li>Metas</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contacto</h3>
          <p className="contact-item">
            <span role="img" aria-label="email">📞</span>
            L21530365@concun.tecnm.mx
          </p>
          <p className="contact-item">
            <span role="img" aria-label="teléfono">📄</span>
            +52 998 381 4748
          </p>
          <p className="contact-item">
            <span role="img" aria-label="ubicación">📌</span>
            Cancun, Quintana Roo, MX
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© TucanClase.</p>
      </div>
    </footer>
  );
};

export default Footer;