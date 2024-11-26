<?php
include '../config.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$id = htmlspecialchars(strip_tags($_POST['id']));
$name = htmlspecialchars(strip_tags($_POST['name']));
$price = htmlspecialchars(strip_tags($_POST['price']));
$category_id = htmlspecialchars(strip_tags($_POST['category_id']));

$query = "SELECT image FROM products WHERE id = :id";
$stmt = $dbcon->prepare($query);
$stmt->bindParam(":id", $id);
$stmt->execute();
$currentProduct = $stmt->fetch(PDO::FETCH_ASSOC);

$imageName = $currentProduct['image'];
if (!empty($_FILES['image']['name'])) {
    $uploadDir = "../uploads/";
    $imageName = basename($_FILES['image']['name']);
    $imagePath = $uploadDir . $imageName;

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
        echo json_encode(["status" => "error", "message" => "Failed to upload image"]);
        exit();
    }
}

$query = "UPDATE products SET name = :name, price = :price, category_id = :category_id, image = :image WHERE id = :id";
$stmt = $dbcon->prepare($query);
$stmt->bindParam(':name', $name);
$stmt->bindParam(':price', $price);
$stmt->bindParam(':category_id', $category_id);
$stmt->bindParam(':image', $imageName);
$stmt->bindParam(':id', $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Product updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update product"]);
}
?>
