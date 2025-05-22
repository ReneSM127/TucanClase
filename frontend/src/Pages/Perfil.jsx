import React, { useEffect, useState } from 'react';
import { getUserById } from '../Services/usuarios';
import { useParams } from "react-router-dom";
import TutorPerfil from '../Components/TutorPerfil';
import EstudiantePerfil from '../Components/EstudiantePerfil';

const Perfil = () => {

  const {id} = useParams();
    
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const data = await getUserById(id);
          setUser(data);
          console.log(data)
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchUser();
    }, [id]);
  
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>Cargando...</p>;
    if (user.rol === "Tutor")
      return(
    <TutorPerfil/>
    )
    if (user.rol === "Estudiante")
      return(
    <EstudiantePerfil/>
    )
};



export default Perfil