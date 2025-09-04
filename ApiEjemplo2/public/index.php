<?php

require_once '../src/ProductController.php';

// permitir CORS y preflight
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // responde al preflight y termina
    http_response_code(200);
    exit;
}


$method = $_SERVER['REQUEST_METHOD'];
$productController = new ProductController();

switch ($method) {
    case 'POST':
        $productController->create();
        break;

    case 'GET':
        $productController->read();
        break;

    case 'PUT':
        $productController->update();
        break;

    case 'DELETE':
        $productController->delete();
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido."]);
        break;
}