import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { loginService } from '../Services/authService';
import '../Styles/signup-sty.css';

const Login = () => {
  const { login } = useContext(AuthContext);

  /*Aquí se crean constantes que serán las que se envien al backend*/
  /*Además se crea su propio setter para el UseState*/
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*Aquí se crean constantes de errores, de cargar y navegación*/
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  /*Función cuando se de clic al boton*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await loginService(email, password);
      // Guardar los datos del usuario en el estado global o localStorage
      login(response.usuario, response.token); 
      // Redirigir al dashboard o página principal
      navigate('/Dashboard');
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
          <h2>Iniciar Sesión</h2>
          <p>¡Bienvenido de nuevo! Inicie sesión para acceder a su cuenta.</p>
          <form onSubmit={handleSubmit}> {/* Llama a la funcion */}
            {error && <div className="error-message">{error}</div>}

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
                value={password}
                onChange={(e) => setPassword(e.target.value)} //Cada vez que se le de clic se actualiza el valor
                required
              />
            </div>
            <button className='checkresult'
              type="submit"
              disabled={isLoading}
            >
              {/* Si isLoadign es True, se pone el primer texto, de lo contrario se pone Iniciar Sesion */}
              {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;