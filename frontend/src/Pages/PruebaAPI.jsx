import React, { useEffect, useState } from 'react';
import { getUserById } from '../Services/usuarios';

const PruebaAPI = ({ userId }) => {
    
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const data = await getUserById(userId);
          setUser(data);
          console.log(data)
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchUser();
    }, [userId]);
  
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>Cargando...</p>;
    return (
        <div>
      <h2>Usuario</h2>
      <p>ID: {user.id}</p>
    </div>
  );
};



export default PruebaAPI