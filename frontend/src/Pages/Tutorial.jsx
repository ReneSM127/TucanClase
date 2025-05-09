import React from 'react';
import './tutorial.css';

const Tutorial = () => {
  return (
    <div className="tutorias-container">
      {/* Header */}
      <header className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <nav className="nav-links">
          <a href="/">Inicio</a>
          <a href="/tutorias">Tutorías</a>
          <a href="/nosotros">Nosotros</a>
          <a href="/signup">Crear</a>
          <a href="/contacto">Contactar</a>
        </nav>
        <div className="auth-buttons">
          <a href="/register" className="register">Registrarse</a>
          <a href="/login" className="login">Iniciar sesión</a>
        </div>
      </header>

      {/* Banner */}
      <section className="banner">
        <div className="carousel-content">
          <h1>Descubre Más</h1>
          <input type="text" placeholder="Buscar cursos..." />
        </div>
      </section>

      {/* Lista de Cursos */}
      <section className="courses-container">
        {/* PRIMER CURSO */}
        <div className="course-card">
          <img src="/matematicas.jpeg" alt="Curso Matemáticas" />
          <div className="course-info">
            <h2>Matemáticas</h2>
            <p>Aprende desde lo más básico hasta temas complejos como cálculo y álgebra avanzada. Ideal para estudiantes de todos los niveles.</p>
            <p><strong>Instructor:</strong> Juan Pérez</p>
            <button onClick={() => window.location.href='/curso'}>Ver Curso</button>
            <div className="temario">
              <span>01 <small>Fundamentos</small></span>
              <span>02 <small>Álgebra</small></span>
              <span>03 <small>Geometría</small></span>
              <span>04 <small>Cálculo</small></span>
              <span>05 <small>Probabilidad</small></span>
            </div>
          </div>
        </div>

        {/* SEGUNDO CURSO */}
        <div className="course-card">
          <img src="/fisica.jpeg" alt="Curso Física" />
          <div className="course-info">
            <h2>Física</h2>
            <p>Comprende el movimiento, energía, fuerzas, y teorías fundamentales de la física clásica y moderna.</p>
            <p><strong>Instructor:</strong> María López</p>
            <button onClick={() => window.location.href='/curso'}>Ver Curso</button>
            <div className="temario">
              <span>01 <small>Mecánica</small></span>
              <span>02 <small>Óptica</small></span>
              <span>03 <small>Termodinámica</small></span>
              <span>04 <small>Ondas</small></span>
              <span>05 <small>Electromagnetismo</small></span>
            </div>
          </div>
        </div>

        {/* TERCER CURSO */}
        <div className="course-card">
          <img src="/quimica.jpeg" alt="Curso Química" />
          <div className="course-info">
            <h2>Química</h2>
            <p>Comprende el movimiento, energía, fuerzas, y teorías fundamentales de la física clásica y moderna.</p>
            <p><strong>Instructor:</strong> Tec Balam Maria</p>
            <button onClick={() => window.location.href='/curso'}>Ver Curso</button>
            <div className="temario">
              <span>01 <small>Elementos</small></span>
              <span>02 <small>Reacciones</small></span>
              <span>03 <small>Teoremas</small></span>
              <span>04 <small>Radiactivida</small></span>
              <span>05 <small>Quimica orgánica</small></span>
            </div>
          </div>
        </div>

        {/* CUARTO CURSO */}
        <div className="course-card">
          <img src="/EcuacionesDiferenciales.jpeg" alt="Curso EcuacionesDiferenciales" />
          <div className="course-info">
            <h2>Ecuaciones Diferenciales</h2>
            <p>Comprende el movimiento, energía, fuerzas, y teorías fundamentales de la física clásica y moderna.</p>
            <p><strong>Instructor:</strong> Tec Balam Maria</p>
            <button onClick={() => window.location.href='/curso'}>Ver Curso</button>
            <div className="temario">
              <span>01 <small>Introducción a las EC Diferenciales</small></span>
              <span>02 <small>EC diferenciales ordinarias</small></span>
              <span>03 <small>Métodos para resolucion de ED</small></span>
              <span>04 <small>Factor anulador</small></span>
              <span>05 <small>Transformada de Laplace</small></span>
            </div>
          </div>
        </div>
      </section>

      {/* Paginación */}
      <div className="pagination">
        <a href="#">«</a>
        <a href="#" className="active">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">»</a>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Inicio</h4>
            <ul>
              <li><a href="#">Beneficios</a></li>
              <li><a href="#">Tutorias</a></li>
              <li><a href="#">Testimonios</a></li>
              <li><a href="#">Preguntas frecuentes</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Sobre Nosotros</h4>
            <ul>
              <li><a href="#">Vision</a></li>
              <li><a href="#">Logros</a></li>
              <li><a href="#">Metas</a></li>
            </ul>
          </div>

          <div className="footer-column contact-info">
            <p className="copyright">© TucanClase.</p>
            <p className="email">L21530365@concun.tecnm.mx</p>
            <p className="phone">+52 998 381 4748</p>
            <p className="address">Cancun, Quintana Roo, MX</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Tutorial;