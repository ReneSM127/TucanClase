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
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              placeholder="Ingresa tu nombre"
              name='nombre'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} //Cada vez que se le de clic se actualiza el valor
              required
            />

            <label htmlFor="name">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              placeholder="Ingresa tus apellidos"
              name='apellidos'
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)} //Cada vez que se le de clic se actualiza el valor
              required
            />

            <label htmlFor="email">Correo</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} //Cada vez que se le de clic se actualiza el valor
              required
            />

            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} //Cada vez que se le de clic se actualiza el valor
                required
              />
            </div>

            <label htmlFor="role">Rol</label>
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

            <div className="remember-forgot2">
              <label className="remember-label2">
                <input type="checkbox" /> Aceptar Términos de uso
              </label>
            </div>

            <button className="checkresult"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Registrarse'}
            </button>
            <div className="divider">o</div>
            <div className="google-btn">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
              Registrarse con Google
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;