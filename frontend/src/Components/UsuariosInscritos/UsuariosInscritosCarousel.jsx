import React from 'react';
import '../../Styles/Tutores.css';
import UsuariosInscritosCard from './UsuariosInscritosCard';

const UsuariosInscritosCarousel = ({ estudiantes }) => {
  return (
    <div className="tutors-carousel">
      {estudiantes.map(estudiante => (
        <UsuariosInscritosCard key={estudiante.id_estudiante} estudiante={estudiante} />
      ))}
    </div>
  );
};

export default UsuariosInscritosCarousel;