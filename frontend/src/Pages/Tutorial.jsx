import React, { useState, useEffect, useContext } from 'react';
import TutoriasList from '../Components/TutoriasList/TutoriasList';
import '../Styles/tutorial.css';
import { AuthContext } from "../Context/AuthContext";
import {getEstudiantesNoInscritosByTutoriaId, getTutoriasByIdAlumnos} from "../Services/TutoriasService"



const Tutorial = () => {
  const [tutorias, setTutorias] = useState([]);
  const [tutoriasInscritras, setTutoriasInscritras] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    if (user) {
      console.log(user.id);
    }

  },[user]);
  
  
  useEffect(() => {
    const fetchTutorias = async () => {
      try {
        const data = await getEstudiantesNoInscritosByTutoriaId(user.id);
        const data2 = await getTutoriasByIdAlumnos(user.id)
        setTutorias(data);
        setTutoriasInscritras(data2)
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
      <h2>Tutorias Disponibles</h2>

      {/* Componente reutilizable de tutorías con funcionalidad integrada */}
      <TutoriasList 
        tutorias={tutorias}
        loading={loading}
        error={error}
        itemsPerPage={2} // Puedes ajustar este valor según necesites //tutoriasInscritras
      />
      <h2>Tutorias Inscritas</h2>
      <TutoriasList 
        tutorias={tutoriasInscritras}
        loading={loading}
        error={error}
        itemsPerPage={2} // Puedes ajustar este valor según necesites //tutoriasInscritras
      />
    </div>
  );
};

export default Tutorial;