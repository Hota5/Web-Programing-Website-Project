<?php
require_once __DIR__ . '/BaseDao.php';

class Cart_itemsDao extends BaseDao {
    public function __construct() {
        parent::__construct("cart_items");
    }

  
    public function getByUserId($user_id) {
        $stmt = $this->connection->prepare(
            "SELECT c.*, p.name, p.price, p.img_url, (c.quantity * p.price) as item_total
            FROM" . $this->table . " c
            JOIN products p 
            ON c.product_id = p.id   
            WHERE c.user_id = :user_id"
        );
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }

   
    public function findItem($user_id, $product_id) {
        $stmt = $this->connection->prepare("SELECT * FROM " . $this->table . " WHERE user_id = :user_id AND product_id = :product_id");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':product_id', $product_id);
        $stmt->execute();
        return $stmt->fetch();
    }

  
    public function clearCart($user_id) {
        $stmt = $this->connection->prepare("DELETE FROM " . $this->table . " WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
    }

    
}
?>