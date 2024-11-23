<?php
include '../config.php';

// ตั้งค่า CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// ตรวจสอบ OPTIONS Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ตรวจสอบว่ามีไฟล์อัพโหลดหรือไม่
if (!empty($_POST['name']) && !empty($_POST['price']) && !empty($_POST['category_id'])) {
    $name = htmlspecialchars(strip_tags($_POST['name']));
    $price = htmlspecialchars(strip_tags($_POST['price']));
    $category_id = htmlspecialchars(strip_tags($_POST['category_id']));
    $image_path = null;

    // จัดการอัพโหลดรูปภาพ
    if (!empty($_FILES['image']['name'])) {
        $target_dir = "../uploads/"; // โฟลเดอร์เก็บรูปภาพ
        $target_file = $target_dir . basename($_FILES['image']['name']);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // ตรวจสอบไฟล์ว่าเป็นรูปภาพหรือไม่
        $check = getimagesize($_FILES['image']['tmp_name']);
        if ($check !== false) {
            if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
                $image_path = "/uploads/" . basename($_FILES['image']['name']); // เก็บ path รูปภาพ
            } else {
                echo json_encode(["message" => "Failed to upload image."]);
                exit();
            }
        } else {
            echo json_encode(["message" => "File is not an image."]);
            exit();
        }
    }

    // เพิ่มข้อมูลสินค้าในฐานข้อมูล
    $query = "INSERT INTO products (name, price, category_id, image) VALUES (:name, :price, :category_id, :image)";
    $stmt = $dbcon->prepare($query);

    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":price", $price);
    $stmt->bindParam(":category_id", $category_id);
    $stmt->bindParam(":image", $image_path);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Product added successfully"]);
    } else {
        echo json_encode(["message" => "Failed to add product"]);
    }
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>
