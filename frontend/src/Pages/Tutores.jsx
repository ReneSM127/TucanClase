import React from 'react';
import '../Styles/Tutores.css';

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

      <section className="featured-tutors">
        <h2>Tutores Destacados</h2>
        <div className="tutors-carousel">
          {featuredTutors.map(tutor => (
            <div key={tutor.id} className="tutor-card featured">
              <div className="tutor-avatar">
                <img src={tutor.avatar} alt={tutor.name} />
              </div>
              <div className="tutor-info">
                <h3>{tutor.name}</h3>
                <p className="subject">{tutor.subject}</p>
                <p className="review">"{tutor.review}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="all-tutors">
        <h2>Nuestros Tutores</h2>
        <div className="tutors-grid">
          {allTutors.map(tutor => (
            <div key={tutor.id} className="tutor-card">
              <div className="tutor-header">
                <h3>{tutor.name}</h3>
              </div>
              <p className="description">{tutor.description}</p>
              <div className="subjects">
                {tutor.subjects.map((subject, index) => (
                  <span key={index} className="subject-tag">{subject}</span>
                ))}
              </div>
              <button className="profile-button">Revisar Perfil</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TutorsPage;