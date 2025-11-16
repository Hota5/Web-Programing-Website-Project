<?php

/**
* @OA\Post(
*     path="/orders",
*     tags={"orders"},
*     summary="Create a new order (checkout)",
*     @OA\RequestBody(
*         required=true,
*         @OA\MediaType(
*             mediaType="application/json",
*             @OA\Schema(
*                 required={"user_id", "first_name", "last_name", "email", "address", "city", "postal_code", "country"},
*                 @OA\Property(property="user_id", type="integer", example=1),
*                 @OA\Property(property="first_name", type="string", example="Test"),
*                 @OA\Property(property="last_name", type="string", example="User"),
*                 @OA\Property(property="email", type="string", example="test@gmail.com"),
*                 @OA\Property(property="phone_number", type="string", example="+1234567890"),
*                 @OA\Property(property="address", type="string", example="Random Address"),
*                 @OA\Property(property="city", type="string", example="Sarajevo"),
*                 @OA\Property(property="state", type="string", example="KS"),
*                 @OA\Property(property="postal_code", type="string", example="71000"),
*                 @OA\Property(property="country", type="string", example="Bosnia and Herzegovina"),
*             )
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Order created successfully"
*     )
* )
*/
Flight::route('POST /orders', function() {

    $data = Flight::request()->data->getData();
    $result = Flight::orderService()->createOrder($data['user_id'], $data);

    if ($result['success']) {
        Flight::json($result);
    } else {
        Flight::halt(400, $result['error']);
    }
});

?>