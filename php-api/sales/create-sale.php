<?php
include '../config.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->user_id) &&
    !empty($data->total_price) &&
    !empty($data->paid_amount) &&
    isset($data->change_amount) &&
    !empty($data->items)
) {
    try {
        // เริ่มต้นการทำธุรกรรม
        $dbcon->beginTransaction();

        // เพิ่มการขาย
        $query = "INSERT INTO sales (user_id, total_price, paid_amount, change_amount) VALUES (:user_id, :total_price, :paid_amount, :change_amount)";
        $stmt = $dbcon->prepare($query);
        $stmt->bindParam(':user_id', $data->user_id);
        $stmt->bindParam(':total_price', $data->total_price);
        $stmt->bindParam(':paid_amount', $data->paid_amount);
        $stmt->bindParam(':change_amount', $data->change_amount);
        $stmt->execute();
        $sale_id = $dbcon->lastInsertId();

        // เพิ่มรายการสินค้าใน sale_items
        $query_item = "INSERT INTO sale_items (sale_id, product_id, quantity, price) VALUES (:sale_id, :product_id, :quantity, :price)";
        $stmt_item = $dbcon->prepare($query_item);

        foreach ($data->items as $item) {
            $stmt_item->bindParam(':sale_id', $sale_id);
            $stmt_item->bindParam(':product_id', $item->product_id);
            $stmt_item->bindParam(':quantity', $item->quantity);
            $stmt_item->bindParam(':price', $item->price);
            $stmt_item->execute();

            // ตัดสต็อกสินค้า
            $query_stock = "UPDATE stock SET quantity = quantity - :quantity WHERE product_id = :product_id";
            $stmt_stock = $dbcon->prepare($query_stock);
            $stmt_stock->bindParam(':quantity', $item->quantity);
            $stmt_stock->bindParam(':product_id', $item->product_id);
            $stmt_stock->execute();
        }

        // ยืนยันการทำธุรกรรม
        $dbcon->commit();

        echo json_encode(["message" => "Sale created successfully"]);
    } catch (Exception $e) {
        $dbcon->rollBack();
        echo json_encode(["message" => "Failed to create sale: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "Incomplete input"]);
}
?>
