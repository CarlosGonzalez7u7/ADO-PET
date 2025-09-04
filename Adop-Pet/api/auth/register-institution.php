<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// --- Incluir la conexión a la base de datos ---
require_once '../db_connect.php';

// --- Función para enviar respuestas JSON ---
function send_json_response($status_code, $data) {
    http_response_code($status_code);
    echo json_encode($data);
    exit;
}

// --- Validar que la solicitud sea POST ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json_response(405, ['error' => 'Método no permitido.']);
}

$data = $_POST;

// --- Validación de campos obligatorios ---
$required_fields = [
    'institutionName', 'institutionType', 'registrationNumber', 'contactFirstName', 
    'contactLastName', 'contactPosition', 'phone', 'email', 'street', 
    'exteriorNumber', 'neighborhood', 'city', 'state', 'postalCode', 
    'description', 'password'
];

foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        send_json_response(400, ['error' => "El campo '$field' es obligatorio."]);
    }
}

// --- Validación de formato de email ---
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    send_json_response(400, ['error' => 'El formato del correo electrónico no es válido.']);
}

// --- (después de validar POST y campos) ---
// Verificar si ya existe una institución con el mismo correo
$stmt_check = $conn->prepare("SELECT idInstitucion, Estado, FechaCreacion FROM institucion WHERE CorreoInstitucional = ?");
$stmt_check->bind_param("s", $data['email']);
$stmt_check->execute();
$result_check = $stmt_check->get_result();

if ($result_check && $result_check->num_rows > 0) {
    $row = $result_check->fetch_assoc();
    $estado = $row['Estado'];
    $fechaCreacion = $row['FechaCreacion'];

    if ($estado === 'pendiente') {
        // Ya está pendiente -> devolver 409 + fecha para iniciar contador en el frontend
        send_json_response(409, [
            'error' => 'pendiente',
            'message' => 'Su solicitud ya se encuentra en revisión.',
            'FechaCreacion' => $fechaCreacion
        ]);
    } elseif ($estado === 'autorizado') {
        // Ya autorizado -> no permitir re-registro
        send_json_response(409, [
            'error' => 'autorizado',
            'message' => 'Este correo ya tiene una institución autorizada.'
        ]);
    }
    // Si es 'rechazado' se permite continuar (por ejemplo)
}
$stmt_check->close();


// --- Procesamiento del Logo ---
$logo_path_for_db = null;
if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
    
    // Ruta donde se guardarán los logos. Asegúrate de que esta ruta sea correcta
    // desde la ubicación de este script PHP. '..' significa subir un nivel de directorio.
    $upload_dir = '../uploads/institution_logo/';

    // Crear el directorio si no existe
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    // Generar un nombre de archivo único para evitar sobreescrituras
    $file_extension = pathinfo($_FILES['logo']['name'], PATHINFO_EXTENSION);
    $unique_filename = uniqid('logo_', true) . '.' . $file_extension;
    $target_file = $upload_dir . $unique_filename;

    // Mover el archivo subido al directorio de destino
    if (move_uploaded_file($_FILES['logo']['tmp_name'], $target_file)) {
        // Guardamos la ruta relativa que se almacenará en la base de datos
        $logo_path_for_db = 'uploads/logos/' . $unique_filename;
    } else {
        send_json_response(500, ['error' => 'Hubo un error al subir el logo.']);
    }
}

// --- Lógica para insertar en la Base de Datos (usando Transacciones) ---
// Una transacción asegura que ambas inserciones (dirección e institución) se completen
// exitosamente. Si una falla, la otra se revierte.

$conn->begin_transaction();

try {
    // 1. Insertar en la tabla `direccion`
    $sql_direccion = "INSERT INTO direccion (Calle, NumExterno, NumInterno, Colonia, Ciudad, Estado, CP) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt_direccion = $conn->prepare($sql_direccion);
    
    // El NumInterno puede ser opcional, así que lo manejamos
    $num_interno = !empty($data['interiorNumber']) ? $data['interiorNumber'] : null;
    
    $stmt_direccion->bind_param("sssssss", 
        $data['street'], $data['exteriorNumber'], $num_interno, $data['neighborhood'],
        $data['city'], $data['state'], $data['postalCode']
    );
    
    $stmt_direccion->execute();
    
    // Obtener el ID de la dirección recién insertada
    $direccion_id = $conn->insert_id;
    
    // 2. Hashear la contraseña
    $hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);

    // 3. Insertar en la tabla `institucion`
    $sql_institucion = "INSERT INTO institucion (
        NombreInstitucion, TipoInstitucion, NumeroRegistro, NombreResponsable, 
        ApellidosResponsable, CargoPosicion, TelefonoResponsable, Logo, Descripcion, 
        CorreoInstitucional, ContrasenaInstitucional, Direccion_idDireccion
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt_institucion = $conn->prepare($sql_institucion);
    $stmt_institucion->bind_param("sssssssssssi", 
        $data['institutionName'], $data['institutionType'], $data['registrationNumber'],
        $data['contactFirstName'], $data['contactLastName'], $data['contactPosition'],
        $data['phone'], $logo_path_for_db, $data['description'], $data['email'],
        $hashed_password, $direccion_id
    );
    
    $stmt_institucion->execute();
    
    // Si todo fue exitoso, confirma los cambios en la BD
    $conn->commit();
    
    send_json_response(201, ['success' => true, 'message' => 'Institución registrada con éxito.']);

} catch (mysqli_sql_exception $exception) {
    // Si algo falló, revierte todos los cambios
    $conn->rollback();
    
    // Verificar si el error es por correo duplicado (código de error 1062)
    if ($conn->errno === 1062) {
        send_json_response(409, ['error' => 'El correo electrónico ya está registrado.']);
    } else {
        send_json_response(500, ['error' => 'Error en la base de datos: ' . $exception->getMessage()]);
    }
    
} finally {
    // Cierra las sentencias y la conexión
    if (isset($stmt_direccion)) $stmt_direccion->close();
    if (isset($stmt_institucion)) $stmt_institucion->close();
    $conn->close();
}
?>