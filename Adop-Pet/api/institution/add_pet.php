<?php
// api/institution/add_pet.php

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

$data = $_POST;

$required_fields = ['petName', 'species', 'breed', 'age', 'gender', 'size', 'weight', 'esteril', 'description', 'institutionId'];
foreach ($required_fields as $field) {
    if (!isset($data[$field])) {
        send_json_response(400, ['error' => "El campo '$field' es obligatorio."]);
    }
}

$photos_json = '[]';
if (isset($_FILES['photos']) && is_array($_FILES['photos']['name'])) {
    $photo_paths_for_db = [];
    $upload_dir = '../../uploads/pet_photos/';
    if (!is_dir($upload_dir)) mkdir($upload_dir, 0777, true);
    
    foreach ($_FILES['photos']['tmp_name'] as $key => $tmp_name) {
        if ($_FILES['photos']['error'][$key] === UPLOAD_ERR_OK) {
            $file_extension = pathinfo($_FILES['photos']['name'][$key], PATHINFO_EXTENSION);
            $unique_filename = uniqid('pet_', true) . '.' . $file_extension;
            $target_file = $upload_dir . $unique_filename;
            if (move_uploaded_file($tmp_name, $target_file)) {
                $photo_paths_for_db[] = 'uploads/pet_photos/' . $unique_filename;
            }
        }
    }
    $photos_json = json_encode($photo_paths_for_db);
}

$conn->begin_transaction();

try {
    // 1. Insertar en `cartillamascota`
    $sql_cartilla = "INSERT INTO cartillamascota (Peso, Esteril) VALUES (?, ?)";
    $stmt_cartilla = $conn->prepare($sql_cartilla);
    $weight_str = (string)$data['weight']; // El campo Peso en tu BD es VARCHAR
    $esteril_int = (int)$data['esteril'];
    $stmt_cartilla->bind_param("si", $weight_str, $esteril_int);
    $stmt_cartilla->execute();
    $cartilla_id = $conn->insert_id;
    $stmt_cartilla->close();

    // 2. Insertar en `mascota` con los NOMBRES DE COLUMNA CORRECTOS
    $sql_mascota = "INSERT INTO mascota (Raza, NombreMascota, FotoMascota, Sexo, Especie, Edad, Tamanio, Descripcion, Institucion_idInstitucion, CartillaMascota_idCartillaMascota) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt_mascota = $conn->prepare($sql_mascota);
    $stmt_mascota->bind_param("ssssssssii",
        $data['breed'],         // Coincide con `Raza`
        $data['petName'],       // Coincide con `NombreMascota`
        $photos_json,           // Coincide con `FotoMascota`
        $data['gender'],        // Coincide con `Sexo`
        $data['species'],       // Coincide con `Especie`
        $data['age'],           // Coincide con `Edad`
        $data['size'],          // Coincide con `Tamanio`
        $data['description'],   // Coincide con la nueva columna `Descripcion`
        $data['institutionId'], // Coincide con `Institucion_idInstitucion`
        $cartilla_id            // Coincide con `CartillaMascota_idCartillaMascota`
    );
    $stmt_mascota->execute();
    $stmt_mascota->close();

    // 3. Insertar cada vacuna en la tabla `vacuna`
    $vaccines_data = isset($data['vaccines']) ? json_decode($data['vaccines'], true) : [];
    if (is_array($vaccines_data) && !empty($vaccines_data)) {
        $sql_vacuna = "INSERT INTO vacuna (Nombre, FechaAplicacion, Lote, CartillaMascota_idCartillaMascota) VALUES (?, ?, ?, ?)";
        $stmt_vacuna = $conn->prepare($sql_vacuna);
        
        foreach ($vaccines_data as $vaccine) {
            $lote_default = 'N/A'; // Tu columna `Lote` es NOT NULL, necesita un valor.
            $stmt_vacuna->bind_param("sssi", $vaccine['name'], $vaccine['date'], $lote_default, $cartilla_id);
            $stmt_vacuna->execute();
        }
        $stmt_vacuna->close();
    }

    $conn->commit();
    send_json_response(201, ['success' => true, 'message' => 'Mascota registrada exitosamente.']);

} catch (mysqli_sql_exception $exception) {
    $conn->rollback();
    send_json_response(500, ['error' => 'Error en la base de datos: ' . $exception->getMessage()]);
} finally {
    $conn->close();
}
?>