import React, { useState, useEffect } from 'react';
import { getTutorias } from '../Services/TutoresService';
import TutoriasList from '../Components/TutoriasList/TutoriasList';
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
  const tutoriasPerPage = 5;

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

  // Filtrado de tutorías
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
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
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

      {/* Componente reutilizable de tutorías */}
      <TutoriasList 
        tutorias={currentTutorias}
        loading={loading}
        error={error}
        currentPage={currentPage}
        tutoriasPerPage={tutoriasPerPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        formatPrice={formatPrice}
      />
    </div>
  );
};

export default Tutorial;