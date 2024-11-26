<?php
include '../config.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// ตรวจสอบว่าเป็น OPTIONS Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ตรวจสอบว่า ID ถูกส่งมาหรือไม่
if (!empty($_GET['id'])) {
    $id = htmlspecialchars(strip_tags($_GET['id']));

    // ดึงข้อมูลรูปภาพก่อนลบ
    $query = "SELECT image FROM products WHERE id = :id";
    $stmt = $dbcon->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    // หากพบข้อมูลสินค้า
    if ($product) {
        // ลบรูปภาพในโฟลเดอร์ uploads
        if (!empty($product['image'])) {
            $filePath = __DIR__ . "../uploads/" . basename($product['image']);
            if (file_exists($filePath)) {
                unlink($filePath); // ลบไฟล์
            }
        }

        // ลบข้อมูลสินค้าในฐานข้อมูล
        $query = "DELETE FROM products WHERE id = :id";
        $stmt = $dbcon->prepare($query);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Product deleted successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to delete product"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Product not found"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Product ID not provided"]);
}
?>
