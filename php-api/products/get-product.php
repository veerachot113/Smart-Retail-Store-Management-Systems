<?php
include '../config.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// ตรวจสอบว่าเป็น OPTIONS Request
if (!empty($_GET['id'])) {
    $id = htmlspecialchars(strip_tags($_GET['id']));

    $query = "SELECT id, name, price, category_id, image FROM products WHERE id = :id";
    $stmt = $dbcon->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();

    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode($product);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Product not found"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Product ID not provided"]);
}
?>