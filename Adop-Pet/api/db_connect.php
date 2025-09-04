<?php
// api/db_connect.php

// --- Configuración de la Base de Datos ---
define('DB_HOST', 'localhost');      
define('DB_USER', 'root');           
define('DB_PASS', '');               
define('DB_NAME', 'adopet');        

// --- Crear la Conexión ---
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {

    die("Conexión fallida: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");

?>