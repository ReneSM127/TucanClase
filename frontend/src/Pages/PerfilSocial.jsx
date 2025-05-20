import React, { useState } from 'react';
import { FaChalkboardTeacher, FaGraduationCap, FaStar, FaRegStar, FaBook, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { FiMessageSquare, FiShare2 } from 'react-icons/fi';
import '../Styles/PerfilSocial.css';

const CourseInstructorProfile = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Datos del instructor
  const instructor = {
    name: "Dra. María González",
    title: "Profesora de Matemáticas Avanzadas",
    bio: "Doctora en Matemáticas con 10 años de experiencia docente. Especializada en álgebra lineal y cálculo multivariable. Apasionada por hacer las matemáticas accesibles para todos.",
    avatar: "MG",
    rating: 4.8,
    reviews: 128,
    students: 1500,
    courses: 8,
    contact: "prof.maria.gonzalez@universidad.edu",
    social: {
      twitter: "@mathprofg",
      linkedin: "linkedin.com/in/mariagonzalezmath"
    }
  };

  // Cursos del instructor
  const courses = [
    {
      id: 1,
      title: "Álgebra Lineal desde Cero",
      description: "Curso completo que cubre desde los fundamentos hasta aplicaciones avanzadas de álgebra lineal.",
      level: "Principiante",
      students: 450,
      rating: 4.9,
      duration: "6 semanas",
      price: "$49.99",
      image: "algebra"
    },
    {
      id: 2,
      title: "Cálculo Multivariable",
      description: "Domina las técnicas de cálculo en múltiples variables con aplicaciones prácticas.",
      level: "Intermedio",
      students: 320,
      rating: 4.7,
      duration: "8 semanas",
      price: "$59.99",
      image: "calculus"
    },
    {
      id: 3,
      title: "Ecuaciones Diferenciales",
      description: "Resolución de ecuaciones diferenciales ordinarias y sus aplicaciones en física e ingeniería.",
      level: "Avanzado",
      students: 280,
      rating: 4.8,
      duration: "10 semanas",
      price: "$69.99",
      image: "differential"
    }
  ];

  // Reseñas de estudiantes
  const reviews = [
    {
      id: 1,
      student: "Carlos Martínez",
      rating: 5,
      comment: "La Dra. González explica conceptos complejos de manera clara y accesible. ¡El mejor curso de álgebra que he tomado!",
      date: "15/03/2023"
    },
    {
      id: 2,
      student: "Ana Rodríguez",
      rating: 4,
      comment: "Excelente material, aunque me gustaría más ejemplos prácticos en algunas secciones.",
      date: "02/03/2023"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.floor(rating) ? 
        <FaStar key={i} className="star filled" /> : 
        <FaRegStar key={i} className="star" />
      );
    }
    return stars;
  };

  return (
    <div className="instructor-profile">
      {/* Header del perfil */}
      <div className="profile-header">
        <div className="avatar-container">
          <div className="instructor-avatar">{instructor.avatar}</div>
          <div className="instructor-badge">
            <FaChalkboardTeacher />
            <span>Instructor Certificado</span>
          </div>
        </div>
        
        <div className="profile-info">
          <h1>{instructor.name}</h1>
          <h2>{instructor.title}</h2>
          
          <div className="rating-container">
            <div className="stars">
              {renderStars(instructor.rating)}
              <span>{instructor.rating}</span>
            </div>
            <span>({instructor.reviews} reseñas)</span>
          </div>
          
          <div className="stats-container">
            <div className="stat">
              <FaUsers className="stat-icon" />
              <span>{instructor.students} estudiantes</span>
            </div>
            <div className="stat">
              <FaBook className="stat-icon" />
              <span>{instructor.courses} cursos</span>
            </div>
          </div>
          
          <div className="bio-container">
            <h3>Acerca de mí</h3>
            <p>{instructor.bio}</p>
          </div>
          
          <div className="contact-container">
            <h3>Contacto</h3>
            <p>Email: {instructor.contact}</p>
            <div className="social-links">
              <a href={`https://twitter.com/${instructor.social.twitter}`} target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href={`https://${instructor.social.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          <FaBook /> Cursos
        </button>
        <button 
          className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          <FaStar /> Reseñas
        </button>
        <button 
          className={`tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <FaChalkboardTeacher /> Sobre el instructor
        </button>
      </div>

      {/* Contenido del perfil */}
      <div className="profile-content">
        {activeTab === 'courses' && (
          <div className="courses-grid">
            {courses.map(course => (
              <div 
                className={`course-card ${selectedCourse === course.id ? 'expanded' : ''}`} 
                key={course.id}
                onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
              >
                <div className="course-image">
                  <img 
                    src={`https://source.unsplash.com/random/400x300/?${course.image}`} 
                    alt={course.title}
                  />
                </div>
                
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p className="level">{course.level}</p>
                  
                  <div className="course-meta">
                    <span><FaUsers /> {course.students} estudiantes</span>
                    <span><FaStar /> {course.rating}</span>
                    <span><FaCalendarAlt /> {course.duration}</span>
                  </div>
                  
                  {selectedCourse === course.id && (
                    <div className="course-details">
                      <p>{course.description}</p>
                      <div className="course-actions">
                        <button className="price-tag">{course.price}</button>
                        <div className="action-buttons">
                          <button className="action-btn">
                            <FiMessageSquare /> Más información
                          </button>
                          <button className="action-btn">
                            <FiShare2 /> Compartir
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="reviews-container">
            <h2>Reseñas de estudiantes</h2>
            <div className="overall-rating">
              <div className="rating-circle">
                <span>{instructor.rating}</span>
                <div>{renderStars(instructor.rating)}</div>
                <p>{instructor.reviews} reseñas</p>
              </div>
              <div className="rating-details">
                {/* Aquí podrías agregar un desglose por estrellas */}
              </div>
            </div>
            
            <div className="reviews-list">
              {reviews.map(review => (
                <div className="review-card" key={review.id}>
                  <div className="review-header">
                    <div className="reviewer-avatar">
                      {review.student.charAt(0)}
                    </div>
                    <div className="reviewer-info">
                      <h4>{review.student}</h4>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="about-container">
            <h2>Experiencia y Credenciales</h2>
            <div className="experience-item">
              <h3>Educación</h3>
              <ul>
                <li>PhD en Matemáticas, Universidad Nacional, 2012</li>
                <li>MSc en Matemáticas Aplicadas, Universidad Tecnológica, 2008</li>
                <li>Licenciatura en Matemáticas, Instituto Politécnico, 2006</li>
              </ul>
            </div>
            
            <div className="experience-item">
              <h3>Experiencia Docente</h3>
              <ul>
                <li>Profesora Titular, Departamento de Matemáticas, Universidad Nacional (2015-Presente)</li>
                <li>Profesora Asociada, Instituto Tecnológico (2012-2015)</li>
                <li>Asistente de Docencia, Universidad del Este (2008-2012)</li>
              </ul>
            </div>
            
            <div className="experience-item">
              <h3>Certificaciones</h3>
              <ul>
                <li>Certificación en Educación en Línea, 2020</li>
                <li>Especialización en Métodos Cuantitativos, 2018</li>
                <li>Premio a la Excelencia Docente, 2017</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseInstructorProfile;