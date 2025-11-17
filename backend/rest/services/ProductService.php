<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/ProductsDao.php';

class ProductService extends BaseService {
    
    public function __construct() {
        $dao = new ProductsDao();
        parent::__construct($dao);
    }

    public function filterProducts($category = null, $maxPrice = null) {
        return $this->dao->filterProducts($category, $maxPrice);
    }



    public function createProduct($data) {

        if (empty($data['name'])) {
            return ['success' => false, 'error' => 'Product name is required'];
        }

        if (empty($data['category'])) {
            return ['success' => false, 'error' => 'Category is requred'];
        }

        if (isset($data['price']) && $data['price'] <= 0) {
            return ['success' => false, 'error' => 'Price must be greather than 0'];
        }


        $product_id = $this->create($data);
        return ['success' => true, 'data' => $product_id];

    }



    public function updateProduct($id, $data) {
        
        if (empty($data['name'])) {
            return ['success' => false, 'error' => 'Product name is required'];
        }

        if (empty($data['category'])) {
            return ['success' => false, 'error' => 'Category is required'];
        }

        if (isset($data['price']) && $data['price'] <= 0) {
            return ['success' => false, 'error' => 'Price must be greather than 0'];
        }


        $result = $this->update($id, $data);
        return ['success' => true, 'data' => $result];
    }


}
?>