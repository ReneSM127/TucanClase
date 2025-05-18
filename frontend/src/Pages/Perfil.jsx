import React, { useState } from 'react';
import { FiEdit, FiSave, FiLock } from 'react-icons/fi';
import '../Styles/Perfil.css';

const Perfil = () => {
  // Datos del usuario
  const [user, setUser] = useState({
    nombre: 'María',
    apellidos: 'González Pérez',
    email: 'maria.gonzalez@example.com',
    telefono: '+52 55 1234 5678',
    biografia: 'Profesora de matemáticas con 5 años de experiencia.'
  });

  // Estados para el formulario principal
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({...user});

  // Estados para el formulario de contraseña
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState({
    actual: '',
    nueva: '',
    confirmacion: ''
  });
  const [passwordError, setPasswordError] = useState('');

  // Handlers para el formulario principal
  const handleEdit = () => {
    setEditMode(true);
    setTempUser({...user});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser({...tempUser, [name]: value});
  };

  const handleSave = () => {
    setUser(tempUser);
    setEditMode(false);
    // Aquí iría la función para enviar los datos al backend
    console.log('Datos a guardar:', tempUser);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  // Handlers para el formulario de contraseña
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones
    if (password.nueva !== password.confirmacion) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }
    
    if (password.nueva.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    setPasswordError('');
    
    // Aquí iría la llamada al backend para cambiar la contraseña
    console.log('Cambiando contraseña:', {
      actual: password.actual,
      nueva: password.nueva
    });
    
    // Resetear el formulario
    setPassword({
      actual: '',
      nueva: '',
      confirmacion: ''
    });
    setShowPasswordForm(false);
  };

  return (
    <div className="perfil-contraseña-container">
      {/* Formulario principal */}
      <div className="perfil-header">
        <h1>Mi Perfil</h1>
      </div>

      <div className="perfil-avatar">
        <div className="avatar">
          {user.nombre.charAt(0)}{user.apellidos.charAt(0)}
        </div>
      </div>

      <div className="campos-perfil">
        <div className="campo">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={tempUser.nombre}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="campo">
          <label>Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={tempUser.apellidos}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="campo">
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={tempUser.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="campo">
          <label>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={tempUser.telefono}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="campo">
          <label>Biografía</label>
          <textarea
            name="biografia"
            value={tempUser.biografia}
            onChange={handleChange}
            disabled={!editMode}
          />
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
            <button className="btn-guardar" onClick={handleSave}>
              <FiSave /> Guardar cambios
            </button>
          </div>
        )}
      </div>

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
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div className="campo">
              <label>Contraseña actual</label>
              <input
                type="password"
                name="actual"
                value={password.actual}
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <div className="campo">
              <label>Nueva contraseña</label>
              <input
                type="password"
                name="nueva"
                value={password.nueva}
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <div className="campo">
              <label>Confirmar nueva contraseña</label>
              <input
                type="password"
                name="confirmacion"
                value={password.confirmacion}
                onChange={handlePasswordChange}
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
                  setPasswordError('');
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