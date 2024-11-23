<?php
include '../config.php';
header("Access-Control-Allow-Origin: *"); // Allow requests from all origins
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $email = htmlspecialchars(strip_tags($data->email));
    $password = htmlspecialchars(strip_tags($data->password));

    try {
        $query = "SELECT * FROM users WHERE email = :email LIMIT 1";
        $stmt = $dbcon->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $token = bin2hex(random_bytes(16)); // สร้าง token แบบง่าย
            echo json_encode(["message" => "Login successful", "token" => $token]);
        } else {
            http_response_code(401); // Unauthorized
            echo json_encode(["message" => "Invalid email or password"]);
        }
    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(["message" => "Error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Incomplete input"]);
}
?>
