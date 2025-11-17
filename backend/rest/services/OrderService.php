<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/OrdersDao.php';
require_once __DIR__ . '/../dao/Order_itemsDao.php';
require_once __DIR__ . '/../dao/Shipping_infosDao.php';
require_once __DIR__ . '/../dao/Cart_itemsDao.php';

class OrderService extends BaseService {
    
    private $orderItemsDao;
    private $shippingInfoDao;
    private $cartDao;

    public function __construct() {
        $dao = new OrdersDao();
        parent::__construct($dao);
        
        $this->orderItemsDao = new Order_itemsDao();
        $this->shippingInfoDao = new Shipping_infosDao();
        $this->cartDao = new Cart_itemsDao();
    }

    public function getUserOrders($user_id) {
        return $this->dao->getByUserId($user_id);
    }

    

    public function createOrder($user_id, $shippingData) {
        
        $cartItems = $this->cartDao->getByUserId($user_id);

        if (empty($cartItems)) {
            return ['success' => false, 'error' => 'Cart is emtpy'];  // ← Changed to return array
        }

        $totalPrice = 0;
        foreach ($cartItems as $item) {
            $totalPrice += $item['item_total']; 
        }

        $orderData = [
            'user_id' => $user_id,
            'total_price' => $totalPrice,
            'order_status' => 'pending',
            'payment_status' => 'pending'
        ];

        $orderId = $this->dao->insert($orderData);  

        foreach ($cartItems as $cartItem) {
            $orderItemData = [
                'order_id' => $orderId,
                'product_id' => $cartItem['product_id'],
                'quantity' => $cartItem['quantity'],
                'price' => $cartItem['price']
            ];

            $this->orderItemsDao->insert($orderItemData);
        }

        unset($shippingData['user_id']);
        $shippingData['order_id'] = $orderId;
        $this->shippingInfoDao->insert($shippingData);
        
        $this->cartDao->clearCart($user_id);

        return ['success' => true, 'message' => 'Order created successfuly'];  // ← Added 'success' key!
    }


    
}
?>