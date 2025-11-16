<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/Cart_itemsDao.php';

class Cart_itemsService extends BaseService {
    
    public function __construct() {
        $dao = new Cart_itemsDao();
        parent::__construct($dao);
        
    }

    public function getCartByUserId($user_id) {
        return $this->dao->getByUserId($user_id);
    }

    public function addToCart($user_id, $product_id) {
        $existingItem = $this->dao->findItem($user_id, $product_id);

        if ($existingItem) {
            $newQuantity = $existingItem['quantity'] + 1;
            return $this->update($existingItem['id'], ['quantity' => $newQuantity]);

        } else {
            $data = [
                'user_id' => $user_id,
                'product_id' => $product_id,
                'quantity' => 1
            ];
            return $this->create($data);
        }
    }

    public function removeFromCart($cart_item_id) {
        return $this->delete($cart_item_id);

    }

    public function clearCart($user_id) {
        $this->dao->clearCart($user_id);
    }
}
?>