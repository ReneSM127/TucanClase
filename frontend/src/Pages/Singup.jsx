import React from 'react';
import '../Styles/signup-sty.css';

const Register = () => {
  return (
    <div>
      <div className="container">
        <div className="login-box">
          <h2>Iniciar Sesión</h2>
          <p>¡Bienvenido de nuevo! Inicie sesión para acceder a su cuenta.</p>
          <form>
            <label htmlFor="email">Correo</label>
            <input type="email" id="email" placeholder="Ingresa tu correo" />

            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input type="password" id="password" placeholder="Ingresa tu contraseña" />
            </div>

            <div className="remember-forgot">
              <label className="remember-label">
                <input type="checkbox" /> Recuérdame
              </label>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
          <button onClick={() => window.location.href='./AlumnosDashboard.html'}>Iniciar Sesión</button>
          <div className="divider">o</div>
          <div className="google-btn">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
            Iniciar con Google
          </div>
          <p><br />No tienes cuenta? <a href="../Views/register.html">Registrate</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;