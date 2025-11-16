<?php
require __DIR__ . '/vendor/autoload.php';

require_once __DIR__ . '/rest/services/BaseService.php';
require_once __DIR__ . '/rest/services/ProductService.php';
require_once __DIR__ . '/rest/services/UserService.php';
require_once __DIR__ . '/rest/services/Cart_itemsService.php';
require_once __DIR__ . '/rest/services/OrderService.php';
require_once __DIR__ . '/rest/services/Contact_messagesService.php';

Flight::register('productService', 'ProductService');
Flight::register('userService', 'UserService');
Flight::register('cartService', 'Cart_itemsService'); 
Flight::register('orderService', 'OrderService');
Flight::register('contactService', 'Contact_messagesService');

require_once __DIR__ . '/rest/routes/ProductRoutes.php';
require_once __DIR__ . '/rest/routes/UserRoutes.php';
require_once __DIR__ . '/rest/routes/CartRoutes.php';
require_once __DIR__ . '/rest/routes/OrderRoutes.php';
require_once __DIR__ . '/rest/routes/ContactRoutes.php';

Flight::start();
?>