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

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name)) {
    $name = htmlspecialchars(strip_tags($data->name));

    $query = "INSERT INTO categories (name) VALUES (:name)";
    $stmt = $dbcon->prepare($query);
    $stmt->bindParam(":name", $name);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Category added successfully"]);
    } else {
        echo json_encode(["message" => "Failed to add category"]);
    }
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>
