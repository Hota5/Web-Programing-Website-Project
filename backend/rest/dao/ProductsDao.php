<?php
require_once __DIR__ . '/BaseDao.php';

class ProductsDao extends BaseDao {
    
    public function __construct() {
        parent::__construct("products");
    }


    public function filterProducts($category = null, $maxPrice = null) {
        $sql = "SELECT * FROM " . $this->table . " WHERE 1=1";
        $params = [];
        
        if (! empty($category)) {
            $sql .= " AND category = :category";
            $params[':category'] = $category;
        }
        
        if (! empty($maxPrice)) {
            $sql .= " AND price <= :maxPrice ORDER BY price ASC";
            $params[':maxPrice'] = $maxPrice;
        }
        
        
        $stmt = $this->connection->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll();
    }
}
?>