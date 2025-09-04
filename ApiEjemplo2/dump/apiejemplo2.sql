-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-09-2025 a las 01:10:17
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
-- Base de datos: `apiejemplo2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `creado_en`) VALUES
(1, 'Producto 1', 'Descripción del Producto 1', 10.99, '2024-08-24 14:58:00'),
(2, 'Producto 2', 'Descripción del Producto 2', 15.99, '2024-08-24 14:58:00'),
(3, 'Producto 3', 'Descripción del Producto 3', 8.99, '2024-08-24 14:58:00'),
(4, 'Producto 4', 'Descripción del Producto 4', 12.99, '2024-08-24 14:58:00'),
(5, 'Producto 5', 'Descripción del Producto 5', 5.99, '2024-08-24 14:58:00'),
(6, 'Producto 6', 'Descripción del Producto 7', 10.99, '2024-08-24 15:07:40'),
(7, 'Producto 7', 'Descripción del Producto 8', 15.99, '2024-08-24 15:07:40'),
(8, 'Producto 8', 'Descripción del Producto 9', 8.99, '2024-08-24 15:07:40'),
(9, 'Producto 9', 'Descripción del Producto 10', 12.99, '2024-08-24 15:07:40'),
(10, 'Producto 10', 'Descripción del Producto 11', 5.99, '2024-08-24 15:07:40'),
(11, 'Producto 11', 'Descripción del Producto 12', 10.99, '2024-08-24 15:07:40'),
(12, 'Producto 12', 'Descripción del Producto 13', 15.99, '2024-08-24 15:07:40'),
(13, 'Producto 13', 'Descripción del Producto 14', 8.99, '2024-08-24 15:07:40'),
(14, 'Producto 14', 'Descripción del Producto 15', 12.99, '2024-08-24 15:07:40'),
(15, 'Producto 15', 'Descripción del Producto 16', 5.99, '2024-08-24 15:07:40'),
(16, 'Producto 16', 'Descripción del Producto 17', 10.99, '2024-08-24 15:07:40'),
(17, 'Producto 17', 'Descripción del Producto 18', 15.99, '2024-08-24 15:07:40'),
(18, 'Producto 18', 'Descripción del Producto 19', 8.99, '2024-08-24 15:07:40'),
(19, 'Producto 19', 'Descripción del Producto 20', 12.99, '2024-08-24 15:07:40'),
(20, 'Producto 20', 'Descripción del Producto 21', 5.99, '2024-08-24 15:07:40');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
