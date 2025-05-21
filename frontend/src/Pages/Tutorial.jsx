import React, { useState, useEffect } from 'react';
import Rating from '../Components/Rating/Rating';
import { getTutorias } from '../Services/TutoresService';
import '../Styles/tutorial.css';

const Tutorial = () => {
  const formatPrice = (price) => {
  return parseFloat(price).toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });
};

  const [tutorias, setTutorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tutoriasPerPage = 2; // Mostrar 2 tutorías por página

  useEffect(() => {
    const fetchTutorias = async () => {
      try {
        const data = await getTutorias();
        setTutorias(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTutorias();
  }, []);

  // Filtrado de tutorías basado en el término de búsqueda
  const filteredTutorias = tutorias.filter(tutoria => 
    tutoria.titulo_tutoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutoria.descripcion_tutoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutoria.nombre_tutor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica de paginación
  const indexOfLastTutoria = currentPage * tutoriasPerPage;
  const indexOfFirstTutoria = indexOfLastTutoria - tutoriasPerPage;
  const currentTutorias = filteredTutorias.slice(indexOfFirstTutoria, indexOfLastTutoria);
  const totalPages = Math.ceil(filteredTutorias.length / tutoriasPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resetear a la primera página al buscar
  };

  if (loading) return <div className="loading">Cargando tutorías...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  

  return (
    <div className="tutorias-container">
      {/* Banner */}
      <section className="banner">
        <div className="carousel-content">
          <h1>Descubre Más</h1>
          <input 
            type="text" 
            placeholder="Buscar tutorías..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </section>

      {/* Lista de Tutorías */}
      <section className="courses-container">
        {currentTutorias.length > 0 ? (
          currentTutorias.map((tutoria) => (
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
      {filteredTutorias.length > tutoriasPerPage && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            «
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
};

export default Tutorial;