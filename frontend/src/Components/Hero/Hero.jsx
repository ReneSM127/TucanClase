import React from 'react';
import { Link } from "react-router-dom";
import './Hero.css';
import imagen from '../Assets/home.jpeg';


const Hero = () => {
  // Lista de materias ccon enlaces a las futuras páginas, por el momento no hacen nada más que la animación 
  const subjects = [
    { name: "MATEMÁTICAS", url: "/matematicas" },
    { name: "LITERATURA", url: "/literatura" },
    { name: "CIENCIA", url: "/ciencia" },
    { name: "ÉTICA", url: "/etica" },
    { name: "LENGUA EXTRANJERA", url: "/lengua-extranjera" },
    { name: "ECONOMÍA", url: "/economia" },
    { name: "MAS...", url: "/mas" }
  ];

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Desbloquea Tu potencial</h1>
        <h2>con tutorías de primer nivel</h2>
        <p>Aprende de la mano de tus compañeros</p>
        
        <div className="hero-buttons">
          <Link to="/Tutorial">
           <button className="hero-button">Ver tutorías</button>
          </Link>
        </div>
      </div>
      
      <div className="hero-divider"></div>
      
      <div className="hero-lesson">
        <div className="video-container">
          <img src={imagen} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;