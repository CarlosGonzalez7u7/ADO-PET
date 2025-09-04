-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-09-2025 a las 13:49:30
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

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD PRIMARY KEY (`idMascota`),
  ADD KEY `idx_mascota_institucion` (`Institucion_idInstitucion`),
  ADD KEY `idx_mascota_cartilla` (`CartillaMascota_idCartillaMascota`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mascota`
--
ALTER TABLE `mascota`
  MODIFY `idMascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mascota`
--
ALTER TABLE `mascota`
  ADD CONSTRAINT `fk_mascota_cartilla` FOREIGN KEY (`CartillaMascota_idCartillaMascota`) REFERENCES `cartillamascota` (`idCartillaMascota`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mascota_institucion` FOREIGN KEY (`Institucion_idInstitucion`) REFERENCES `institucion` (`idInstitucion`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
