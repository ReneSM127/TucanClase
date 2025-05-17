-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 17-05-2025 a las 06:55:53
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
(1, 2, 1, '2025-05-16 23:46:15', 'Inscrito'),
(2, 4, 2, '2025-05-16 23:46:43', 'Inscrito'),
(3, 6, 2, '2025-05-16 23:46:51', 'Inscrito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT ''
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
  `comentario` text DEFAULT '',
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reviews`
--

INSERT INTO `reviews` (`id`, `inscripcion_id`, `estrellas`, `comentario`, `fecha_creacion`) VALUES
(1, 1, 4, 'Muy buen tutor', '2025-05-16 23:48:35'),
(2, 2, 2, 'No sabe explicar', '2025-05-16 23:49:20'),
(3, 3, 3, 'Habla muy lento', '2025-05-16 23:49:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutorias`
--

CREATE TABLE `tutorias` (
  `id` int(11) NOT NULL,
  `tutor_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text DEFAULT '',
  `duracion` int(11) NOT NULL,
  `max_estudiantes` int(11) NOT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `estado` enum('Programado','En progreso','Completado','Cancelado') DEFAULT 'Programado',
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tutorias`
--

INSERT INTO `tutorias` (`id`, `tutor_id`, `materia_id`, `titulo`, `descripcion`, `duracion`, `max_estudiantes`, `precio`, `estado`, `fecha_creacion`) VALUES
(1, 1, 1, 'Algebra', 'Aprende conmigo', 10, 20, 100.00, 'Programado', '2025-05-16 23:40:05'),
(2, 3, 5, 'Puro Debiam', 'Aprende a las malas', 20, 10, 50.00, 'Programado', '2025-05-16 23:42:14'),
(3, 5, 3, 'C++', 'Co VSCode', 20, 10, 50.00, 'Programado', '2025-05-16 23:43:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rol` enum('Estudiante','Tutor') NOT NULL,
  `descripcion` text DEFAULT '',
  `foto_perfil` varchar(100) DEFAULT 'default.png',
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `email`, `password`, `rol`, `descripcion`, `foto_perfil`, `fecha_creacion`) VALUES
(1, 'rene', 'sadoval moron', 'rene@gmail.com', '$2b$10$CbQB0yCQLftrFrKepQGTyuE4lkTnRWJcat6o49JWTWSr9WkJWADGa', 'Tutor', 'Me gusta Nicki Nicole', 'default.png', '2025-05-16 23:26:21'),
(2, 'isabel', 'tec balam', 'isabel@gmail.com', '$2b$10$7/0fvPTZEx.v/Dvubyn86ufe/jhktBB8p99rGW5hwZAx7sWh5SJmS', 'Estudiante', 'Me gusta el cafe y los gatos', 'default.png', '2025-05-16 23:26:55'),
(3, 'omar', 'lopez ibarez', 'omar@gmail.com', '$2b$10$iouH6SJcEKq4B9MOnB5ikee1uEj9Pvg1Ker9XuoIxAH8DgjPWVnNC', 'Tutor', 'Me gustan las sirenas', 'default.png', '2025-05-16 23:27:19'),
(4, 'carlos', 'caamal', 'caamal@gmail.com', '$2b$10$ad9Bm6ibg5R8C.hYIrHhFOdr9LDM67PCg5DRu3F1sxR9IqYtguIUO', 'Estudiante', 'Me gusta peto', 'default.png', '2025-05-16 23:28:24'),
(5, 'carlos', 'zetina', 'zetina@gmail.com', '$2b$10$cR8YAPXTbQjctGSp8vPNYO0JsFT2lsA4a3e4BpSM5RUPU7mVibU6K', 'Tutor', 'Me gustan las monas chinas', 'default.png', '2025-05-16 23:29:10'),
(6, 'emilio', 'loeza', 'emilio@gmail.com', '$2b$10$.z3TkcCBxnPgP1TeFJMGWeMo5dNkTZn.iJFb38Fgz0EebqyQYOhg2', 'Estudiante', 'Me gustan las bandidas', 'default.png', '2025-05-16 23:29:48');

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
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `inscripcion_id` (`inscripcion_id`);

--
-- Indices de la tabla `tutorias`
--
ALTER TABLE `tutorias`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tutorias`
--
ALTER TABLE `tutorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`tutoria_id`) REFERENCES `tutorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`inscripcion_id`) REFERENCES `inscripciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tutorias`
--
ALTER TABLE `tutorias`
  ADD CONSTRAINT `tutorias_ibfk_1` FOREIGN KEY (`tutor_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tutorias_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
