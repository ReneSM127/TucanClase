import React, { useEffect, useState } from 'react';
import { getUserById } from '../Services/usuarios';
import { useParams } from "react-router-dom";
import TutorPerfil from './TutorPerfil';
import EstudiantePerfil from './EstudiantePerfil';
import NotFound from './Error404';

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
          return <NotFound/>
          setError(err.message);
        }
      };
  
      fetchUser();
    }, [id]);
  
    if (error) return <p>Error: {error}</p>;
    if (!user) return<NotFound/>;
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