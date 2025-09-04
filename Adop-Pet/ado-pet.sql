-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-09-2025 a las 16:07:41
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
-- Base de datos: `adopet`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `idAdministrador` int(11) NOT NULL,
  `CorreoAdministrador` varchar(150) NOT NULL,
  `PasswordAdministrador` varchar(255) NOT NULL,
  `isAdmin` int(1) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cartillamascota`
--

CREATE TABLE `cartillamascota` (
  `idCartillaMascota` int(11) NOT NULL,
  `Peso` varchar(45) NOT NULL,
  `Esteril` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cartillamascota`
--

INSERT INTO `cartillamascota` (`idCartillaMascota`, `Peso`, `Esteril`) VALUES
(3, '15', 1),
(4, '15', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `idCita` int(11) NOT NULL,
  `FechaCita` date NOT NULL,
  `NumCita` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita_has_usuario`
--

CREATE TABLE `cita_has_usuario` (
  `Cita_idCita` int(11) NOT NULL,
  `Usuario_idAgendaUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `idComentario` int(11) NOT NULL,
  `Comentario` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_has_post`
--

CREATE TABLE `comentario_has_post` (
  `Comentario_idComentario` int(11) NOT NULL,
  `Post_idPost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `idDireccion` int(11) NOT NULL,
  `Calle` varchar(200) NOT NULL,
  `NumInterno` varchar(45) DEFAULT NULL,
  `NumExterno` varchar(45) DEFAULT NULL,
  `Colonia` varchar(100) NOT NULL,
  `Ciudad` varchar(100) NOT NULL,
  `Estado` varchar(100) NOT NULL,
  `CP` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`idDireccion`, `Calle`, `NumInterno`, `NumExterno`, `Colonia`, `Ciudad`, `Estado`, `CP`) VALUES
(4, 'Amapolita', '2', '1', 'Los Gomez', 'Uruapan', 'Michoacán', '60154');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `idEvento` int(11) NOT NULL,
  `TiempoDuracion` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `institucion`
--

CREATE TABLE `institucion` (
  `idInstitucion` int(11) NOT NULL,
  `NombreInstitucion` varchar(150) NOT NULL,
  `TipoInstitucion` varchar(100) DEFAULT NULL,
  `NumeroRegistro` varchar(100) DEFAULT NULL,
  `NombreResponsable` varchar(100) NOT NULL,
  `ApellidosResponsable` varchar(100) NOT NULL,
  `CargoPosicion` varchar(100) DEFAULT NULL,
  `TelefonoResponsable` varchar(20) DEFAULT NULL,
  `Logo` varchar(255) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  `CorreoInstitucional` varchar(150) NOT NULL,
  `ContrasenaInstitucional` varchar(255) NOT NULL,
  `Direccion_idDireccion` int(11) NOT NULL,
  `FechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `Estado` enum('pendiente','autorizado','rechazado') NOT NULL DEFAULT 'pendiente',
  `isAdmin` tinyint(1) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `institucion`
--

INSERT INTO `institucion` (`idInstitucion`, `NombreInstitucion`, `TipoInstitucion`, `NumeroRegistro`, `NombreResponsable`, `ApellidosResponsable`, `CargoPosicion`, `TelefonoResponsable`, `Logo`, `Descripcion`, `CorreoInstitucional`, `ContrasenaInstitucional`, `Direccion_idDireccion`, `FechaCreacion`, `Estado`, `isAdmin`) VALUES
(4, 'Esperanza Animales', 'veterinaria', '1234567', 'Juan Carlos', 'Gonzalez', 'Lider', '+52 4521123947', NULL, 'si si', 'gooj030829@itsuruapan.edu.mx', '$2y$10$wtFeQH5n2PhV61oc9w9eouhS.DMNu5n.P6x1NbuPnkSJI4PNw2AE2', 4, '2025-09-04 08:46:04', 'autorizado', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `institucion_has_cita`
--

CREATE TABLE `institucion_has_cita` (
  `Institucion_idInstitucion` int(11) NOT NULL,
  `Cita_idCita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `institucion_has_evento`
--

CREATE TABLE `institucion_has_evento` (
  `Institucion_idInstitucion` int(11) NOT NULL,
  `Evento_idEvento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascota`
--

CREATE TABLE `mascota` (
  `idMascota` int(11) NOT NULL,
  `Raza` varchar(100) NOT NULL,
  `NombreMascota` varchar(100) NOT NULL,
  `FotoMascota` varchar(255) DEFAULT NULL,
  `Sexo` varchar(20) NOT NULL,
  `Especie` varchar(50) NOT NULL,
  `Edad` varchar(45) DEFAULT NULL,
  `Tamanio` varchar(20) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `Adoptado` tinyint(1) NOT NULL DEFAULT 0,
  `Institucion_idInstitucion` int(11) NOT NULL,
  `CartillaMascota_idCartillaMascota` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascota`
--

INSERT INTO `mascota` (`idMascota`, `Raza`, `NombreMascota`, `FotoMascota`, `Sexo`, `Especie`, `Edad`, `Tamanio`, `Descripcion`, `Adoptado`, `Institucion_idInstitucion`, `CartillaMascota_idCartillaMascota`) VALUES
(1, 'Chihuahua', 'Luneta', '[\"uploads\\/pet_photos\\/pet_68b9778287c4c4.95272975.jpg\"]', 'Hembra', 'Perro', '3 años', 'Mediano', 'adadsad', 0, 4, 3),
(2, 'pug', 'Cheems', '[\"uploads\\/pet_photos\\/pet_68b97b30331ff7.16798792.jpg\"]', 'Macho', 'Perro', '3 años', 'Pequeño', 'No le gusta bañarse', 0, 4, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascota_has_cita`
--

CREATE TABLE `mascota_has_cita` (
  `Mascota_idMascota` int(11) NOT NULL,
  `Cita_idCita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `idPost` int(11) NOT NULL,
  `DescripcionPost` text NOT NULL,
  `FotoPost` varchar(255) DEFAULT NULL,
  `Validacion` tinyint(1) NOT NULL DEFAULT 1,
  `Postcol` varchar(45) DEFAULT NULL,
  `FechaPost` date NOT NULL,
  `Likes` int(11) NOT NULL DEFAULT 0,
  `Dislikes` int(11) NOT NULL DEFAULT 0,
  `Usuario_idAgendaUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `idReporte` int(11) NOT NULL,
  `FechaReporte` date NOT NULL,
  `Latitud` varchar(45) NOT NULL,
  `Altitud` varchar(45) NOT NULL,
  `EspecieReporte` varchar(45) NOT NULL,
  `SizeReporte` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte_has_usuario`
--

CREATE TABLE `reporte_has_usuario` (
  `Reporte_idReporte` int(11) NOT NULL,
  `Usuario_idAgendaUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `ApellidoPaterno` varchar(100) NOT NULL,
  `ApellidoMaterno` varchar(100) NOT NULL,
  `FechaNacimiento` date NOT NULL,
  `FotoPerfil` varchar(255) DEFAULT NULL,
  `Telefono` varchar(20) NOT NULL,
  `Amonestacion` int(11) NOT NULL DEFAULT 0,
  `Correo` varchar(150) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `IsAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `Nombre`, `ApellidoPaterno`, `ApellidoMaterno`, `FechaNacimiento`, `FotoPerfil`, `Telefono`, `Amonestacion`, `Correo`, `Contrasena`, `IsAdmin`) VALUES
(1, 'Carlos', 'Rodríguez', 'Orozco', '2025-09-04', 'uploads/user_profiles/profile_68b9690b4eb5d7.12453868.jpg', '+52 4521123947', 0, 'juanchitooelmejor@gmail.com', '$2y$10$vMhpzAHHUu86guiwlJgLtusKWhyTPK3EuO2xTu3XjCLC4dZQbN3Um', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacuna`
--

CREATE TABLE `vacuna` (
  `idVacuna` int(11) NOT NULL,
  `FechaAplicacion` date NOT NULL,
  `Lote` varchar(45) NOT NULL,
  `Nombre` varchar(150) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `CartillaMascota_idCartillaMascota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vacuna`
--

INSERT INTO `vacuna` (`idVacuna`, `FechaAplicacion`, `Lote`, `Nombre`, `Descripcion`, `CartillaMascota_idCartillaMascota`) VALUES
(1, '2025-09-04', 'N/A', 'rabia', NULL, 3),
(2, '2025-09-04', 'N/A', 'Covit', NULL, 4),
(3, '2025-09-04', 'N/A', 'Rabia', NULL, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`idAdministrador`);

--
-- Indices de la tabla `cartillamascota`
--
ALTER TABLE `cartillamascota`
  ADD PRIMARY KEY (`idCartillaMascota`);

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`idCita`);

--
-- Indices de la tabla `cita_has_usuario`
--
ALTER TABLE `cita_has_usuario`
  ADD PRIMARY KEY (`Cita_idCita`,`Usuario_idAgendaUsuario`),
  ADD KEY `idx_cita_usuario_usuario` (`Usuario_idAgendaUsuario`),
  ADD KEY `idx_cita_usuario_cita` (`Cita_idCita`);

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`idComentario`);

--
-- Indices de la tabla `comentario_has_post`
--
ALTER TABLE `comentario_has_post`
  ADD PRIMARY KEY (`Comentario_idComentario`,`Post_idPost`),
  ADD KEY `idx_comentpost_post` (`Post_idPost`),
  ADD KEY `idx_comentpost_coment` (`Comentario_idComentario`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`idDireccion`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`idEvento`);

--
-- Indices de la tabla `institucion`
--
ALTER TABLE `institucion`
  ADD PRIMARY KEY (`idInstitucion`),
  ADD KEY `idx_institucion_direccion` (`Direccion_idDireccion`);

--
-- Indices de la tabla `institucion_has_cita`
--
ALTER TABLE `institucion_has_cita`
  ADD PRIMARY KEY (`Institucion_idInstitucion`,`Cita_idCita`),
  ADD KEY `idx_inst_cita_cita` (`Cita_idCita`),
  ADD KEY `idx_inst_cita_inst` (`Institucion_idInstitucion`);

--
-- Indices de la tabla `institucion_has_evento`
--
ALTER TABLE `institucion_has_evento`
  ADD PRIMARY KEY (`Institucion_idInstitucion`,`Evento_idEvento`),
  ADD KEY `idx_inst_evento_evento` (`Evento_idEvento`),
  ADD KEY `idx_inst_evento_inst` (`Institucion_idInstitucion`);

--
-- Indices de la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD PRIMARY KEY (`idMascota`),
  ADD KEY `idx_mascota_institucion` (`Institucion_idInstitucion`),
  ADD KEY `idx_mascota_cartilla` (`CartillaMascota_idCartillaMascota`);

--
-- Indices de la tabla `mascota_has_cita`
--
ALTER TABLE `mascota_has_cita`
  ADD PRIMARY KEY (`Mascota_idMascota`,`Cita_idCita`),
  ADD KEY `idx_mascotacita_cita` (`Cita_idCita`),
  ADD KEY `idx_mascotacita_mascota` (`Mascota_idMascota`);

--
-- Indices de la tabla `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`idPost`),
  ADD KEY `idx_post_usuario` (`Usuario_idAgendaUsuario`);

--
-- Indices de la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`idReporte`);

--
-- Indices de la tabla `reporte_has_usuario`
--
ALTER TABLE `reporte_has_usuario`
  ADD PRIMARY KEY (`Reporte_idReporte`,`Usuario_idAgendaUsuario`),
  ADD KEY `idx_rep_usuario_usuario` (`Usuario_idAgendaUsuario`),
  ADD KEY `idx_rep_usuario_rep` (`Reporte_idReporte`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `uq_usuario_correo` (`Correo`);

--
-- Indices de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD PRIMARY KEY (`idVacuna`),
  ADD KEY `fk_vacuna_cartilla` (`CartillaMascota_idCartillaMascota`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `idAdministrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cartillamascota`
--
ALTER TABLE `cartillamascota`
  MODIFY `idCartillaMascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `idCita` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `idComentario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `idDireccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `idEvento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `institucion`
--
ALTER TABLE `institucion`
  MODIFY `idInstitucion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `mascota`
--
ALTER TABLE `mascota`
  MODIFY `idMascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `idPost` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `idReporte` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `vacuna`
--
ALTER TABLE `vacuna`
  MODIFY `idVacuna` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita_has_usuario`
--
ALTER TABLE `cita_has_usuario`
  ADD CONSTRAINT `fk_citahas_cita` FOREIGN KEY (`Cita_idCita`) REFERENCES `cita` (`idCita`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_citahas_usuario` FOREIGN KEY (`Usuario_idAgendaUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `comentario_has_post`
--
ALTER TABLE `comentario_has_post`
  ADD CONSTRAINT `fk_comentpost_comentario` FOREIGN KEY (`Comentario_idComentario`) REFERENCES `comentario` (`idComentario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comentpost_post` FOREIGN KEY (`Post_idPost`) REFERENCES `post` (`idPost`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `institucion`
--
ALTER TABLE `institucion`
  ADD CONSTRAINT `fk_institucion_direccion` FOREIGN KEY (`Direccion_idDireccion`) REFERENCES `direccion` (`idDireccion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `institucion_has_cita`
--
ALTER TABLE `institucion_has_cita`
  ADD CONSTRAINT `fk_inst_cita_cita` FOREIGN KEY (`Cita_idCita`) REFERENCES `cita` (`idCita`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_inst_cita_institucion` FOREIGN KEY (`Institucion_idInstitucion`) REFERENCES `institucion` (`idInstitucion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `institucion_has_evento`
--
ALTER TABLE `institucion_has_evento`
  ADD CONSTRAINT `fk_inst_evento_evento` FOREIGN KEY (`Evento_idEvento`) REFERENCES `evento` (`idEvento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_inst_evento_institucion` FOREIGN KEY (`Institucion_idInstitucion`) REFERENCES `institucion` (`idInstitucion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD CONSTRAINT `fk_mascota_cartilla` FOREIGN KEY (`CartillaMascota_idCartillaMascota`) REFERENCES `cartillamascota` (`idCartillaMascota`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mascota_institucion` FOREIGN KEY (`Institucion_idInstitucion`) REFERENCES `institucion` (`idInstitucion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mascota_has_cita`
--
ALTER TABLE `mascota_has_cita`
  ADD CONSTRAINT `fk_mascotacita_cita` FOREIGN KEY (`Cita_idCita`) REFERENCES `cita` (`idCita`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mascotacita_mascota` FOREIGN KEY (`Mascota_idMascota`) REFERENCES `mascota` (`idMascota`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_post_usuario` FOREIGN KEY (`Usuario_idAgendaUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `reporte_has_usuario`
--
ALTER TABLE `reporte_has_usuario`
  ADD CONSTRAINT `fk_rep_usuario_reporte` FOREIGN KEY (`Reporte_idReporte`) REFERENCES `reporte` (`idReporte`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_rep_usuario_usuario` FOREIGN KEY (`Usuario_idAgendaUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vacuna`
--
ALTER TABLE `vacuna`
  ADD CONSTRAINT `fk_vacuna_cartilla` FOREIGN KEY (`CartillaMascota_idCartillaMascota`) REFERENCES `cartillamascota` (`idCartillaMascota`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
