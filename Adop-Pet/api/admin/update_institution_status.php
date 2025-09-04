<?php
// api/admin/update_institution_status.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once '../db_connect.php';

// IMPORTANTE: Aquí también deberías tener una validación de sesión de administrador.

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->idInstitucion) || !isset($data->newStatus)) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos requeridos (idInstitucion, newStatus).']);
    exit;
}

$idInstitucion = intval($data->idInstitucion);
$newStatus = $data->newStatus;

// Validar que el nuevo estado sea uno de los permitidos
if ($newStatus !== 'autorizado' && $newStatus !== 'rechazado') {
    http_response_code(400);
    echo json_encode(['error' => 'El estado proporcionado no es válido.']);
    exit;
}

$sql = "UPDATE institucion SET Estado = ? WHERE idInstitucion = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $newStatus, $idInstitucion);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Estado de la institución actualizado con éxito.']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al actualizar el estado: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>