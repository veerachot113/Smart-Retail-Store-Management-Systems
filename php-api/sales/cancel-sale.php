<?php
include '../config.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    try {
        // เริ่มต้นการทำธุรกรรม
        $dbcon->beginTransaction();

        // ดึงรายการสินค้าใน sale_items
        $query_items = "SELECT product_id, quantity FROM sale_items WHERE sale_id = :sale_id";
        $stmt_items = $dbcon->prepare($query_items);
        $stmt_items->bindParam(':sale_id', $data->id);
        $stmt_items->execute();
        $items = $stmt_items->fetchAll(PDO::FETCH_ASSOC);

        // คืนสต็อกสินค้า
        foreach ($items as $item) {
            $query_stock = "UPDATE stock SET quantity = quantity + :quantity WHERE product_id = :product_id";
            $stmt_stock = $dbcon->prepare($query_stock);
            $stmt_stock->bindParam(':quantity', $item['quantity']);
            $stmt_stock->bindParam(':product_id', $item['product_id']);
            $stmt_stock->execute();
        }

        // ลบรายการ sale_items
        $query_delete_items = "DELETE FROM sale_items WHERE sale_id = :sale_id";
        $stmt_delete_items = $dbcon->prepare($query_delete_items);
        $stmt_delete_items->bindParam(':sale_id', $data->id);
        $stmt_delete_items->execute();

        // ลบรายการ sale
        $query_delete_sale = "DELETE FROM sales WHERE id = :id";
        $stmt_delete_sale = $dbcon->prepare($query_delete_sale);
        $stmt_delete_sale->bindParam(':id', $data->id);
        $stmt_delete_sale->execute();

        // ยืนยันการทำธุรกรรม
        $dbcon->commit();

        echo json_encode(["message" => "Sale canceled successfully"]);
    } catch (Exception $e) {
        $dbcon->rollBack();
        echo json_encode(["message" => "Failed to cancel sale: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "Incomplete input"]);
}
?>
