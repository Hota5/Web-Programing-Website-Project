<?php
require_once __DIR__ . '/dao/UsersDao.php';
require_once __DIR__ . '/dao/ProductsDao.php';
require_once __DIR__ . '/dao/Cart_itemsDao.php';
// Set proper headers for browser output
echo "<pre>";
    $user_dao = new UsersDao();
    $product_dao = new ProductsDao();
    $cart_item_dao = new Cart_itemsDao();
    
    echo "\n   USERS\n";

    $user_dao->insert([
        "first_name" => "John",
        "last_name" => "Pork", 
        "email" => "test@gmail.com",
        "password" => "password123",
        "is_admin" => 0
    ]);

    echo "\n\nGetAll:\n";
    $users = $user_dao->getAll();
    print_r($users);
    
    
    echo "\n\nGetById:\n";
    $userId = $users[0]['id'];
    $user = $user_dao->getById($userId);
    print_r($user);
    
    
    echo "\n\nGetByEmail:\n";
    $user_by_email = $user_dao->getByEmail("test@gmail.com");
    print_r($user_by_email);
    
    
    echo "\n\nEmailExists:\n";
    $exists = $user_dao->emailExists("test@gmail.com");
    
    if ($exists) {
        echo "Exists\n";
    } else {
        echo "Doesn't exist\n";
    }

    echo "\n\nUpdate:\n";
    echo "Old Name: " . $users[0]['first_name'] ;
    $user_dao->update($userId, ["first_name" => "Fernando the 15th"]);
    $users = $user_dao->getAll();
    print_r("\nNew Name: " . $users[0]['first_name'] . " \n") ;




    echo "\n\n\n\n    PRODUCTS\n";

    $product_dao->insert([
        "name" => "Laptop",
        "description" => "Super duper great",
        "price" => 9999.99,
        "category" => "Laptops",
        "img_url" => "laptop.jpg"
    ]);
    
  
    echo "\n\nGetAll:\n";
    $products = $product_dao->getAll();
    print_r($products);
    
  
    
    echo "\n\nGetById:\n";
    $productId = $products[0]['id'];
    $product = $product_dao->getById($productId);
    print_r($products);

    
    echo "\n\nFilterProducts  no filters:\n";
    $all = $product_dao->filterProducts();
    print_r($all);
    
    
    echo "\n\nCategory filter:\n";
    $laptops = $product_dao->filterProducts('Laptops') ;
    print_r($laptops);
    
    echo "\n\nMax filter:\n";
    $price = $product_dao->filterProducts(null, 1000000);
    print_r($price);
    
    echo "\n\nBoth filters:\n";
    $both = $product_dao->filterProducts('Laptops', 100000);
    print_r($both);
    
    
    echo "\n\nUpdate:\n";
    echo "Old Price: " . $products[0]['price'] ;
    $product_dao->update($productId, ["price" => 1399.99]);
    $products = $product_dao->getAll();
    print_r("\nNew Price: " . $products[0]['price'] . " \n") ;






echo "\n\n\n\n   CART ITEMS\n";

        
    $cart_item_dao->insert([
        "user_id" => $userId,
        "product_id" => $productId,
        "quantity" => 2
    ]);
   
    echo "\n\nGetAll:\n";
    $cart_items = $cart_item_dao->getAll();
    print_r($cart_items);

    
    echo "\n\nGetByUserId:\n";
    $cart_detail = $cart_item_dao->getByUserId($userId);
    print_r($cart_detail);

    
    echo "\n\nFindItem\n";
    $found = $cart_item_dao->findItem($userId, $productId);
    print_r($found);
    


    echo "\n\nUpdate\n";
    $cartItemId = $cart_items[0]['id'];
    echo "Old Quantity: " . $cart_items[0]['quantity'] ;
    $cart_item_dao->update($cartItemId, ["quantity" => 5]);
    $cart_items = $cart_item_dao->getAll();
    echo "\nNew Quantity: " . $cart_items[0]['quantity'] ;

    
    echo "\n\nClearCart:\n";
    echo "Before: " ;
    print_r($cart_items);
    $cart_item_dao->clearCart($userId);
    $cart_items = $cart_item_dao->getAll();
    echo "After: " ;        
    print_r($cart_items);
    



echo "\n\n\n    CLEANUP\n\n";

    $product_dao->delete($productId);
    $user_dao->delete($userId);

echo "    DONE" ;

echo "</pre>";
?>