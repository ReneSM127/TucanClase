import React, { useState } from 'react';
import '../Styles/signup-sty.css';
import { useNavigate } from 'react-router-dom';
import { registerService } from '../Services/authService';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await registerService(nombre, apellidos, email, password, rol);
      // Guardar los datos del usuario en el estado global o localStorage

      // Redirigir al dashboard o página principal
      alert("Registro exitoso, inicie sesion")
      navigate('/Login');
    } catch (err) {
      setError(err.message || 'Credenciales inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="login-box">
          <h2>Registrarse</h2>
          <p>Cree una cuenta para desbloquear más funciones.</p>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <label className='labelogin' htmlFor="name">Nombre</label>
            <input className='inputlogin'
              type="text"
              id="name"
              placeholder="Ingresa tu nombre"
              name='nombre'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} //Cada vez que se le de clic se actualiza el valor
              required
            />

            <label className='labelogin' htmlFor="name">Apellidos</label>
            <input className='inputlogin'
              type="text"
              id="apellidos"
              placeholder="Ingresa tus apellidos"
              name='apellidos'
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)} //Cada vez que se le de clic se actualiza el valor
              required
            />

            <label className='labelogin' htmlFor="email">Correo</label>
            <input className='inputlogin'
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} //Cada vez que se le de clic se actualiza el valor
              required
            />

            <label className='labelogin' htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input className='inputlogin'
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} //Cada vez que se le de clic se actualiza el valor
                required
              />
            </div>

            <label className='labelogin' htmlFor="role">Rol</label>
            <select
              id="role"
              className="role-select"
              name='rol'
              value={rol}
              onChange={(e) => setRol(e.target.value)} //Cada vez que se le de clic se actualiza el valor
              required
            >
              <option value="">Selecciona tu rol</option>
              <option value="Estudiante">Estudiante</option>
              <option value="Tutor">Tutor</option>
            </select>

            <button className="checkresult"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Registrarse'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;