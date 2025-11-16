<?php

/**
* @OA\Get(
*     path="/cart/{user_id}",
*     tags={"cart"},
*     summary="Get user's cart items",
*     @OA\Parameter(
*         name="user_id",
*         in="path",
*         required=true,
*         description="User ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Cart items"
*     )
* )
*/
Flight::route('GET /cart/@user_id', function($user_id) {

    Flight::json(Flight::cartService()->getCartByUserId($user_id));
});

/**
* @OA\Post(
*     path="/cart",
*     tags={"cart"},
*     summary="Add item to cart",
*     @OA\RequestBody(
*         required=true,
*         @OA\MediaType(
*             mediaType="application/json",
*             @OA\Schema(
*                 required={"user_id", "product_id"},
*                 @OA\Property(property="user_id", type="integer", example=1),
*                 @OA\Property(property="product_id", type="integer", example=1)
*             )
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Item added to cart"
*     )
* )
*/
Flight::route('POST /cart', function() {
    
    $data = Flight::request()->data->getData();

    Flight::cartService()->addToCart($data['user_id'], $data['product_id']);
    Flight::json(['message' => 'Item added to cart']);
});

/**
* @OA\Delete(
*     path="/cart/{id}",
*     tags={"cart"},
*     summary="Remove item from cart",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Cart item ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Item removed from cart"
*     )
* )
*/
Flight::route('DELETE /cart/@id', function($id) {

    Flight::cartService()->removeFromCart($id);
    Flight::json(['message' => 'Items removed from cart']);
});
?>