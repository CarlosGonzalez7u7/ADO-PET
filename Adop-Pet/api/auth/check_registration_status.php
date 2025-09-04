<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

if (empty($_GET['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'email_required']);
    exit;
}

$email = $_GET['email'];

$stmt = $conn->prepare("SELECT idInstitucion, Estado, FechaCreacion FROM institucion WHERE CorreoInstitucional = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$res = $stmt->get_result();

if ($res && $res->num_rows > 0) {
    $row = $res->fetch_assoc();
    echo json_encode([
        'exists' => true,
        'Estado' => $row['Estado'],
        'FechaCreacion' => $row['FechaCreacion'],
        'idInstitucion' => $row['idInstitucion']
    ]);
} else {
    echo json_encode(['exists' => false]);
}

$stmt->close();
$conn->close();
