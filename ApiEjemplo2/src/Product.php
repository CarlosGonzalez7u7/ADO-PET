<?php

class Product {
    private $conn;
    private $table_name = "productos";

    public $id;
    public $nombre;
    public $descripcion;
    public $precio;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Crear un nuevo producto
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET nombre=:nombre, descripcion=:descripcion";
        $stmt = $this->conn->prepare($query);

        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));

        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":descripcion", $this->descripcion);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Obtener un nuevo producto
public function read() {
    $query = "SELECT id, nombre, descripcion, precio FROM " . $this->table_name;
    $stmt = $this->conn->prepare($query);
    $stmt->execute();

    return $stmt;
}


    // Actualizar un producto existente
public function update() {
    $query = "UPDATE " . $this->table_name . " 
              SET nombre = :nombre, descripcion = :descripcion, precio = :precio 
              WHERE id = :id";
    $stmt = $this->conn->prepare($query);

    // sanitize (si alguno puede ser null, conviértelo a cadena vacía o mantén null según tu lógica)
    $this->nombre = htmlspecialchars(strip_tags($this->nombre ?? ''));
    $this->descripcion = htmlspecialchars(strip_tags($this->descripcion ?? ''));
    $this->precio = isset($this->precio) ? htmlspecialchars(strip_tags($this->precio)) : 0;
    $this->id = htmlspecialchars(strip_tags($this->id));

    $stmt->bindParam(":nombre", $this->nombre);
    $stmt->bindParam(":descripcion", $this->descripcion);
    $stmt->bindParam(":precio", $this->precio);
    $stmt->bindParam(":id", $this->id);

    if ($stmt->execute()) {
        return true;
    }
    return false;
}
    // Eliminar un producto
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}