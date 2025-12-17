<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/UsersDao.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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

        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        $data['role'] = isset($data['role']) ? $data['role'] : 'user';

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

        if (!password_verify($password, $user['password'])) {   
            return ['success' => false, 'error' => 'Invalid email or pasword'];
        }

        unset($user['password']);
        
        $jwt_payload = [
            'user' => $user,
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24) 
        ];

        $token = JWT::encode(
            $jwt_payload,
            Config::JWT_SECRET(),
            'HS256'
        );

        return ['success' => true, 'data' => array_merge($user, ['token' => $token])];

    }

}
?>