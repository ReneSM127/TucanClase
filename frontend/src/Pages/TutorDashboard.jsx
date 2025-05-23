import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../Styles/DashboardP.css';

const TutorDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [tutoriaForm, setTutoriaForm] = useState({
    title: '',
    category: '',
    level: '',
    description: '',
    duration: 4,
    price: 0,
    schedules: [{ day: 'Lunes', start: '16:00', end: '18:00' }],
    materials: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTutoriaForm(prev => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedules = [...tutoriaForm.schedules];
    updatedSchedules[index][field] = value;
    setTutoriaForm(prev => ({ ...prev, schedules: updatedSchedules }));
  };

  const addSchedule = () => {
    setTutoriaForm(prev => ({
      ...prev,
      schedules: [...prev.schedules, { day: 'Lunes', start: '16:00', end: '18:00' }]
    }));
  };

  const removeSchedule = (index) => {
    const updatedSchedules = tutoriaForm.schedules.filter((_, i) => i !== index);
    setTutoriaForm(prev => ({ ...prev, schedules: updatedSchedules }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tutoriaForm);
    setShowModal(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Sección de Estadísticas */}
        <div className="stats-grid">
          <StatCard icon="📚" value="5" label="Tutorías activas" color="blue" />
          <StatCard icon="👥" value="23" label="Estudiantes" color="green" />
          <StatCard icon="⭐" value="4.8" label="Calificación promedio" color="orange" />
          <StatCard icon="💬" value="12" label="Mensajes nuevos" color="purple" />
          <StatCard icon="🔔" value="3" label="Notificaciones" color="red" />
        </div>

        {/* Tutorías Activas */}
        <TutoriasSection setShowModal={setShowModal} />

        {/* Próximas Sesiones */}
        <SessionsSection />
      </div>

      {/* Modal para nueva tutoría */}
      {showModal && (
        <div className="modal active" id="tutoria-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Crear Nueva Tutoría</h2>
              <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            </div>

            <form className="tutoria-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="tutoria-title">Título de la tutoría</label>
                <input
                  type="text"
                  id="tutoria-title"
                  name="title"
                  placeholder="Ej: Matemáticas Básicas"
                  value={tutoriaForm.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tutoria-category">Categoría</label>
                <select
                  id="tutoria-category"
                  name="category"
                  value={tutoriaForm.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="matematicas">Matemáticas</option>
                  <option value="ciencias">Ciencias</option>
                  <option value="literatura">Literatura</option>
                  <option value="idiomas">Idiomas</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tutoria-level">Nivel</label>
                <select
                  id="tutoria-level"
                  name="level"
                  value={tutoriaForm.level}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona un nivel</option>
                  <option value="basico">Básico</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tutoria-desc">Descripción</label>
                <textarea
                  id="tutoria-desc"
                  name="description"
                  rows="4"
                  placeholder="Describe los temas que cubrirás, metodología, etc."
                  value={tutoriaForm.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tutoria-duration">Duración (semanas)</label>
                  <input
                    type="number"
                    id="tutoria-duration"
                    name="duration"
                    min="1"
                    max="52"
                    value={tutoriaForm.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tutoria-price">Precio (por sesión)</label>
                  <input
                    type="number"
                    id="tutoria-price"
                    name="price"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={tutoriaForm.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Horarios</label>
                <div className="schedule-container">
                  {tutoriaForm.schedules.map((schedule, index) => (
                    <div className="schedule-item" key={index}>
                      <select
                        className="schedule-day"
                        value={schedule.day}
                        onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                      >
                        <option>Lunes</option>
                        <option>Martes</option>
                        <option>Miércoles</option>
                        <option>Jueves</option>
                        <option>Viernes</option>
                        <option>Sábado</option>
                        <option>Domingo</option>
                      </select>
                      <input
                        type="time"
                        className="schedule-start"
                        value={schedule.start}
                        onChange={(e) => handleScheduleChange(index, 'start', e.target.value)}
                      />
                      <span>a</span>
                      <input
                        type="time"
                        className="schedule-end"
                        value={schedule.end}
                        onChange={(e) => handleScheduleChange(index, 'end', e.target.value)}
                      />
                      {tutoriaForm.schedules.length > 1 && (
                        <button
                          type="button"
                          className="remove-schedule"
                          onClick={() => removeSchedule(index)}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button type="button" className="add-schedule" onClick={addSchedule}>
                  ➕ Agregar otro horario
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="tutoria-materials">Materiales de apoyo (opcional)</label>
                <input
                  type="file"
                  id="tutoria-materials"
                  multiple
                  onChange={(e) => setTutoriaForm(prev => ({ ...prev, materials: e.target.files }))}
                />
                <small>Puedes subir PDFs, presentaciones, imágenes, etc.</small>
              </div>

              <div className="form-actions">
                <button type="button" className="btn secondary cancel-btn" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn primary">
                  Crear Tutoría
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Componentes auxiliares
const StatCard = ({ icon, value, label, color }) => (
  <div className={`stat-card ${color}`}>
    <div className={`stat-icon ${color}`}>{icon}</div>
    <div>
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  </div>
);

const TutoriasSection = ({ setShowModal }) => {
  const tutorias = [
    {
      id: 1,
      title: "Matemáticas Avanzadas",
      description: "Álgebra lineal y cálculo diferencial para estudiantes universitarios.",
      status: "active",
      students: 8,
      rating: "4.9 (15 reseñas)",
      schedule: "Lun y Mié, 16:00-18:00"
    },
    {
      id: 2,
      title: "Introducción a la Física",
      description: "Conceptos básicos de mecánica para estudiantes de preparatoria.",
      status: "warning",
      students: 5,
      rating: "4.7 (8 reseñas)",
      schedule: "Mar y Jue, 14:00-15:30"
    },
    {
      id: 3,
      title: "Preparación para Exámenes",
      description: "Técnicas de estudio y resolución de problemas para exámenes finales.",
      status: "active",
      students: 10,
      rating: "4.8 (22 reseñas)",
      schedule: "Viernes, 10:00-13:00"
    }
  ];

  return (
    <section className="tutorias-section">
      <div className="section-header">
        <h2>Tutorías Activas</h2>
        <div className="section-actions">
          <select className="filter-select">
            <option>Todas</option>
            <option>Matemáticas</option>
            <option>Ciencias</option>
            <option>Literatura</option>
          </select>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            <FaPlus /> Nueva Tutoría
          </button>
        </div>
      </div>

      <div className="tutorias-grid">
        {tutorias.map(tutoria => (
          <TutoriaCard key={tutoria.id} tutoria={tutoria} />
        ))}
      </div>
    </section>
  );
};

const TutoriaCard = ({ tutoria }) => {
  return (
    <div className="tutoria-card">
      <div className="tutoria-header">
        <span className={`badge ${tutoria.status}`}>
          {tutoria.status === 'active' ? 'Activa' : 'Próxima'}
        </span>
        <div className="tutoria-actions">
          <button className="edit-btn"><FaEdit /></button>
          <button className="delete-btn"><FaTrash /></button>
        </div>
      </div>
      <h3>{tutoria.title}</h3>
      <p className="tutoria-desc">{tutoria.description}</p>

      <div className="tutoria-meta">
        <div className="meta-item">
          <span className="meta-icon">👥</span>
          <span>{tutoria.students} estudiantes</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">⭐</span>
          <span>{tutoria.rating}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">📅</span>
          <span>{tutoria.schedule}</span>
        </div>
      </div>

      <div className="tutoria-footer">
        <button className="btn secondary">Ver detalles</button>
        <button className="btn primary">Gestionar</button>
      </div>
    </div>
  );
};

const SessionsSection = () => {
  const sessions = [
    {
      id: 1,
      day: 15,
      month: 'OCT',
      title: 'Matemáticas Avanzadas',
      time: '16:00 - 18:00',
      students: '8 estudiantes confirmados'
    },
    {
      id: 2,
      day: 16,
      month: 'OCT',
      title: 'Introducción a la Física',
      time: '14:00 - 15:30',
      students: '3 estudiantes confirmados'
    },
    {
      id: 3,
      day: 17,
      month: 'OCT',
      title: 'Preparación para Exámenes',
      time: '10:00 - 13:00',
      students: '8 estudiantes confirmados'
    }
  ];

  return (
    <section className="sessions-section">
      <div className="section-header">
        <h2>Próximas Sesiones</h2>
        <button className="view-all">Ver calendario completo</button>
      </div>

      <div className="sessions-list">
        {sessions.map(session => (
          <div className="session-item" key={session.id}>
            <div className="session-date">
              <span className="day">{session.day}</span>
              <span className="month">{session.month}</span>
            </div>
            <div className="session-info">
              <h3>{session.title}</h3>
              <p>{session.time} | {session.students}</p>
            </div>
            <div className="session-actions">
              <button className="btn secondary">Detalles</button>
              <button className="btn primary">Iniciar</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TutorDashboard;