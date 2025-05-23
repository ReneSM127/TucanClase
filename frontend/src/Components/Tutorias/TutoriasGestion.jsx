import React, { useState, useEffect } from 'react';
import Rating from '../Rating/Rating';

const TutoriasGestion = ({ 
  tutorias: initialTutorias, 
  loading, 
  error, 
  itemsPerPage = 2,
  showPagination = true
}) => {
  // Estados para manejar la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorias, setTutorias] = useState(initialTutorias || []);

  // Actualizar las tutorías cuando cambien las props
  useEffect(() => {
    setTutorias(initialTutorias || []);
    setCurrentPage(1); // Resetear a la primera página al cambiar las tutorías
  }, [initialTutorias]);

  // Función para formatear precios
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN'
    });
  };

  // Lógica de paginación
  const totalItems = tutorias.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTutorias = tutorias.slice(indexOfFirstItem, indexOfLastItem);

  // Manejar cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (loading) return <div className="loading">Cargando tutorías...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="tutorias-container">
      {/* Lista de Tutorías */}
      <section className="courses-container">
        {currentTutorias.length > 0 ? (
          currentTutorias.map((tutoria) => (
            <div className="course-card" key={tutoria.tutoria_id}>
              
              <div className="course-info">
                <h2>{tutoria.titulo_tutoria}</h2>
                <p>{tutoria.descripcion_tutoria}</p>
                <p>{tutoria.nombre_materia}</p>

                
                <div className="tutoria-details">
                  <p><strong>Duración:</strong> {tutoria.duracion_minutos} minutos</p>
                  <p><strong>Tutor:</strong> {tutoria.nombre_tutor}</p>
                  <p>
                    <strong>Cupos:</strong> {tutoria.estudiantes_inscritos}/{tutoria.max_estudiantes} estudiantes
                  </p>
                  <p>
                    <strong>Calificación:</strong> <Rating rating={parseFloat(tutoria.promedio_calificacion) || 0} />
                  </p>
                </div>
                
                <button onClick={() => window.location.href=`/tutoria/${tutoria.tutoria_id}`}>
                  Ver Tutoria
                </button>
                <button onClick={() => window.location.href=`/tutoria/${tutoria.tutoria_id}`}>
                  Gestionar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            No hay tutorías disponibles
          </div>
        )}
      </section>

      {/* Paginación */}
      {showPagination && totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            «
          </button>
          
          {/* Mostrar números de página */}
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            // Lógica para mostrar páginas cercanas a la actual
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={currentPage === pageNum ? 'active' : ''}
              >
                {pageNum}
              </button>
            );
          })}
          
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="pagination-ellipsis">...</span>
          )}
          
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <button onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </button>
          )}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
          >
            »
          </button>
        </div>
      )}
    </div>
  );
};

export default TutoriasGestion;