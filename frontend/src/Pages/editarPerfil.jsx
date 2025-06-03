import React, { useState, useContext, useEffect} from "react";
import { FiEdit, FiSave, FiLock } from "react-icons/fi";
import "../Styles/Perfil.css";
import { AuthContext } from "../Context/AuthContext";
import { updateProfileService } from "../Services/authService";


const EditarPerfil = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    biografia: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        apellidos: user.apellidos || "",
        email: user.email || "",
        biografia: user.descripcion || "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleEdit = () => {
    setEditMode(true);
    setError(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError(null);

    try {
      const updatedUser = await updateProfileService(user.id, {
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        descripcion: formData.biografia,
      });

      const updatedUserData = {
        ...user,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        descripcion: formData.biografia,
      };

      alert("Datos actualizados correctamente");
      localStorage.setItem('usuario', JSON.stringify(updatedUserData));
      
      // Usa setUser del contexto
      setUser(updatedUserData);

      setEditMode(false);
    } catch (err) {
      // ... manejo de errores
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData({
      nombre: user.nombre || "",
      apellidos: user.apellidos || "",
      email: user.email || "",
      biografia: user.descripcion || "",
    });
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="perfil-contraseña-container">Cargando perfil...</div>;
  }

  return (
    <div className="perfil-contraseña-container">
      {/* Formulario principal */}
      <form onSubmit={handleSave}>
        <div className="perfil-header">
          <h1>Mi Perfil</h1>
        </div>

        <div className="perfil-avatar">
          <div className="avatar"></div>
        </div>

        <div className="campos-perfil">
          <div className="campo">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>

          <div className="campo">
            <label>Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>

          <div className="campo">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </div>

          <div className="campo">
            <label>Biografía</label>
            <textarea name="biografia" value={formData.biografia} onChange={handleInputChange} disabled={!editMode} />
          </div>
        </div>

        {/* Botones del formulario principal */}
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
      </form>
    </div>
  );
};

export default EditarPerfil;
