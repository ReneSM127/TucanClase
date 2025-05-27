import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiSave, FiPlus, FiEdit } from "react-icons/fi";
import { AuthContext } from "../Context/AuthContext";
import {
  createTutoriaService,
  getAllMaterias,
  createMateriaService,
  updateMateriaById,
  getATutoriaById,
  updateTutoriaById,
  deleteTutoriaById,
  getEstudiantesInscritosByTutoriaId
} from "../Services/TutoriasService";
import "../Styles/CrearTutoria.css";
import { useNavigate } from "react-router-dom";

const GestionarTutoria = () => {
  const navigate = useNavigate();
  const { tutoriaId } = useParams();
  const { user } = useContext(AuthContext);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [Estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    titulo: "",
    materiaId: "",
    descripcion: "",
    duracion: 1,
    maxEstudiantes: 1,
    nuevaMateria: {
      nombre: "",
      descripcion: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        // Caso 2: Hay ID (edición existente)
        setIsLoadingData(true);
        const response = await getATutoriaById(tutoriaId);

        if (!response) {
          throw new Error("No se encontró la tutoría solicitada");
        }

        setFormData({
          titulo: response.titulo_tutoria || "",
          materiaId: response.materia_id || "",
          descripcion: response.descripcion_tutoria || "",
          duracion: response.duracion_minutos || 1,
          maxEstudiantes: response.max_estudiantes || 1,
          nuevaMateria: {
            nombre: "",
            descripcion: "",
          },
        });
      } catch (err) {
        setError(err.message || "No se pudo cargar la tutoría");
        console.error(err);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchForm();
  }, [tutoriaId]);

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMateriaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      nuevaMateria: {
        ...prev.nuevaMateria,
        [name]: value,
      },
    }));
  };

  const handleAlumnos = async () =>{
    if (!tutoriaId) return;

    try {
      setIsLoadingData(true);
      const response = await getEstudiantesInscritosByTutoriaId(tutoriaId);
      setEstudiantes([response]);

    } catch (err) {
      setError(err.message || "Error al recargar los datos");
    } finally {
      setIsLoadingData(false);
    }
  }

  //
  const handleEdit = () => {
    setEditMode(true);
    setError(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    fetchTutoriaData();
  };

  const handleEliminar = async () => {
    if (!tutoriaId) return;

    try {
      setIsLoadingData(true);
      const response = await deleteTutoriaById(tutoriaId);

      navigate("/")
    } catch (err) {
      setError(err.message || "Error al recargar los datos");
    } finally {
      setIsLoadingData(false);
    }

  };

  const fetchTutoriaData = async () => {
    if (!tutoriaId) return;

    try {
      setIsLoadingData(true);
      const response = await getATutoriaById(tutoriaId);

      setFormData({
        titulo: response.titulo_tutoria || "",
        materiaId: response.materia_id || "",
        descripcion: response.descripcion_tutoria || "",
        duracion: response.duracion_minutos || 1,
        maxEstudiantes: response.max_estudiantes || 1,
        nuevaMateria: {
          nombre: "",
          descripcion: "",
        },
      });
    } catch (err) {
      setError(err.message || "Error al recargar los datos");
    } finally {
      setIsLoadingData(false);
    }
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
      };

      await updateTutoriaById(tutoriaId, tutoriaData);

      // Éxito: puedes redirigir o mostrar mensaje
      alert("Tutoría actualizada exitosamente!");
      setEditMode(false);

      // Resetear formulario
      setFormData({
        titulo: "",
        materiaId: "",
        descripcion: "",
        duracion: 1,
        maxEstudiantes: 1,
        nuevaMateria: {
          nombre: "",
          descripcion: "",
        },
      });
    } catch (err) {
      setError(err.message || "Error al crear la tutoría");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="crear-tutoria-container">
        <form className="crear-tutoria-form" onSubmit={handleSubmit}>
          <div className="crear-tutoria-header">
            <h1>Editar tutoria</h1>
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
                disabled={!editMode}
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
                    disabled={!editMode}
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
                      disabled={!editMode}
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
                      disabled={!editMode}
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
                  disabled={!editMode}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {materias.map((materia) => (
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
                disabled={!editMode}
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
                  disabled={!editMode}
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
                  disabled={!editMode}
                  required
                />
              </div>
            </div>
          </div>

          <div className="perfil-footer">
            {!editMode ? (
              <button className="btn-editar" onClick={handleEdit}>
                <FiEdit /> Editar perfil
              </button>
            ) : (
              <div className="acciones">
                <button className="btn-cancelar" onClick={handleCancel}>
                  Cancelar
                </button>
                <button className="btn-guardar">
                  <FiSave /> Guardar cambios
                </button>
              </div>
            )}
          </div>
            <button className="eliminar" onClick={handleEliminar}>Eliminar tutoria</button>
        </form>
      <div className="crear-tutoria-header">
      </div>
      </div>
    </div>
  );
};

export default GestionarTutoria;
