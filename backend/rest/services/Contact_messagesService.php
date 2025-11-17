<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/Contact_messagesDao.php';

class Contact_messagesService extends BaseService {
    
    public function __construct() {
        $dao = new Contact_messagesDao();
        parent::__construct($dao);
    }
    

    public function submitMessage($data) {
        
        if (empty($data['name'])) {
            return ['success' => false, 'error' => 'Name is requried '];
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'error' => 'Invalid email format'];
        }

        if (empty($data['message'])) {
            return ['success' => false, 'error' => 'Message is required'];
        }


        $message_id = $this->create($data);
        return ['success' => true, 'data' => $message_id];

    }

    public function getLastMessage() {
        return $this->dao->getLast();
    }

}
?>