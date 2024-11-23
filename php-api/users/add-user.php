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

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->email) && !empty($data->password) && !empty($data->role)) {
    $username = htmlspecialchars(strip_tags($data->username));
    $email = htmlspecialchars(strip_tags($data->email));
    $password = password_hash($data->password, PASSWORD_DEFAULT);
    $role = htmlspecialchars(strip_tags($data->role));

    $query = "INSERT INTO users (username, email, password, role) VALUES (:username, :email, :password, :role)";
    $stmt = $dbcon->prepare($query);

    $stmt->bindParam(":username", $username);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $password);
    $stmt->bindParam(":role", $role);

    if ($stmt->execute()) {
        echo json_encode(["message" => "User added successfully"]);
    } else {
        echo json_encode(["message" => "Failed to add user"]);
    }
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
?>
