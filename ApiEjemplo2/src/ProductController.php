<?php
// src/UserController.php

require_once '../config/database.php';
require_once 'Product.php';

class ProductController
{
    private $db;
    private $product;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->product = new Product($this->db);
    }

    // Método para manejar la solicitud POST (Crear un producto)
    public function create()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->nombre) && !empty($data->descripcion)) {
            $this->product->nombre = $data->nombre;
            $this->product->descripcion = $data->descripcion;

            if ($this->product->create()) {
                http_response_code(201);
                echo json_encode(["message" => "Producto creado exitosamente."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "No se pudo crear el producto."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Datos incompletos."]);
        }
    }

    // Método para manejar la solicitud GET (Leer productos)
    public function read()
    {
        $stmt = $this->product->read();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $product_arr = [];
            $product_arr["registros"] = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $product_item = [
                    "id" => $row['id'],
                    "nombre" => $row['nombre'],
                    "descripcion" => $row['descripcion'],
                    "precio" => $row['precio'] // <-- agregado
                ];
                array_push($product_arr["registros"], $product_item);
            }

            http_response_code(200);
            echo json_encode($product_arr);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "No se encontraron productos."]);
        }
    }

    // Método para manejar la solicitud PUT (Actualizar producto)
    public function update()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->id) && (!empty($data->nombre) || !empty($data->descripcion) || isset($data->precio))) {
            $this->product->id = $data->id;
            $this->product->nombre = $data->nombre ?? null;
            $this->product->descripcion = $data->descripcion ?? null;
            // asignar precio si viene
            if (isset($data->precio)) {
                $this->product->precio = $data->precio;
            }

            try {
                if ($this->product->update()) {
                    http_response_code(200);
                    echo json_encode(["message" => "Producto actualizado exitosamente."]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "No se pudo actualizar el producto."]);
                }
            } catch (PDOException $e) {
                http_response_code(500);
                // en desarrollo puedes devolver $e->getMessage() para depurar; en producción loguearlo y enviar genérico.
                echo json_encode(["message" => "Error en la base de datos: " . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Datos incompletos o incorrectos."]);
        }
    }


    // Método para manejar la solicitud DELETE (Eliminar producto)
    public function delete()
    {
        // intenta obtener id desde query string (ej. DELETE /index.php?id=3)
        $idFromGet = isset($_GET['id']) ? $_GET['id'] : null;

        // intenta obtener id desde el cuerpo JSON
        $raw = file_get_contents("php://input");
        $data = json_decode($raw);

        $id = null;
        if ($idFromGet !== null) {
            $id = $idFromGet;
        } elseif (is_object($data) && !empty($data->id)) {
            $id = $data->id;
        }

        if ($id === null) {
            http_response_code(400);
            echo json_encode(["message" => "Payload inválido o id faltante."]);
            return;
        }

        // validar entero
        $idInt = filter_var($id, FILTER_VALIDATE_INT);
        if ($idInt === false) {
            http_response_code(400);
            echo json_encode(["message" => "Id inválido."]);
            return;
        }

        $this->product->id = $idInt;

        try {
            if ($this->product->delete()) {
                http_response_code(200);
                echo json_encode(["message" => "Producto eliminado exitosamente."]);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Producto no encontrado o no se pudo eliminar."]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error en la base de datos.", "error" => $e->getMessage()]);
        }
    }
}
