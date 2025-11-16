<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/UsersDao.php';

class UserService extends BaseService {
    
    public function __construct() {
        $dao = new UsersDao();
        parent::__construct($dao);
    }


    public function register($data) {

        if ($this->dao->emailExists($data['email'])) {
            return ['success' => false, 'error' => 'Email already registred'];
        }
        if (strlen($data['password']) < 8) {
            return ['success' => false, 'error' => 'Pasword must be atleast 8 characters'];
        }

        $data['password'] = md5($data['password']);
        $data['is_admin'] = isset($data['is_admin']) ? $data['is_admin'] : false; 

        $user_id = $this->create($data);
        return ['success' => true, 'data' => $user_id];
    }



    public function getUserByEmail($email) {
        return $this->dao->getByEmail($email);
    }

    
    public function verifyLogin($email, $password) {
        $user = $this->getUserByEmail($email);

        if (!$user) {
            return ['success' => false, 'error' => 'Invalid email or pasword'];
        }

        if (md5($password) !== $user['password']) {
            return ['success' => false, 'error' => 'Invalid email or pasword'];
        }

        unset($user['password']);
        return ['success' => true, 'data' => $user];

    }

}
?>