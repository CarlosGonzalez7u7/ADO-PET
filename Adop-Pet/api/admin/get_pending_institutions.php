<?php
// api/admin/get_pending_institutions.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../db_connect.php';

// IMPORTANTE: En una aplicación real, aquí deberías verificar si el usuario
// que hace la petición es un administrador autenticado.

$sql = "SELECT i.*, d.Calle, d.NumExterno, d.NumInterno, d.Colonia, d.Ciudad, d.Estado AS DireccionEstado, d.CP 
        FROM institucion i
        JOIN direccion d ON i.Direccion_idDireccion = d.idDireccion
        WHERE i.Estado = 'pendiente'
        ORDER BY i.FechaCreacion ASC";

$result = $conn->query($sql);

if ($result === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Error en la consulta SQL: ' . $conn->error]);
    exit;
}

$institutions = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $institutions[] = $row;
    }
}

$conn->close();
echo json_encode($institutions);
?>