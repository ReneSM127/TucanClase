import React from 'react';
import '../Styles/Tutores.css';
import TutorsSection from '../Components/Tutors/TutorsSection';
import TutorsCarousel from '../Components/Tutors/TutorsCarousel';
import TutorsGrid from '../Components/Tutors/TutorsGrid';

const TutorsPage = () => {
  // Datos de tutores destacados (para el carrusel)
  const featuredTutors = [
    {
      id: 1,
      name: "María González",
      rating: 4.9,
      subject: "Matemáticas Avanzadas",
      review: "Excelente metodología de enseñanza, mis calificaciones mejoraron notablemente",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      rating: 4.8,
      subject: "Física Universitaria",
      review: "Explica conceptos complejos de manera sencilla, muy recomendado",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      id: 3,
      name: "Ana Martínez",
      rating: 5.0,
      subject: "Química Orgánica",
      review: "Paciente y dedicada, hace que aprender sea divertido",
      avatar: "https://randomuser.me/api/portraits/women/64.jpg"
    },
    {
      id: 4,
      name: "Luis Fernández",
      rating: 4.7,
      subject: "Cálculo Diferencial",
      review: "Sus ejemplos prácticos son increíblemente útiles",
      avatar: "https://randomuser.me/api/portraits/men/43.jpg"
    },
    {
      id: 5,
      name: "Sandoval Moron",
      rating: 2,
      subject: "Albañilería",
      review: "Le gustan el elote con palo",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  // Datos de todos los tutores
  const allTutors = [
    {
      id: 1,
      name: "Juan Pérez",
      description: "Profesor de matemáticas con 10 años de experiencia. Especializado en álgebra y geometría. Mi metodología se centra en la comprensión conceptual más que en la memorización.",
      subjects: ["Álgebra", "Geometría", "Cálculo"],
    },
    {
      id: 2,
      name: "Sofía Ramírez",
      description: "Ingeniera química con pasión por la enseñanza. He ayudado a más de 50 estudiantes a dominar la química orgánica e inorgánica.",
      subjects: ["Química Orgánica", "Química Inorgánica"],
    },
    {
      id: 3,
      name: "Diego Morales",
      description: "Físico teórico con amplia experiencia docente. Mis clases son dinámicas y llenas de ejemplos del mundo real.",
      subjects: ["Física Clásica", "Termodinámica", "Electromagnetismo"],
    },
    {
      id: 4,
      name: "Laura Jiménez",
      description: "Especialista en probabilidad y estadística. He trabajado en proyectos de investigación y me encanta compartir mi conocimiento.",
      subjects: ["Estadística", "Probabilidad", "Análisis de Datos"],
    }
  ];


  return (
    <div className="tutors-page">
      <header className="page-header">
        <h1>Tutores Académicos</h1>
        <p>Encuentra al tutor perfecto para tus necesidades educativas</p>
      </header>

      <TutorsSection title="Tutores Destacados">
        <TutorsCarousel tutors={featuredTutors} />
      </TutorsSection>

      <TutorsSection title="Nuestros Tutores">
        <TutorsGrid tutors={allTutors} />
      </TutorsSection>
    </div>
  );
};

export default TutorsPage;