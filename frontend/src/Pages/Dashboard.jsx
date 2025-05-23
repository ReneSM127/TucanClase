import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import AlumnosDashboard from "./AlumnosDashboard";
import TutorDashboard from "./TutorDashboard";

const Dashboard = () => {
  const { user: contextUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);


  // Efecto para obtener el ID del tutor
  useEffect(() => {
    const getCurrentTutorId = () => {
      // 1. Intenta del contexto primero
      if (contextUser?.id) return contextUser.id;

      // 2. Si no está en el contexto, busca en localStorage
      const storedUser = localStorage.getItem("usuario");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          return parsedUser.id;
        } catch (e) {
          console.error("Error parsing user data from localStorage", e);
        }
      }
      return null;
    };

    const id = getCurrentTutorId();
    if (id) {
      setUserId(id);
    } else {
      setError("No se pudo obtener el ID del tutor. Redirigiendo...");
      setLoading(false);
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [contextUser, navigate]);

  // Efecto para cargar los datos cuando tengamos el userId
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div className="loading">Cargando perfil...</div>;
  if (error) return <div className="error">{error}</div>;

  if (contextUser.rol === "Tutor")
      return(
    <TutorDashboard/>
    )
    if (contextUser.rol === "Estudiante")
      return(
    <AlumnosDashboard/>
    )
};

export default Dashboard;
