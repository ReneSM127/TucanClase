import React, { useEffect, useState, useContext } from "react";
import "../Styles/DetallesCursos.css";
import { AuthContext } from "../Context/AuthContext";
import { FaStar, FaRegStar, FaBook } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { createInscripcion } from "../Services/InscripcionesService";
import {
  getATutoriaById,
  getEstudiantesInscritosByTutoriaId,
} from "../Services/TutoriasService";
import {
  getTutorById,
  getAllReviewsByTutoriaId,
} from "../Services/TutoresService";
import UsuariosInscritosCarousel from "../Components/UsuariosInscritos/UsuariosInscritosCarousel";

const DetallesCursos = () => {
  const { user } = useContext(AuthContext);
  const [estudiantes, setEstudiantes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [tutoria, setTutoria] = useState({
    titulo_tutoria: "",
    descripcion_tutoria: "",
    max_estudiantes: "",
    tutor_id: "",
    nombre_tutor: "",
    avatar: "",
    email_tutor: "",
    rating: "",
  });
  const navigate = useNavigate();
  const [isLoadingData, setIsLoadingData] = useState(true);

  const { tutoriaId } = useParams();

  useEffect(() => {
    const fetchTutoriaData = async () => {
      try {
        // Caso 2: Hay ID (edición existente)
        setIsLoadingData(true);
        const response = await getATutoriaById(tutoriaId);
        const reviewsData = await getAllReviewsByTutoriaId(tutoriaId);

        if (!response) {
          throw new Error("No se encontró la tutoría solicitada");
        }

        const InfoTutor = await getTutorById(response.tutor_id);
        const infoEstudiantes = await getEstudiantesInscritosByTutoriaId(
          tutoriaId
        );

        setEstudiantes(infoEstudiantes);

        setTutoria({
          titulo_tutoria: response.titulo_tutoria,
          descripcion_tutoria: response.descripcion_tutoria,
          max_estudiantes: response.max_estudiantes,
          tutor_id: response.tutor_id,
          nombre_tutor: response.nombre_tutor,
          avatar: InfoTutor.nombre.charAt(0) + InfoTutor.apellidos.charAt(0),
          email_tutor: response.email_tutor,
          rating: calculateAverageRating(reviewsData),
        });
        const transformedReviews = reviewsData.map((review) => ({
          id: review.tutoria_id,
          student: review.nombre_estudiante,
          rating: review.estrellas,
          comment: review.comentario,
          date: formatDate(review.fecha_review), // Puedes agregar la fecha si está disponible
          course: review.titulo_tutoria,
        }));

        setReviews(transformedReviews);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchTutoriaData();
  }, [tutoriaId]);

  useEffect(() => {
    if (user) {
      console.log(user.id);
    }
  }, [user]);

  const handleClick = async () => {
    try {
      if (!user) {
        navigate("/login"); // o mostrar un mensaje
        return;
      }

      console.log(user.id);
      console.log(tutoriaId);

      await createInscripcion(user.id, tutoriaId);
      alert("Inscrito");
    } catch (error) {
      console.error("Error en inscripción:", error);
      alert(error.response?.data?.message || "Error al inscribirse");
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.estrellas, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
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

  return (
    <div className="course-container">
      <section className="intro">
        <div className="info">
          <div className="instructor-avatar">{tutoria.avatar}</div>
          <h1>{tutoria.nombre_tutor}</h1>
        </div>
        <button className="btn-secundario fixed-btn" onClick={handleClick}>
          Inscribirse a la tutoría
        </button>

        <h1>{tutoria.titulo_tutoria}</h1>
        <p>{tutoria.descripcion_tutoria}</p>
      </section>

      <div className="reviews-container">
        <h2>Reseñas de estudiantes</h2>

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
      <UsuariosInscritosCarousel estudiantes={estudiantes} />
    </div>
  );
};

export default DetallesCursos;
