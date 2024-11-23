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

// Query ดึงข้อมูลสินค้ารวมประเภท
$query = "SELECT products.id, products.name, products.price, products.image, categories.name as category_name 
          FROM products 
          JOIN categories ON products.category_id = categories.id";
$stmt = $dbcon->prepare($query);
$stmt->execute();

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

// ส่งข้อมูลสินค้า
echo json_encode($products);
?>


