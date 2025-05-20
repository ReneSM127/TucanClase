import React from 'react';
import './TutoriasHome.css';
import { Link } from 'react-router-dom';
import EcuacionesDif from '../Assets/EcuacionesDiferenciales.jpeg';

const tutorias = [
  {
    titulo: 'Matemáticas',
    descripcion: 'Domina los matemáticas fundamentales, fracciones, porcentajes y resolución de problemas prácticos.',
    duracion: '4 Semanas',
    nivel: 'Principiante',
    tutor: 'John Smith',
    imagen: EcuacionesDif,
  },
  {
    titulo: 'Comprensión Lectora y Gramática',
    descripcion: 'Mejora tu habilidad para comprender textos, redactar correctamente y aplicar reglas gramaticales con ejercicios interactivos.',
    duracion: '6 Semanas',
    nivel: 'Intermedio',
    tutor: 'Emily Johnson',
    imagen: '/images/comprension.jpg',
  },
  {
    titulo: 'Ciencias Naturales',
    descripcion: 'Explora conceptos clave en biología, química y física con ejemplos prácticos y experimentos virtuales.',
    duracion: '8 Semanas',
    nivel: 'Principiante',
    tutor: 'David Brown',
    imagen: '/images/ciencias.jpg',
  },
  {
    titulo: 'Inglés básico',
    descripcion: 'Aprende vocabulario, gramática y habilidades de conversación para comunicarte en inglés con confianza.',
    duracion: '10 Semanas',
    nivel: 'Principiante',
    tutor: 'Sarah Thompson',
    imagen: '/images/ingles.jpg',
  },
  {
    titulo: 'Razonamiento Lógico y Pensamiento Crítico',
    descripcion: 'Desarrolla tu capacidad de analizar problemas, tomar decisiones acertadas y resolver ejercicios de lógica de manera eficiente.',
    duracion: '10 Semanas',
    nivel: 'Intermedio',
    tutor: 'Michael Adams',
    imagen: '/images/logica.jpg',
  },
  {
    titulo: 'Computación y Habilidades Digitales',
    descripcion: 'Familiarízate con el uso de las computadoras, internet y herramientas digitales esenciales para el aprendizaje.',
    duracion: '6 Semanas',
    nivel: 'Avanzado',
    tutor: 'Jennifer Wilson',
    imagen: '/images/computacion.jpg',
  },
];

export default function Tutorias() {
  return (
    <div className="tutorias-container">
      <div className="tutorias-header">
        <div className="tutorias-header-content">
          <h2>Tutorías</h2>
          <p>Refuerza tus conocimientos en las materias esenciales con tutorías personalizadas. Aprende a tu propio ritmo con el apoyo de tutores expertos.</p>
        </div>
        <button className="ver-todo">Ver todo</button>
      </div>
      <div className="tutorias-grid">
        {tutorias.map((tutoria, index) => (
          <div className="card" key={index}>
            <img src={tutoria.imagen} alt={tutoria.titulo} />
            <div className="card-content">
              <div className="card-info">
                <span>{tutoria.duracion}</span>
                <span>{tutoria.nivel}</span>
              </div>
              <h3>{tutoria.titulo}</h3>
              <p>{tutoria.descripcion}</p>
              <div className="tutor">{tutoria.tutor}</div>
              <button className="comenzar-btn">Comenzar ahora</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}