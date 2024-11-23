<?php
include '../config.php';

header("Access-Control-Allow-Origin: http://localhost:3000"); // ระบุ Origin ที่อนุญาต
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // ระบุ Methods ที่อนุญาต
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // ระบุ Headers ที่อนุญาต
header("Content-Type: application/json; charset=UTF-8");

// หากเป็น OPTIONS request ให้ตอบกลับด้วยรหัส 200
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
if (!empty($_GET['id'])) {
    $id = htmlspecialchars(strip_tags($_GET['id']));

    $query = "DELETE FROM categories WHERE id = :id";
    $stmt = $dbcon->prepare($query);
    $stmt->bindParam(":id", $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Category deleted successfully"]);
    } else {
        echo json_encode(["message" => "Failed to delete category"]);
    }
} else {
    echo json_encode(["message" => "Category ID not provided"]);
}
?>
