import React, { useState, useEffect } from 'react';
import { getTutorias } from '../Services/TutoresService';
import TutoriasList from '../Components/TutoriasList/TutoriasList';
import '../Styles/tutorial.css';

const Tutorial = () => {
  const [tutorias, setTutorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
  <div>
    {/* Banner */}
    <section className="banner">
      <div className="carousel-content">
        <h1 className="banner-title">Descubre Más</h1>
        <p className="banner-subtitle">Conéctate, estudia y alcanza tus metas con apoyo personalizado</p>
      </div>
    </section>


      {/* Componente reutilizable de tutorías con funcionalidad integrada */}
      <TutoriasList 
        tutorias={tutorias}
        loading={loading}
        error={error}
        itemsPerPage={1} // Puedes ajustar este valor según necesites
      />
    </div>
  );
};

export default Tutorial;