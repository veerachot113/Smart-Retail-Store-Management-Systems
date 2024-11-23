<?php
include '../config.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// รับข้อมูลจาก Request Body
$data = json_decode(file_get_contents("php://input"));

if (!empty($_GET['id']) && !empty($data->name) && !empty($data->price) && !empty($data->category_id)) {
    $id = htmlspecialchars(strip_tags($_GET['id']));
    $name = htmlspecialchars(strip_tags($data->name));
    $price = htmlspecialchars(strip_tags($data->price));
    $category_id = htmlspecialchars(strip_tags($data->category_id));

    // ตรวจสอบว่ามีการอัปโหลดรูปภาพใหม่หรือไม่
    $query = "UPDATE products SET name = :name, price = :price, category_id = :category_id WHERE id = :id";

    $stmt = $dbcon->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':category_id', $category_id);
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Product updated successfully"]);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(["status" => "error", "message" => "Failed to update product"]);
    }
} else {
    http_response_code(400); // Bad Request
    echo json_encode(["status" => "error", "message" => "Incomplete data provided"]);
}
?>
