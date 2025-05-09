import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import logo from '../Assets/logo.png'
import nav_dropdown from '../Assets/nav_dropdown.png'
const Navbar = () => {

  const [menu, setMenu] = useState("Inicio")
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="" />
        <p>TucanClase</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={() => { setMenu("Inicio") }}>Incio{menu === "Inicio" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Tutorias") }}>Tutorias{menu === "Tutorias" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Crear") }}>Crear{menu === "Crear" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("Contactar") }}>Contactar{menu === "Contactar" ? <hr /> : <></>}</li>
      </ul>
      <div className="buttons">
        <div className='nav-login-cart'>
          <Link to="/Register">
            <button>Registrarse</button>
          </Link>
        </div>
        <div className='nav-signup-cart'>
          <Link to="/Singup">
            <button>Iniciar Sesion</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;