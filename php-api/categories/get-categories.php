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

$query = "SELECT id, name FROM categories";
$stmt = $dbcon->prepare($query);
$stmt->execute();

$categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($categories) {
    echo json_encode($categories);
} else {
    echo json_encode([]); // คืนค่า array ว่าง ถ้าไม่มีหมวดหมู่
}
?>

