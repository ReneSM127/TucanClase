import React from 'react';
import './Beneficios.css';

const Beneficios = () => {
  const benefits = [
    {
      number: '01',
      title: 'Horarios Flexibles',
      description: 'Adapta las tutorías a tu disponibilidad y aprende a tu propio ritmo.'
    },
    {
      number: '02',
      title: 'Instrucción de Expertos',
      description: 'Aprende de tutores especializados en cada materia con experiencia en enseñanza.'
    },
    {
      number: '03',
      title: 'Variedad de Materias',
      description: 'Recibe apoyo en matemáticas, ciencias, español, e historia con material actualizado.'
    },
    {
      number: '04',
      title: 'Planes de Estudio Actualizados',
      description: 'Contenido alineado con los programas educativos vigentes para garantizar tu aprendizaje.'
    },
    {
      number: '05',
      title: 'Ejercicios y Prácticas',
      description: 'Accede a ejercicios personalizados y pruebas para reforzar tus conocimientos.'
    },
    {
      number: '06',
      title: 'Aprendizaje Interactivo',
      description: 'Interactúa con otros estudiantes y tutores para resolver dudas y mejorar tu comprensión.'
    }
  ];

  return (
    <section className="benefits-section">
      <div className="benefits-header">
        <h2>Beneficios</h2>
        <p>Refuerza tus conocimientos con tutorías personalizadas y mejora tu rendimiento académico de forma sencilla y efectiva</p>
        <a href="#ver-todo" className="see-all">Ver todo</a>
      </div>
      
      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <div key={benefit.number} className="benefit-card">
            <span className="benefit-number">{benefit.number}</span>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Beneficios;