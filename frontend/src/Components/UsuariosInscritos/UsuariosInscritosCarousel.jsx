import React from 'react';
import '../../Styles/Tutores.css';
import UsuariosInscritosCard from './UsuariosInscritosCard';

const UsuariosInscritosCarousel = ({ estudiantes, esTutor, onDeleteStudent }) => {
  return (
    <div className="tutors-carousel">
      {estudiantes.map(estudiante => (
        <UsuariosInscritosCard 
          key={estudiante.id_estudiante} 
          estudiante={estudiante}
          esTutor={esTutor}
          onDeleteStudent={onDeleteStudent}
        />
      ))}
    </div>
  );
};

export default UsuariosInscritosCarousel;