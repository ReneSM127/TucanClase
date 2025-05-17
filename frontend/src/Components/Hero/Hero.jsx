import React from 'react';
import './Hero.css';


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
        <h2>con tutorías y material de apoyo</h2>
        <p>Aprende de la mano de tus compañeros</p>
        
        <div className="hero-buttons">
          <Link to="/Tutorial">
            <button>Ver Tutorias</button>
          </Link>
          <button className="hero-button">Ver Precios</button>
        </div>
      </div>
      
      <div className="hero-divider"></div>
      
      <div className="hero-subjects">
        <div className="subjects-list">
          {subjects.map((subject, index) => (
            <React.Fragment key={subject.name}>
              <a href={subject.url} className="subject-link">{subject.name}</a>
              {index < subjects.length - 1 && <span className="separator"> | </span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="hero-lesson">
        <h3>LESSON 1</h3>
        <div className="video-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/oR_LmLb-Xes" 
            title="Video de lección" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </section>
  );
};

export default Hero;