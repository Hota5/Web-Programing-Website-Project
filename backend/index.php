<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authentication, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'vendor/autoload.php';

require_once __DIR__ . '/rest/services/BaseService.php';
require_once __DIR__ . '/rest/services/ProductService.php';
require_once __DIR__ . '/rest/services/UserService.php';
require_once __DIR__ . '/rest/services/Cart_itemsService.php';
require_once __DIR__ . '/rest/services/OrderService.php';
require_once __DIR__ . '/rest/services/Contact_messagesService.php';
require_once __DIR__ . '/middleware/AuthMiddleware.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

Flight::set('flight.base_url', '/ArminHota/Web-Programing-Website-Project/backend');

Flight::register('productService', 'ProductService');
Flight::register('userService', 'UserService');
Flight::register('cartService', 'Cart_itemsService'); 
Flight::register('orderService', 'OrderService');
Flight::register('contactService', 'Contact_messagesService');
Flight::register('auth_middleware', 'AuthMiddleware');

Flight::route('/*', function() {
    if(
        strpos(Flight::request()->url, '/login') === 0 ||
        strpos(Flight::request()->url, '/register') === 0 ||
        strpos(Flight::request()->url, '/contact') === 0 ||
        (strpos(Flight::request()->url, '/products') === 0 && Flight::request()->method === 'GET')
    ) {
        return TRUE;
    } else {
        try {
            $token = Flight::request()->getHeader("Authentication");
            if(Flight::auth_middleware()->verifyToken($token))
                return TRUE;
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
});

require_once __DIR__ . '/rest/routes/ProductRoutes.php';
require_once __DIR__ . '/rest/routes/UserRoutes.php';
require_once __DIR__ . '/rest/routes/CartRoutes.php';
require_once __DIR__ . '/rest/routes/OrderRoutes.php';
require_once __DIR__ . '/rest/routes/ContactRoutes.php';

Flight::start();
?>