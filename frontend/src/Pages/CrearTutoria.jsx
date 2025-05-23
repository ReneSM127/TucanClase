import React, { useState, useContext, useEffect } from "react";
import { FiSave, FiPlus } from "react-icons/fi";
import { AuthContext } from "../Context/AuthContext";
import { createTutoriaService, getAllMaterias, createMateriaService } from "../Services/TutoriasService";
import "../Styles/CrearTutoria.css";
import { useNavigate } from 'react-router-dom';

const CrearTutoria = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [materias, setMaterias] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    materiaId: "",
    descripcion: "",
    duracion: 1,
    maxEstudiantes: 1,
    nuevaMateria: {
      nombre: "",
      descripcion: ""
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar materias al montar el componente
  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const materiasData = await getAllMaterias();
        setMaterias(materiasData);
      } catch (err) {
        setError("No se pudieron cargar las materias");
        console.error(err);
      }
    };
    fetchMaterias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMateriaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      nuevaMateria: {
        ...prev.nuevaMateria,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Si estamos creando una nueva materia
      let materiaId = formData.materiaId;
      if (showAddCategory) {
        const nuevaMateria = await createMateriaService(
          formData.nuevaMateria.nombre,
          formData.nuevaMateria.descripcion
        );
        materiaId = nuevaMateria.id;
      }

      // Crear la tutoría
      const tutoriaData = {
        tutorId: user.id, // Usamos el ID del usuario logueado
        materiaId,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        duracion: formData.duracion,
        maxEstudiantes: formData.maxEstudiantes,
        estado: "activa" // Estado por defecto
      };

      await createTutoriaService(tutoriaData);
      
      // Éxito: puedes redirigir o mostrar mensaje
      alert("Tutoría creada exitosamente!");
      navigate("/Dashboard")
      
      // Resetear formulario
      setFormData({
        titulo: "",
        materiaId: "",
        descripcion: "",
        duracion: 1,
        maxEstudiantes: 1,
        nuevaMateria: {
          nombre: "",
          descripcion: ""
        }
      });
    } catch (err) {
      setError(err.message || "Error al crear la tutoría");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="crear-tutoria-container">
      <form className="crear-tutoria-form" onSubmit={handleSubmit}>
        <div className="crear-tutoria-header">
          <h1>Crear Nueva Tutoría</h1>
        </div>
        
        {error && <div className="error-message">{error}</div>}

        <div className="form-section">
          <div className="form-group">
            <label>Título de la tutoría</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ej: Matemáticas Básicas"
              required
            />
          </div>

          <div className="form-group">
            <div className="category-header">
              <label>Categoría</label>
              {!showAddCategory && (
                <button 
                  type="button" 
                  className="add-category-btn"
                  onClick={() => setShowAddCategory(true)}
                >
                  <FiPlus size={14} /> Añadir categoría
                </button>
              )}
            </div>

            {showAddCategory ? (
              <div className="category-form">
                <div className="form-group">
                  <label>Nombre de la categoría</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nuevaMateria.nombre}
                    onChange={handleMateriaChange}
                    placeholder="Nombre de la nueva categoría"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Descripción de la categoría</label>
                  <textarea
                    name="descripcion"
                    value={formData.nuevaMateria.descripcion}
                    onChange={handleMateriaChange}
                    placeholder="Breve descripción de la categoría"
                    rows="3"
                  />
                </div>

                <div className="category-actions">
                  <button 
                    type="button"
                    onClick={() => setShowAddCategory(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <select 
                name="materiaId"
                value={formData.materiaId}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                {materias.map(materia => (
                  <option key={materia.id} value={materia.id}>
                    {materia.nombre}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label>Descripción de la tutoría</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe los temas que cubrirás, metodología, etc."
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Duración (horas)</label>
              <input 
                type="number" 
                name="duracion" 
                value={formData.duracion}
                onChange={handleChange}
                min="1" 
                max="24" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Máximo de estudiantes</label>
              <input 
                type="number" 
                name="maxEstudiantes" 
                value={formData.maxEstudiantes}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary">
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            <FiSave /> {isLoading ? "Creando..." : "Crear Tutoría"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearTutoria;