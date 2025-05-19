import React, { useState, useContext, useEffect} from "react";
import { FiEdit, FiSave, FiLock } from "react-icons/fi";
import "../Styles/Perfil.css";
import { AuthContext } from "../Context/AuthContext";

const Perfil = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    biografia: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Sincronizar datos del usuario cuando estén disponibles
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
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditMode(false);
    console.log("Datos a actualizar:", formData);
  };

  const handleCancel = () => {
    setEditMode(false);
    // Restaurar valores del usuario actual
    setFormData({
      nombre: user.nombre || "",
      apellidos: user.apellidos || "",
      email: user.email || "",
      biografia: user.descripcion || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="perfil-contraseña-container">
        <div className="loading-message">Cargando perfil...</div>
      </div>
    );
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

      {/* Formulario de cambio de contraseña */}
      <div className="password-section">
        <h2>
          <FiLock /> Cambiar contraseña
        </h2>

        {!showPasswordForm ? (
          <button
            className="btn-cambiar-contraseña"
            onClick={() => setShowPasswordForm(true)}
          >
            Cambiar contraseña
          </button>
        ) : (
          <form className="password-form">
            <div className="campo">
              <label>Contraseña actual</label>
              <input
                type="password"
                name="actual"
                value={"password.actual"}
                required
              />
            </div>

            <div className="campo">
              <label>Nueva contraseña</label>
              <input
                type="password"
                name="nueva"
                value={"password.nueva"}
                required
              />
            </div>

            <div className="campo">
              <label>Confirmar nueva contraseña</label>
              <input
                type="password"
                name="confirmacion"
                value={"password.confirmacion"}
                required
              />
            </div>

            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}

            <div className="password-actions">
              <button
                type="button"
                className="btn-cancelar"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordError("");
                }}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-guardar">
                <FiSave /> Actualizar contraseña
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Perfil;
