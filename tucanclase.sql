-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 13-05-2025 a las 02:24:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tucanclase`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `tutoria_id` int(11) NOT NULL,
  `fecha_inscripcion` datetime DEFAULT current_timestamp(),
  `estado` enum('Inscrito','Pendiente','Cancelado') DEFAULT 'Inscrito'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`id`, `estudiante_id`, `tutoria_id`, `fecha_inscripcion`, `estado`) VALUES
(1, 2, 1, '2025-05-12 19:15:54', 'Inscrito'),
(2, 5, 2, '2025-05-12 19:16:11', 'Inscrito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Matematicas', 'Mates basicas'),
(2, 'Calculo integral', 'Integrales dobles y triples'),
(3, 'Programacion', 'Tirar lineas'),
(4, 'Taller de Investigacion', 'Preparate para la tesis'),
(5, 'Redes', 'Conecta 2 switch con SSH');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `inscripcion_id` int(11) NOT NULL,
  `estrellas` tinyint(4) NOT NULL CHECK (`estrellas` between 1 and 5),
  `comentario` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reviews`
--

INSERT INTO `reviews` (`id`, `inscripcion_id`, `estrellas`, `comentario`) VALUES
(1, 1, 4, 'Muy bueno'),
(3, 2, 2, 'Meh');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutorias_materias`
--

CREATE TABLE `tutorias_materias` (
  `id` int(11) NOT NULL,
  `tutor_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `duracion` int(11) NOT NULL,
  `max_estudiantes` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `estado` enum('Programado','En progreso','Completado','Cancelado') DEFAULT 'Programado',
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tutorias_materias`
--

INSERT INTO `tutorias_materias` (`id`, `tutor_id`, `materia_id`, `titulo`, `descripcion`, `duracion`, `max_estudiantes`, `precio`, `estado`, `fecha_creacion`) VALUES
(1, 1, 2, 'Calculo avanzado papa', 'Aprende conmigo', 10, 20, 100.00, 'Programado', '2025-05-12 19:12:25'),
(2, 3, 5, 'Puro debian', 'Aprende a las malas', 20, 3, 144.00, 'Programado', '2025-05-12 19:13:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('Estudiante','Tutor') NOT NULL,
  `descripcion` text DEFAULT NULL,
  `foto_perfil` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `password`, `rol`, `descripcion`, `foto_perfil`, `fecha_creacion`) VALUES
(1, 'rene', 'sandoval', 'rene@gmail.com', '123', 'Tutor', 'me gusta nicki Nicole', '/default', '2025-05-12 19:00:33'),
(2, 'isabel', 'tec', 'isabel@gmail.com', '123', 'Estudiante', 'me gusta el cafe', '/default', '2025-05-12 19:01:31'),
(3, 'omar', 'lopez', 'omar@gmail.com', '123', 'Tutor', 'me gustan las sirenas', '/default', '2025-05-12 19:02:10'),
(4, 'carlos', 'caamal', 'caamal@gmail.com', '123', 'Tutor', 'me gusta peto', '/default', '2025-05-12 19:02:47'),
(5, 'carlos', 'zetina', 'zetina@gmail.com', '123', 'Estudiante', 'me gustan las monas chinas', '/default', '2025-05-12 19:03:32');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `inscripcion_unica` (`estudiante_id`,`tutoria_id`),
  ADD KEY `tutoria_id` (`tutoria_id`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `inscripcion_id` (`inscripcion_id`);

--
-- Indices de la tabla `tutorias_materias`
--
ALTER TABLE `tutorias_materias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tutor_id` (`tutor_id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tutorias_materias`
--
ALTER TABLE `tutorias_materias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`tutoria_id`) REFERENCES `tutorias_materias` (`id`);

--
-- Filtros para la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`inscripcion_id`) REFERENCES `inscripciones` (`id`);

--
-- Filtros para la tabla `tutorias_materias`
--
ALTER TABLE `tutorias_materias`
  ADD CONSTRAINT `tutorias_materias_ibfk_1` FOREIGN KEY (`tutor_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `tutorias_materias_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
