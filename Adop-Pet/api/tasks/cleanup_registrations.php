<?php

require_once '../db_connect.php';

// --- Función para evitar que se muestre en el navegador si se incluye ---
function run_cleanup() {
    global $conn;

    // Seleccionar registros pendientes con más de 3 días de antigüedad
    $sql = "SELECT idInstitucion, Logo, Direccion_idDireccion 
            FROM institucion 
            WHERE Estado = 'pendiente' AND FechaCreacion < NOW() - INTERVAL 3 DAY";

    $result = $conn->query($sql);

    if ($result === false || $result->num_rows === 0) {
        return; // No hay nada que hacer o hubo un error
    }

    $stmt_inst = $conn->prepare("DELETE FROM institucion WHERE idInstitucion = ?");
    $stmt_dir = $conn->prepare("DELETE FROM direccion WHERE idDireccion = ?");

    while ($row = $result->fetch_assoc()) {
        $idInstitucion = $row['idInstitucion'];
        $logoPath = $row['Logo'];
        $idDireccion = $row['Direccion_idDireccion'];

        $conn->begin_transaction();
        try {
            // Borrar el logo del servidor
            if (!empty($logoPath)) {
                $full_logo_path = '../../' . $logoPath; 
                if (file_exists($full_logo_path)) {
                    unlink($full_logo_path);
                }
            }
            
            // Borrar la institución y la dirección
            $stmt_inst->bind_param("i", $idInstitucion);
            $stmt_inst->execute();
            $stmt_dir->bind_param("i", $idDireccion);
            $stmt_dir->execute();
            $conn->commit();

        } catch (mysqli_sql_exception $exception) {
            $conn->rollback();
            // Opcional: registrar el error en un archivo de logs
        }
    }

    $stmt_inst->close();
    $stmt_dir->close();
}

// --- Ejecución ---
// Si el archivo es llamado directamente, muestra un log.
// Si es incluido, solo ejecuta la función sin mostrar nada.
if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
    header('Content-Type: text/plain');
    echo "Iniciando tarea de limpieza...\n";
    run_cleanup();
    echo "Tarea de limpieza finalizada.\n";
    $conn->close();
} else {
    run_cleanup();
}
?>