<?php
include '../config.php';

header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if (!empty($_GET['id'])) {
    $id = htmlspecialchars(strip_tags($_GET['id']));

    // ลบไฟล์รูปภาพจากเซิร์ฟเวอร์
    $query = "SELECT image FROM products WHERE id = :id";
    $stmt = $dbcon->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product && !empty($product['image'])) {
        $filePath = __DIR__ . '/../' . $product['image'];
        if (file_exists($filePath)) {
            unlink($filePath); // ลบไฟล์รูปภาพ
        }
    }

    // ลบข้อมูลสินค้า
    $query = "DELETE FROM products WHERE id = :id";
    $stmt = $dbcon->prepare($query);
    $stmt->bindParam(":id", $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Product deleted successfully"]);
    } else {
        echo json_encode(["message" => "Failed to delete product"]);
    }
} else {
    echo json_encode(["message" => "Product ID not provided"]);
}
?>
