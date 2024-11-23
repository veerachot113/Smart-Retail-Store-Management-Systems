<?php
include '../config.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

try {
    $query = "SELECT p.name, s.quantity FROM stock s JOIN products p ON s.product_id = p.id";
    $stmt = $dbcon->prepare($query);
    $stmt->execute();
    $stocks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($stocks);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error: " . $e->getMessage()]);
}
?>
