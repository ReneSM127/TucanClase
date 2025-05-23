import React, { useEffect, useState } from 'react';
import '../Styles/DetallesCursos.css';
import TutorsSection from '../Components/Tutors/TutorsSection';
import TutorsCarousel from '../Components/Tutors/TutorsCarousel';
import { getAllStudents } from '../Services/usuarios';

const Cursos = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setEstudiantes(data);
      } catch (error) {
        console.error('Error al cargar estudiantes:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="course-container">
      <section className="intro">
        <div className="info">
          <img className="profilepic" src="../Styles/DetallesCursos.css"/>
          <h1>Barry Keoghan</h1>
        </div>
        <button className="btn-secundario fixed-btn">Inscribirse a la tutoría</button>

        <h1>Curso de Matemáticas</h1>
        <p>
          ¡Bienvenido a nuestro curso de Matemáticas! Este programa completo te brindará los conocimientos y habilidades necesarias para desarrollar el pensamiento lógico y la resolución de problemas en diversas áreas matemáticas...
        </p>
      </section>

      <TutorsSection title="Estudiantes Interesados">
        <TutorsCarousel tutors={estudiantes} />
      </TutorsSection>

      <section className="comments">
        <h2>Comentarios</h2>
        <div className="comment">
          <p className="name">Rene Sandoval Maron ⭐⭐⭐⭐☆</p>
          <p className="text">
            La tutoría de diseño web proporcionó una base sólida para mí. ¡Lo recomiendo encarecidamente!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Cursos;
