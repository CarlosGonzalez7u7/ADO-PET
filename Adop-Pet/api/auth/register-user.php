<?php
// api/auth/register-user.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once '../db_connect.php';

function send_json_response($status_code, $data) {
    http_response_code($status_code);
    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json_response(405, ['error' => 'Método no permitido.']);
}

// Recibir datos del formulario (enviados como FormData)
$data = $_POST;

// 1. Validar campos obligatorios
$required_fields = ['name', 'lastName', 'motherLastName', 'birthdate', 'phone', 'email', 'password'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        send_json_response(400, ['error' => "El campo '$field' es obligatorio."]);
    }
}

// 2. Validar que el correo no esté ya registrado
$email = $data['email'];
$sql_check = "SELECT idUsuario FROM usuario WHERE Correo = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("s", $email);
$stmt_check->execute();
$stmt_check->store_result();

if ($stmt_check->num_rows > 0) {
    $stmt_check->close();
    send_json_response(409, ['error' => 'El correo electrónico ya está registrado.']);
}
$stmt_check->close();

// 3. Procesamiento de la Foto de Perfil (si se subió)
$photo_path_for_db = null;
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    // Define el directorio de subida. Sube dos niveles desde api/auth/
    $upload_dir = '../../upload/user_profiles/';

    // Crea el directorio si no existe
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    // Genera un nombre de archivo único
    $file_extension = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
    $unique_filename = uniqid('profile_', true) . '.' . $file_extension;
    $target_file = $upload_dir . $unique_filename;

    // Mueve el archivo y guarda la ruta para la BD
    if (move_uploaded_file($_FILES['photo']['tmp_name'], $target_file)) {
        $photo_path_for_db = 'uploads/user_profiles/' . $unique_filename;
    } else {
        // Si falla la subida, no es un error fatal, pero podrías querer registrarlo
    }
}

// 4. Hashear la contraseña
$hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);

// 5. Insertar el nuevo usuario en la base de datos
$sql = "INSERT INTO usuario (Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, FotoPerfil, Telefono, Correo, Contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if ($stmt === false) {
    send_json_response(500, ['error' => 'Error al preparar la consulta: ' . $conn->error]);
}

$stmt->bind_param("ssssssss", 
    $data['name'],
    $data['lastName'],
    $data['motherLastName'],
    $data['birthdate'],
    $photo_path_for_db,
    $data['phone'],
    $data['email'],
    $hashed_password
);

if ($stmt->execute()) {
    send_json_response(201, ['success' => true, 'message' => 'Usuario registrado con éxito.']);
} else {
    send_json_response(500, ['error' => 'Error al registrar el usuario: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>