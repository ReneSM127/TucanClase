import React, { useEffect, useState, useContext } from "react";
import "../Styles/DetallesCursos.css";
import { AuthContext } from "../Context/AuthContext";
import { FaStar, FaRegStar, FaBook } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import {
  createInscripcion,
  deleteInscripcion,
  createReview,
} from "../Services/InscripcionesService";
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
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const [estudiantes, setEstudiantes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [estaInscrito, setEstaInscrito] = useState(false);
  const [inscripcion, setInscripcion] = useState({
    id: 0,
  });
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
        if (user) {
          console.log(user.id);
        }
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

        // Verificar si el usuario actual está inscrito
        if (user && infoEstudiantes) {
          const usuarioInscrito = infoEstudiantes.find(
            (estudiante) => estudiante.id_estudiante === user.id
          );
          setEstaInscrito(!!usuarioInscrito);

          // Si está inscrito, guardar también el ID de la inscripción
          if (usuarioInscrito) {
            setInscripcion({ id: usuarioInscrito.id_inscripcion });
          }
        }

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
  }, [tutoriaId, user]);

  const handleClick = async () => {
    try {
      if (!user) {
        navigate("/login"); // o mostrar un mensaje
        return;
      }

      console.log(user.id);
      console.log(tutoriaId);

      const response = await createInscripcion(user.id, tutoriaId);
      setInscripcion({ id: response.id });
      alert(`${response.id}`);
      setEstaInscrito(true);
    } catch (error) {
      console.error("Error en inscripción:", error);
      alert(error.response?.data?.message || "Error al inscribirse");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInscripcion(inscripcion.id);
      alert("Se ha borrado");
    } catch (error) {
      alert(`Ocurrio un error ${error}`);
    }
  };

  const handleSummitReview = async () => {
    try {
      await createReview(inscripcion.id, reviewRating, reviewComment);
      // Resetear el formulario
      setReviewRating(0);
      setReviewComment("");
      setShowReviewForm(false);

      // Recargar las reseñas para mostrar la nueva
      const reviewsData = await getAllReviewsByTutoriaId(tutoriaId);
      const transformedReviews = reviewsData.map((review) => ({
        id: review.tutoria_id,
        student: review.nombre_estudiante,
        rating: review.estrellas,
        comment: review.comentario,
        date: formatDate(review.fecha_review),
        course: review.titulo_tutoria,
      }));
      setReviews(transformedReviews);

      alert("¡Gracias por tu reseña!");
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
      alert(error.response?.data?.message || "Error al enviar la reseña");
    }
  };

  const handleStarClick = (rating) => {
    setReviewRating(rating);
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
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
        {estaInscrito === false ? (
          <button className="btn-secundario fixed-btn" onClick={handleClick}>
            Inscribirse a la tutoría
          </button>
        ) : (
          <button className="btn-secundario fixed-btn" onClick={handleDelete}>
            Salirse
          </button>
        )}

        <h1>{tutoria.titulo_tutoria}</h1>
        <p>{tutoria.descripcion_tutoria}</p>
      </section>

      <div className="reviews-container">
        <h2>Reseñas de estudiantes</h2>
        {estaInscrito && !showReviewForm && (
          <button
            className="btn-secundario"
            onClick={() => setShowReviewForm(true)}
            style={{ margin: "20px 0" }}
          >
            Dejar una reseña
          </button>
        )}

        {showReviewForm && (
          <div className="review-form-container">
            <h3>Escribe tu reseña</h3>
            <form onSubmit={handleSummitReview}>
              <div className="rating-input">
                <p>Calificación:</p>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${
                        (hoverRating || reviewRating) >= star ? "filled" : ""
                      }`}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarLeave}
                    >
                      {(hoverRating || reviewRating) >= star ? (
                        <FaStar />
                      ) : (
                        <FaRegStar />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="review-comment">Comentario:</label>
                <textarea
                  id="review-comment"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primario">
                  Enviar reseña
                </button>
                <button
                  type="button"
                  className="btn-secundario"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

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
      <div className="reviews-list">
        <h2>Estudiantes inscritos</h2>
        <UsuariosInscritosCarousel estudiantes={estudiantes} />
      </div>
    </div>
  );
};

export default DetallesCursos;
