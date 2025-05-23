import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

import { useNavigate } from "react-router-dom";
import {
  getTutorById,
  getAllReviewsByTutorId,
  getAllTutoriasById,
} from "../Services/TutoresService";
import { AuthContext } from "../Context/AuthContext";
import '../Styles/DashboardP.css';
import TutoriasGestion from "../Components/Tutorias/TutoriasGestion";

const AlumnosDashboard = () => {
  const { user: contextUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tutorias, setTutorias] = useState([]);
  const [instructor, setInstructor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tutorId, setTutorId] = useState(null);
  

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  // Efecto para obtener el ID del tutor
  useEffect(() => {
    const getCurrentTutorId = () => {
      // 1. Intenta del contexto primero
      if (contextUser?.id) return contextUser.id;

      // 2. Si no está en el contexto, busca en localStorage
      const storedUser = localStorage.getItem("usuario");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          return parsedUser.id;
        } catch (e) {
          console.error("Error parsing user data from localStorage", e);
        }
      }
      return null;
    };

    const id = getCurrentTutorId();
    if (id) {
      setTutorId(id);
    } else {
      setError("No se pudo obtener el ID del tutor. Redirigiendo...");
      setLoading(false);
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [contextUser, navigate]);

  // Efecto para cargar los datos cuando tengamos el tutorId
  useEffect(() => {
    if (!tutorId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const tutorData = await getTutorById(tutorId);
        const reviewsData = await getAllReviewsByTutorId(tutorId);
        const tutoriasData = await getAllTutoriasById(tutorId);

        // Transformar los datos del tutor al formato esperado
        const transformedTutor = {
          id: tutorData.id,
          nombre: `${tutorData.nombre} ${tutorData.apellidos}`,
          descripcion: tutorData.descripcion,
          rating: calculateAverageRating(reviewsData),
          reviews: reviewsData.length,
          tutorias: tutoriasData.length,
          contact: tutorData.email,
        };

        setInstructor(transformedTutor);

        // Transformar las reseñas al formato esperado
        const transformedReviews = reviewsData.map((review) => ({
          id: review.tutoria_id,
          estudiante: review.nombre_estudiante,
          rating: review.estrellas,
          comentario: review.comentario,
          fecha: formatDate(review.fecha_review),
          tutoria: review.titulo_tutoria,
        }));

        setReviews(transformedReviews);
        setTutorias(tutoriasData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [tutorId]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.estrellas, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) return <div className="loading">Cargando perfil...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!instructor) return <div className="error">No se encontró el tutor</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Sección de Estadísticas */}
        <div className="stats-grid">
          <StatCard icon="📚" value={instructor.tutorias} label="Tutorías activas" color="blue" />
          <StatCard icon="👥" value="23" label="Estudiantes" color="green" />
          <StatCard
            icon="⭐"
            value={instructor.rating}
            label="Calificación promedio"
            color="orange"
          />
        </div>
        <section className="tutorias-section">
              <div className="section-header">
                <h2>Tutorías Activas</h2>
                <div className="section-actions">
                  <button className="add-btn">
                    <FaPlus /> Nueva Tutoría
                  </button>
                </div>
              </div>
      
            </section>
        <TutoriasGestion 
        tutorias={tutorias}
        loading={loading}
        error={error}
        itemsPerPage={5} // Puedes ajustar este valor según necesites
      />

      </div>
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



export default AlumnosDashboard;
