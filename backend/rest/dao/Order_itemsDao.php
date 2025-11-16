<?php
require_once __DIR__ . '/BaseDao.php';

class Order_itemsDao extends BaseDao {

    public function __construct() {
        parent::__construct("order_items");
    }

    public function getByOrderId($order_id) {
        $stmt = $this->connection->prepare("SELECT * FROM " . $this->table . " WHERE order_id = :order_id");
        $stmt->bindParam(':order_id', $order_id);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }

}
?>