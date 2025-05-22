import React, { useState, useEffect } from 'react';
import {FaBook, FaUsers, FaStar, FaComment, FaCalendarAlt } from 'react-icons/fa';
import '../Styles/AlumnosDashboard.css';

const AlumnosDashboard = () => {
  // Estado para los datos del dashboard
  const [dashboardData, setDashboardData] = useState({
    stats: {
      enrolledTutorias: 0,
      completedTutorias: 0,
      averageRating: 0,
      newMessages: 12 // Aumentado para demostración
    },
    currentTutorias: [],
    availableTutorias: [],
    messages: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('Todas');


  // Simulación de fetch a la API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulamos un retraso de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Datos simulados del backend
        const mockData = {
          stats: {
            enrolledTutorias: 2,
            completedTutorias: 23,
            averageRating: 4.8,
            newMessages: 11
          },
          currentTutorias: [
            {
              id: 1,
              title: "Matemáticas Avanzadas",
              description: "Álgebra lineal y cálculo diferencial para estudiantes universitarios.",
              status: "active",
              students: 8,
              rating: 4.9,
              reviews: 15,
              schedule: "Lun y Mié, 16:00-18:00",
              category: "Matemáticas"
            },
            {
              id: 2,
              title: "Introducción a la Física",
              description: "Conceptos básicos de mecánica para estudiantes de preparatoria.",
              status: "active",
              students: 5,
              rating: 4.7,
              reviews: 8,
              schedule: "Mar y Jue, 14:00-15:30",
              category: "Ciencias"
            }
          ],
          availableTutorias: [
            {
              id: 101,
              title: "Matemáticas Avanzadas",
              date: "15 Oct",
              time: "16:00 - 18:00",
              teacher: "Profesor Pedro",
              category: "Matemáticas"
            }
          ],
          messages: [
            {
              id: 1,
              from: "Profesor Martínez",
              subject: "Recordatorio: Tarea para mañana",
              content: "Hola, recuerda que mañana debes entregar la tarea de álgebra. Por favor envíamela por esta plataforma cuando la termines.",
              date: "10 Oct 2023",
              read: false
            },
            {
              id: 2,
              from: "Sistema de Tutorías",
              subject: "Nueva tutoría disponible",
              content: "Se ha abierto una nueva sesión de tutoría para Física que coincide con tus intereses. ¡Inscríbete antes de que se agoten los cupos!",
              date: "9 Oct 2023",
              read: false
            },
            {
              id: 3,
              from: "Profesor González",
              subject: "Feedback sobre tu último examen",
              content: "Quería darte feedback sobre tu último examen. Has mejorado mucho, pero hay algunos conceptos que deberíamos repasar en la próxima sesión.",
              date: "7 Oct 2023",
              read: true
            }
          ]
        };

        setDashboardData(mockData);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos del dashboard");
        setLoading(false);
        console.error(err);
      }
    };

    fetchDashboardData();
  }, []);

  // Manejar abandono de tutoría
  const handleLeaveTutoria = (tutoriaId) => {
    setDashboardData(prev => ({
      ...prev,
      currentTutorias: prev.currentTutorias.filter(t => t.id !== tutoriaId),
      stats: {
        ...prev.stats,
        enrolledTutorias: prev.stats.enrolledTutorias - 1
      }
    }));
  };

  // Manejar inscripción a tutoría
  const handleEnrollTutoria = (tutoriaId) => {
    const tutoriaToEnroll = dashboardData.availableTutorias.find(t => t.id === tutoriaId);
    
    if (tutoriaToEnroll) {
      setDashboardData(prev => ({
        ...prev,
        availableTutorias: prev.availableTutorias.filter(t => t.id !== tutoriaId),
        currentTutorias: [
          ...prev.currentTutorias,
          {
            id: tutoriaId,
            title: tutoriaToEnroll.title,
            description: `Nueva tutoría de ${tutoriaToEnroll.category}`,
            status: "active",
            students: 1,
            rating: 0,
            reviews: 0,
            schedule: tutoriaToEnroll.time,
            category: tutoriaToEnroll.category
          }
        ],
        stats: {
          ...prev.stats,
          enrolledTutorias: prev.stats.enrolledTutorias + 1
        }
      }));
    }
  };


  // Filtrar tutorías por categoría
  const filteredTutorias = filter === 'Todas' 
    ? dashboardData.currentTutorias 
    : dashboardData.currentTutorias.filter(t => t.category === filter);

  if (loading) return <div className="loading">Cargando dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-content">
      <div className="dashboard-container">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue"><FaBook /></div>
            <div>
              <h3>{dashboardData.stats.enrolledTutorias}</h3>
              <p>Tutorías inscritas</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><FaUsers /></div>
            <div>
              <h3>{dashboardData.stats.completedTutorias}</h3>
              <p>Tutorías completas</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange"><FaStar /></div>
            <div>
              <h3>{dashboardData.stats.averageRating}</h3>
              <p>Calificación promedio</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple"><FaComment /></div>
            <div>
              <h3>{dashboardData.stats.newMessages}</h3>
              <p>Mensajes nuevos</p>
            </div>
          </div>
        </div>

        {/* Tutorías en curso */}
        <section className="tutorias-section">
          <div className="section-header">
            <h2>Tutorías en Curso</h2>
            <div className="section-actions">
              <select 
                className="filter-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>Todas</option>
                <option>Matemáticas</option>
                <option>Ciencias</option>
                <option>General</option>
              </select>
            </div>
          </div>

          <div className="tutorias-grid">
            {filteredTutorias.length > 0 ? (
              filteredTutorias.map(tutoria => (
                <div className="tutoria-card" key={tutoria.id}>
                  <div className="tutoria-header">
                    <span className={`badge ${tutoria.status}`}>
                      {tutoria.status === 'active' ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                  <h3>{tutoria.title}</h3>
                  <p className="tutoria-desc">{tutoria.description}</p>

                  <div className="tutoria-meta">
                    <div className="meta-item">
                      <span className="meta-icon"><FaUsers /></span>
                      <span>{tutoria.students} estudiantes</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon"><FaStar /></span>
                      <span>{tutoria.rating} ({tutoria.reviews} reseñas)</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon"><FaCalendarAlt /></span>
                      <span>{tutoria.schedule}</span>
                    </div>
                  </div>

                  <div className="tutoria-footer">
                    <button className="btn secondary">Ver detalles</button>
                    <button 
                      className="btn primary"
                      onClick={() => handleLeaveTutoria(tutoria.id)}
                    >
                      Abandonar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay tutorías activas en esta categoría</p>
            )}
          </div>
        </section>

        {/* Explorar tutorias */}
        <section className="sessions-section">
          <div className="section-header">
            <h2>Explorar Tutorias</h2>
          </div>

          <div className="sessions-list">
            {dashboardData.availableTutorias.length > 0 ? (
              dashboardData.availableTutorias.map(tutoria => (
                <div className="session-item" key={tutoria.id}>
                  <div className="session-date">
                    <span className="day">{tutoria.date.split(' ')[0]}</span>
                    <span className="month">{tutoria.date.split(' ')[1]}</span>
                  </div>
                  <div className="session-info">
                    <h3>{tutoria.title}</h3>
                    <p>{tutoria.time} | {tutoria.teacher}</p>
                  </div>
                  <div className="session-actions">
                    <button className="btn secondary">Detalles</button>
                    <button 
                      className="btn primary"
                      onClick={() => handleEnrollTutoria(tutoria.id)}
                    >
                      Inscribirse
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay tutorías disponibles en este momento</p>
            )}
          </div>
          <button className="view-all">Ver tutorias</button>
        </section>
      </div>

    </div>
  );
};

export default AlumnosDashboard;