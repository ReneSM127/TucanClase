import React, { useState, useEffect } from 'react';
import '../Styles/Tutores.css';
import TutorsSection from '../Components/Tutors/TutorsSection';
import TutorsCarousel from '../Components/Tutors/TutorsCarousel';
import TutorsGrid from '../Components/Tutors/TutorsGrid';
import { getAllTutors, getAllStudents } from '../Services/usuarios';


const TutorsPage = () => {
  const [tutores, setTutores] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);

    useEffect(() => {
      const fetchTutorias = async () => {
        try {
          const data = await getAllTutors();
          const data2 = await getAllStudents();
          setTutores(data);
          setEstudiantes(data2)
        } catch (err) {
        }
      };
  
      fetchTutorias();
    }, []);
  
  return (
    <div className="tutors-page">
      <header className="page-header">
        <h1>Tutores Académicos</h1>
        <p>Encuentra al tutor perfecto para tus necesidades educativas</p>
      </header>

      <TutorsSection title="Tutores Destacados">
        <TutorsCarousel tutors={tutores} />
      </TutorsSection>


      <TutorsSection title="Nuestros Tutores">
        <TutorsGrid tutors={tutores} />
      </TutorsSection>
    </div>
  );
};

export default TutorsPage;