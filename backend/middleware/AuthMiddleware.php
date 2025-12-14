<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware {
    
    public function verifyToken($token){
    // If no token passed, try to get it from headers
    if(!$token) {
        $token = Flight::request()->getHeader("Authorization") ?: Flight::request()->getHeader("Authentication");
    }
    
    if(!$token)
        Flight::halt(401, "Missing authentication header");
    
    // Strip Bearer prefix if present
    if (strpos($token, 'Bearer ') === 0) {
        $token = substr($token, 7);
    }
        
    $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));
    
    Flight::set('user', $decoded_token->user);
    Flight::set('jwt_token', $token);
    return TRUE;
}
    
    public function authorizeRole($requiredRole) {
    $user = Flight::get('user');
    
    
    if (!$user || $user->role !== $requiredRole) {
        Flight::halt(403, 'Access denied: insufficient privileges');
    }
}
    
    public function authorizeRoles($roles) {
        $user = Flight::get('user');
        if (!in_array($user->role, $roles)) {
            Flight::halt(403, 'Forbidden: role not allowed');
        }
    }
    
    function authorizePermission($permission) {
        $user = Flight::get('user');
        if (!in_array($permission, $user->permissions)) {
            Flight::halt(403, 'Access denied: permission missing');
        }
    }    
}
?>