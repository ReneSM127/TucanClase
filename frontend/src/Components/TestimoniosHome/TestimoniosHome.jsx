import React, { useState, useEffect } from 'react';
import './TestimoniosHome.css';
import { FaStar } from 'react-icons/fa';
import { getAllReviews } from '../../Services/TutoresService'; // Asume que tienes este servicio

const Testimonials = () => {
  const [topReviews, setTopReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopReviews = async () => {
      try {
        setLoading(true);
        const allReviews = await getAllReviews();
        
        // Filtrar y ordenar reseñas (4+ estrellas, ordenadas por rating descendente)
        const filteredReviews = allReviews
          .filter(review => review.estrellas >= 4 && review.comentario)
          .sort((a, b) => b.estrellas - a.estrellas)
          .slice(0, 4); // Tomar las 4 mejores
        
        setTopReviews(filteredReviews);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTopReviews();
  }, []);

  // Render de estrellas
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? "star filled" : "star"} 
      />
    ));
  };

  if (loading) return <div className="loading">Cargando testimonios...</div>;
  if (error) return <div className="error">Error al cargar testimonios: {error}</div>;

  // Si no hay reseñas con 4+ estrellas, mostrar mensaje
  if (topReviews.length === 0) {
    return (
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Testimonios de nuestros estudiantes</h2>
            <p className="section-subtitle">
              Pronto tendremos testimonios de nuestros estudiantes. ¡Sé el primero en dejar tu reseña!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials-section">
      <div className="benefits-header">
        <h2>Testimonios</h2>
      </div>  
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Testimonios de nuestros estudiantes👨🏿‍🎓</h2>
          <p className="section-subtitle">
            Descubra cómo nuestras tutorías han ayudado a otros estudiantes a mejorar su rendimiento académico y ganar confianza en sus habilidades.
          </p>
        </div>
        
        <div className="divider"></div>
        
        <div className="testimonials-grid">
          {topReviews.map((review) => (
            <div key={review.id} className="testimonial-card">
              <div className="testimonial-rating">
                {renderStars(review.estrellas)}
              </div>
              <blockquote className="testimonial-quote">"{review.comentario}"</blockquote>
              <div className="testimonial-footer">
                <p className="testimonial-author">- {review.nombre_estudiante || 'Estudiante'}</p>
                {review.titulo_tutoria && (
                  <p className="testimonial-course">Tutoría: {review.titulo_tutoria}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;