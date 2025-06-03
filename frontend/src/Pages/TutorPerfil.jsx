import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaBook } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  getTutorById,
  getAllReviewsByTutorId,
  getAllTutoriasById,
} from "../Services/TutoresService";
import "../Styles/PerfilSocial.css";
import TutoriasList from "../Components/TutoriasList/TutoriasList";

const TutorPerfil = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [tutorias, setTutorias] = useState([]);

  const [instructor, setInstructor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const tutorData = await getTutorById(id);
        const reviewsData = await getAllReviewsByTutorId(id);
        const tutoriasData = await getAllTutoriasById(id);

        // Filtrar solo las reseñas válidas (con estrellas o comentario)
        const validReviews = reviewsData.filter(
          (review) => review.estrellas !== null || review.comentario !== null
        );

        // Transformar los datos del tutor al formato esperado
        const transformedTutor = {
          id: tutorData.id,
          name: `${tutorData.nombre} ${tutorData.apellidos}`,
          title: "Tutor",
          bio: tutorData.descripcion,
          avatar: tutorData.nombre.charAt(0) + tutorData.apellidos.charAt(0),
          rating: calculateAverageRating(validReviews), // Usar solo reseñas válidas
          reviews: validReviews.length, // Contar solo reseñas válidas
          courses: tutoriasData.length,
          contact: tutorData.email,
          photo: tutorData.foto_perfil,
        };

        setInstructor(transformedTutor);

        // Transformar solo las reseñas válidas
        const transformedReviews = validReviews.map((review) => ({
          id: review.tutoria_id,
          student: review.nombre_estudiante,
          rating: review.estrellas,
          comment: review.comentario,
          date: formatDate(review.fecha_review),
          course: review.titulo_tutoria,
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
  }, [id]);

  const calculateAverageRating = (reviews) => {
    // Filtrar solo reseñas con estrellas definidas (no null)
    const ratedReviews = reviews.filter((review) => review.estrellas !== null);
    
    if (!ratedReviews || ratedReviews.length === 0) return 0;
    const sum = ratedReviews.reduce((acc, review) => acc + review.estrellas, 0);
    return (sum / ratedReviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    const stars = [];
    const numericRating =
      typeof rating === "string" ? parseFloat(rating) : rating;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.floor(numericRating) ? (
          <FaStar key={i} className="star filled" />
        ) : (
          <FaRegStar key={i} className="star" />
        )
      );
    }
    return stars;
  };

  if (loading) return <div className="loading">Cargando perfil...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!instructor) return <div className="error">No se encontró el tutor</div>;

  return (
    <div className="instructor-profile">
      {/* Header del perfil */}
      <div className="profile-header">
        <div className="avatar-container">
          {instructor.photo && instructor.photo !== "default.png" ? (
            <img
              src={`http://localhost:5000/uploads/${instructor.photo}`}
              alt={instructor.name}
              className="instructor-avatar"
            />
          ) : (
            <div className="instructor-avatar">{instructor.avatar}</div>
          )}
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
              <FaBook className="stat-icon" />
              <span>{instructor.courses} Tutorias</span>
            </div>
          </div>

          <div className="bio-container">
            <h3>Acerca de mí</h3>
            <p>{instructor.bio}</p>
          </div>

          <div className="contact-container">
            <h3>Contacto</h3>
            <p>Email: {instructor.contact}</p>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="profile-tabs">
        <button
          className={`tab ${activeTab === "courses" ? "active" : ""}`}
          onClick={() => setActiveTab("courses")}
        >
          <FaBook /> Tutorias
        </button>
        <button
          className={`tab ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          <FaStar /> Reseñas
        </button>
      </div>

      {/* Contenido del perfil */}
      <div className="profile-content">
        {activeTab === "courses" && (
          <TutoriasList 
        tutorias={tutorias}
        loading={loading}
        error={error}
        itemsPerPage={5} // Puedes ajustar este valor según necesites
      />
        )}

        {activeTab === "reviews" && (
          <div className="reviews-container">
            <h2>Reseñas de estudiantes</h2>
            <div className="overall-rating">
              <div className="rating-circle">
                <span>{instructor.rating}</span>
                <div>{renderStars(instructor.rating)}</div>
                <p>{instructor.reviews} reseñas</p>
              </div>
            </div>

            <div className="reviews-list">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    className="review-card"
                    key={`${review.id}-${review.student}`}
                  >
                    <div className="review-header">
                      <div className="reviewer-avatar">
                        {review.student.charAt(0)}
                      </div>
                      <div className="reviewer-info">
                        <h4>{review.student}</h4>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                          <span>{review.date}</span>{" "}
                          {/* Mostramos la fecha formateada */}
                        </div>
                        <p className="course-name">{review.course}</p>
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="no-reviews">
                  <p>Este tutor aún no tiene reseñas.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorPerfil;
