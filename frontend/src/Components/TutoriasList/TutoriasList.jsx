import React from 'react';
import Rating from '../Rating/Rating';

const TutoriasList = ({ 
  tutorias, 
  loading, 
  error, 
  currentPage, 
  tutoriasPerPage, 
  totalPages, 
  onPageChange,
  formatPrice
}) => {
  if (loading) return <div className="loading">Cargando tutorías...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="tutorias-container">
      {/* Lista de Tutorías */}
      <section className="courses-container">
        {tutorias.length > 0 ? (
          tutorias.map((tutoria) => (
            <div className="course-card" key={tutoria.tutoria_id}>
              <img 
                src={tutoria.foto_tutor || '../Assets/default-course.jpeg'} 
                alt={`Tutor ${tutoria.nombre_tutor}`} 
              />
              <div className="course-info">
                <h2>{tutoria.titulo_tutoria}</h2>
                <p>{tutoria.descripcion_tutoria}</p>
                
                <div className="tutoria-details">
                  <p><strong>Duración:</strong> {tutoria.duracion_minutos} minutos</p>
                  <p><strong>Precio:</strong> {formatPrice(tutoria.precio)}</p>
                  <p><strong>Tutor:</strong> {tutoria.nombre_tutor}</p>
                  <p>
                    <strong>Cupos:</strong> {tutoria.estudiantes_inscritos}/{tutoria.max_estudiantes} estudiantes
                  </p>
                  <p>
                    <strong>Estado:</strong> {tutoria.estado_tutoria}
                  </p>
                  <p>
                      <strong>Calificación:</strong> <Rating rating={parseFloat(tutoria.promedio_calificacion)} />
                  </p>
                </div>
                
                <button onClick={() => window.location.href=`/tutoria/${tutoria.tutoria_id}`}>
                  Ver Tutoria
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            No se encontraron tutorías que coincidan con tu búsqueda.
          </div>
        )}
      </section>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            «
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
};

export default TutoriasList;