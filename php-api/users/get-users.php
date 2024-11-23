<?php
include '../config.php';
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// ตรวจสอบ OPTIONS Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$query = "SELECT id, username, email, role, created_at FROM users";
$stmt = $dbcon->prepare($query);
$stmt->execute();

$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($users);
?>
