import React, { useEffect, useState, useContext } from "react";
import "../Styles/DetallesCursos.css";
import { AuthContext } from "../Context/AuthContext";
import { FaStar, FaRegStar, FaBook } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import {
  createInscripcion,
  deleteInscripcion,
  createReview,
  updateReview,
  deleteReview,
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
  const [esTutor, setEsTutor] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [dejoReview, setDejoReview] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null); // Cambiado de [null] a null
  const [estaInscrito, setEstaInscrito] = useState(false);
  const [inscripcion, setInscripcion] = useState({
    id: 0,
  });
  const [tutoria, setTutoria] = useState({
    titulo_tutoria: "",
    descripcion_tutoria: "",
    estudiantes_inscritos: 0,
    max_estudiantes: "",
    tutor_id: "",
    nombre_tutor: "",
    avatar: "",
    email_tutor: "",
    rating: "",
  });

  const handleEditReview = (review) => {
    if (!review?.id) {
      console.error("Reseña inválida recibida:", review);
      alert("No se puede editar esta reseña");
      return;
    }
    
    setEditingReview(review);
    setReviewRating(review.rating);
    setReviewComment(review.comment || "");
    setShowReviewForm(true);
  };

  const navigate = useNavigate();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { tutoriaId } = useParams();

  useEffect(() => {
    const fetchTutoriaData = async () => {
      try {
        setIsLoadingData(true);
        const response = await getATutoriaById(tutoriaId);
        const reviewsData = await getAllReviewsByTutoriaId(tutoriaId);

        if (!response) {
          throw new Error("No se encontró la tutoría solicitada");
        }

        const InfoTutor = await getTutorById(response.tutor_id);
        const infoEstudiantes = await getEstudiantesInscritosByTutoriaId(tutoriaId);

        setEstudiantes(infoEstudiantes);

        if (user && infoEstudiantes) {
          const usuarioInscrito = infoEstudiantes.find(
            (estudiante) => estudiante.id_estudiante === user.id
          );
          setEstaInscrito(!!usuarioInscrito);

          if (usuarioInscrito) {
            setInscripcion({ id: usuarioInscrito.id_inscripcion });
          }
        }

        if (user?.rol === "Tutor") {
          setEsTutor(true);
        }

        setTutoria({
          titulo_tutoria: response.titulo_tutoria,
          descripcion_tutoria: response.descripcion_tutoria,
          estudiantes_inscritos: response.estudiantes_inscritos,
          max_estudiantes: response.max_estudiantes,
          tutor_id: response.tutor_id,
          nombre_tutor: response.nombre_tutor,
          avatar: InfoTutor.nombre.charAt(0) + InfoTutor.apellidos.charAt(0),
          email_tutor: response.email_tutor,
          rating: calculateAverageRating(reviewsData),
        });

        const transformedReviews = reviewsData.map((review) => ({
          id: review.id_review,
          estudiante_id: review.estudiante_id,
          student: review.nombre_estudiante,
          rating: review.estrellas,
          comment: review.comentario,
          date: formatDate(review.fecha_review),
          course: review.titulo_tutoria,
        }));

        setReviews(transformedReviews);
        
        // Buscar y establecer la reseña del usuario actual
        const userReview = transformedReviews.find(
          (review) => review.estudiante_id === user?.id
        );
        
        setDejoReview(!!userReview);
        if (userReview) {
          setEditingReview(userReview);
        }

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
        navigate("/login");
        return;
      }

      const response = await createInscripcion(user.id, tutoriaId);
      setInscripcion({ id: response.id });
      alert(`Te has inscrito exitosamente`);
      setEstaInscrito(true);
    } catch (error) {
      console.error("Error en inscripción:", error);
      alert(error.response?.data?.message || "Error al inscribirse");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInscripcion(inscripcion.id);
      alert("Te has salido exitosamente");
      navigate("/tutorial");
    } catch (error) {
      alert(`Ocurrio un error ${error}`);
    }
  };

  const isTutoriaLlena = () => {
    return tutoria.estudiantes_inscritos >= tutoria.max_estudiantes;
  };

  const handleDeleteReview = async (reviewId) => {
  try {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta reseña?")) {
      await deleteReview(reviewId);
      const updatedReviews = reviews.filter(review => review.id !== reviewId);
      setReviews(updatedReviews);
      setDejoReview(false);
      setEditingReview(null);
      // Resetear los campos del formulario
      setReviewRating(0);
      setReviewComment("");
      setShowReviewForm(false); // Opcional: cerrar el formulario si está abierto
      alert("Reseña eliminada correctamente");
    }
  } catch (error) {
    console.error("Error al eliminar la reseña:", error);
    alert("Error al eliminar la reseña");
  }
};

  const handleSubmitReview = async (e) => {
  e.preventDefault();
  
  try {
    let newReviewData;
    
    if (editingReview) {
      await updateReview(editingReview.id, reviewRating, reviewComment);
      alert("Reseña actualizada correctamente");
    } else {
      // Crear nueva reseña y obtener los datos completos
      const response = await createReview(inscripcion.id, reviewRating, reviewComment);
      
      newReviewData = {
        id: response.id,
        student: `${user.nombre} ${user.apellidos}`,
        rating: reviewRating,
        comment: reviewComment,
        date: new Date().toLocaleDateString("es-ES"),
        estudiante_id: user.id,
        course: tutoria.titulo_tutoria
      };
      
      alert("¡Reseña creada exitosamente!");
    }

    // Actualizar la lista de reseñas
    const reviewsData = await getAllReviewsByTutoriaId(tutoriaId);
    const transformedReviews = reviewsData.map((review) => ({
      id: review.id_review,
      estudiante_id: review.estudiante_id,
      student: review.nombre_estudiante,
      rating: review.estrellas,
      comment: review.comentario,
      date: formatDate(review.fecha_review),
      course: review.titulo_tutoria,
    }));

    setReviews(transformedReviews);
    
    // Actualizar la reseña del usuario actual
    const userReview = transformedReviews.find(
      (review) => review.estudiante_id === user?.id
    );
    
    setDejoReview(!!userReview);
    setEditingReview(userReview || null); // Esto es clave para que funcione el botón de edición
    
    // Resetear el formulario
    setDejoReview(true); // Esto hará que el botón desaparezca
    setShowReviewForm(false);
    setEditingReview(null);
    
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const renderStars = (rating) => {
    const stars = [];
    const numericRating = typeof rating === "string" ? parseFloat(rating) : rating;

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

  if (isLoadingData) {
    return <div className="loading">Cargando tutoria...</div>;
  }

  return (
    <div className="course-container">
      <section className="intro">
        <div className="info">
          <div className="instructor-avatar">{tutoria.avatar}</div>
          <h1>{tutoria.nombre_tutor}</h1>
          {!esTutor &&
            (estaInscrito === false ? (
              isTutoriaLlena() ? (
                <button className="btn-secundario" disabled>
                  Cupo lleno
                </button>
              ) : (
                <button className="btn-secundario" onClick={handleClick}>
                  Inscribirse
                </button>
              )
            ) : (
              <button className="btn-secundario" onClick={handleDelete}>
                Salirse
              </button>
            ))}
        </div>

        <h1>{tutoria.titulo_tutoria}</h1>
        <p>{tutoria.descripcion_tutoria}</p>
      </section>

      <div className="reviews-container">
        <h2>Reseñas de estudiantes</h2>
        
        {/* Botón inteligente para crear/editar reseña */}
        {estaInscrito && !showReviewForm && !dejoReview && (
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
            <h3>{editingReview ? "Editar tu reseña" : "Escribe una nueva reseña"}</h3>
            <form onSubmit={handleSubmitReview}>
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
                  {editingReview ? "Actualizar reseña" : "Publicar reseña"}
                </button>
                <button
                  type="button"
                  className="btn-salirse"
                  onClick={() => {
                    setShowReviewForm(false);
                    setEditingReview(null);
                  }}
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
              <div className="review-card" key={`${review.id}-${review.student}`}>
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
                    <p className="course-name">{review.course}</p>
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
                {review.estudiante_id === user?.id && (
                  <div className="review-actions">
                    <button 
                      className="btn-editar" 
                      onClick={() => handleEditReview(review)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn-eliminar" 
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
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