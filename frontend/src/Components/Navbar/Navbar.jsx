import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navbar.css'
import logo from '../Assets/logo.png'
import nav_dropdown from '../Assets/nav_dropdown.png'
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const [menu, setMenu] = useState("Inicio");
  const menuRef = useRef();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Menú base para usuarios no autenticados o estudiantes
  const baseMenuItems = [
    { name: "Inicio", path: "/" },
    { name: "Tutorias", path: "/Tutorial" },
    { name: "Tutores", path: "/Tutores" },
  ];

  // Menú para tutores
  const tutorMenuItems = [
    { name: "Crear", path: "/Crear" }, // Nueva ruta para tutores
  ];

  // Decide qué menú mostrar según el rol
  const menuItems = user?.rol === "Tutor" ? tutorMenuItems : baseMenuItems;

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  const handleLogin = () => {
    navigate('/Login');
    setMenu(null);
  }

  const handleRegister = () => {
    navigate('/Register');
    setMenu(null);
  }

  const handleLogout = () => {
    logout();
    navigate('/Login');
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="" />
        <p>TucanClase</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className='nav-menu'>
        {menuItems.map((item) => (
          <li key={item.name} onClick={() => setMenu(item.name)}>
            <Link to={item.path}>{item.name}</Link>
            {menu === item.name && <hr />}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {user ? (
          <div>
            <span><a href="/Dashboard">👤 {user.email}</a></span>
            <button className='nav-user' onClick={handleLogout}>Cerrar sesión</button>
          </div>
        ) : (
          <>
            <div className='nav-login-cart'>
              <button onClick={handleRegister}>Registrarse</button>
            </div>
            <div className='nav-signup-cart'>
              <button onClick={handleLogin}>Iniciar Sesión</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar;