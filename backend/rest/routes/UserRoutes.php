<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::group('/auth', function() {
    /**
     * @OA\Post(
     *     path="/auth/register",
     *     tags={"auth"},
     *     summary="Register a new user",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"first_name", "last_name", "email", "password"},
     *                 @OA\Property(property="first_name", type="string", example="Test"),
     *                 @OA\Property(property="last_name", type="string", example="User"),
     *                 @OA\Property(property="email", type="string", example="test@gmail.com"),
     *                 @OA\Property(property="password", type="string", example="password123")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Registration successful"
     *     )
     * )
     */
    Flight::route('POST /register', function() {
        $data = Flight::request()->data->getData();
        $result = Flight::userService()->register($data);

        if ($result['success']) {
            Flight::json([
                'message' => 'User registered successfully',
                'data' => $result['data']
            ]);
        } else {
            Flight::halt(500, $result['error']);
        }
    });

    /**
     * @OA\Post(
     *     path="/auth/login",
     *     tags={"auth"},
     *     summary="Login user",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"email", "password"},
     *                 @OA\Property(property="email", type="string", example="test@gmail.com"),
     *                 @OA\Property(property="password", type="string", example="password123")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login successful"
     *     )
     * )
     */
    Flight::route('POST /login', function() {
        $data = Flight::request()->data->getData();
        $result = Flight::userService()->verifyLogin($data['email'], $data['password']);

        if ($result['success']) {
            Flight::json([
                'message' => 'User logged in successfully',
                'data' => $result['data']
            ]);
        } else {
            Flight::halt(500, $result['error']);
        }
    });
});
?>