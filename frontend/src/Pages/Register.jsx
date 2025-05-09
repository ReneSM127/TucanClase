import React from 'react';
import '../Styles/signup-sty.css';

const Register = () => {
  return (
    <div>
      <div className="container">
        <div className="login-box">
          <h2>Registrarse</h2>
          <p>Cree una cuenta para desbloquear más funciones.</p>
          <form>
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" placeholder="Ingresa tu nombre" />

            <label htmlFor="email">Correo</label>
            <input type="email" id="email" placeholder="Ingresa tu correo" />

            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input type="password" id="password" placeholder="Ingresa tu contraseña" />
            </div>

            <div className="remember-forgot2">
              <label className="remember-label2">
                <input type="checkbox" /> Aceptar Términos de uso 
              </label>
            </div>

            <button type="submit">Registrarse</button>
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