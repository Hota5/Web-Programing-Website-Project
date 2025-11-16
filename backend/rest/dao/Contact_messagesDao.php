<?php
require_once __DIR__ . '/BaseDao.php';

class Contact_messagesDao extends BaseDao {
    
    public function __construct() {
        parent::__construct("contact_messages");
    }

    public function getLast() {
        $stmt = $this->connection->prepare(
            "SELECT * FROM " . $this->table . " 
             ORDER BY created_at DESC 
             LIMIT 1"
        );
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }


}
?>