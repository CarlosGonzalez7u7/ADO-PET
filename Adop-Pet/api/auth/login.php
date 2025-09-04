<?php
// api/auth/login.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once '../db_connect.php';

function send_json_response($status_code, $data) {
    http_response_code($status_code);
    echo json_encode($data);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    send_json_response(400, ['error' => 'Correo y contraseña son requeridos.']);
}

$email = $conn->real_escape_string($data->email);
$password = $data->password;

// 1. Buscar en la tabla `institucion`
// Se añade `isAdmin` a la consulta para diferenciar roles
$sql = "SELECT idInstitucion, NombreInstitucion, CorreoInstitucional, ContrasenaInstitucional, Estado, isAdmin FROM institucion WHERE CorreoInstitucional = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $institucion = $result->fetch_assoc();
    
    if (password_verify($password, $institucion['ContrasenaInstitucional'])) {
        if ($institucion['Estado'] === 'autorizado') {
            send_json_response(200, [
                'success' => true,
                'message' => 'Inicio de sesión exitoso.',
                'user' => [
                    'id' => $institucion['idInstitucion'],
                    'nombre' => $institucion['NombreInstitucion'],
                    'email' => $institucion['CorreoInstitucional'],
                    'isAdmin' => (int)$institucion['isAdmin'] // Se añade el dato a la respuesta
                ],
                'userType' => 'institucion'
            ]);
        } elseif ($institucion['Estado'] === 'pendiente') {
            send_json_response(403, ['error' => 'Tu solicitud está pendiente de revisión.']);
        } else { // 'rechazado'
            send_json_response(403, ['error' => 'Tu solicitud de registro fue rechazada.']);
        }
    }
}
$stmt->close();

// 2. Si no es una institución, buscar en la tabla `usuario`
$sql = "SELECT idUsuario, Nombre, Correo, Contrasena FROM usuario WHERE Correo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 1) {
    $usuario = $result->fetch_assoc();
    if (password_verify($password, $usuario['Contrasena'])) {
        send_json_response(200, [
            'success' => true,
            'message' => 'Inicio de sesión exitoso.',
            'user' => [
                'id' => $usuario['idUsuario'],
                'nombre' => $usuario['Nombre'],
                'email' => $usuario['Correo']
            ],
            'userType' => 'usuario'
        ]);
    }
}
$stmt->close();

// Si no se encontró en ninguna tabla o la contraseña no coincidió
send_json_response(401, ['error' => 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.']);
?>