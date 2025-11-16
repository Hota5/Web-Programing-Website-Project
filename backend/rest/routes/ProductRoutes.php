<?php

/**
* @OA\Get(
*     path="/products",
*     tags={"products"},
*     summary="Get all products with optional filters",
*     @OA\Parameter(
*         name="category",
*         in="query",
*         required=false,
*         description="Filter by category",
*         @OA\Schema(type="string", example="Laptops")
*     ),
*     @OA\Parameter(
*         name="maxPrice",
*         in="query",
*         required=false,
*         description="Filter by maximum price",
*         @OA\Schema(type="number", example=1000)
*     ),
*     @OA\Response(
*         response=200,
*         description="List of products"
*     )
* )
*/
Flight::route('GET /products', function() {

    $category = Flight::request()->query['category'] ?? null;
    $maxPrice = Flight::request()->query['maxPrice'] ?? null;

    Flight::json(Flight::productService()->filterProducts($category, $maxPrice));
});

/**
* @OA\Get(
*     path="/products/{id}",
*     tags={"products"},
*     summary="Get product by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Product ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Product details"
*     )
* )
*/
Flight::route('GET /products/@id', function($id) {

    Flight::json(Flight::productService()->getById($id));
});

/**
* @OA\Post(
*     path="/products",
*     tags={"products"},
*     summary="Create a new product",
*     @OA\RequestBody(
*         required=true,
*         @OA\MediaType(
*             mediaType="application/json",
*             @OA\Schema(
*                 required={"name", "price", "category"},
*                 @OA\Property(property="name", type="string", example="Laptop"),
*                 @OA\Property(property="description", type="string", example="Great laptop"),
*                 @OA\Property(property="price", type="number", example=999),
*                 @OA\Property(property="category", type="string", example="Laptops"),
*                 @OA\Property(property="img_url", type="string", example="Image URL here")
*             )
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Product created successfully"
*     )
* )
*/
Flight::route('POST /products', function() {

    $data = Flight::request()->data->getData();
    $result = Flight::productService()->createProduct($data);

    if ($result['success']) {
        Flight::json(['message' => 'Product created successfully', 'data' => $result['data']]);
    } else {
        Flight::halt(400, $result['error']);
    }
});

/**
* @OA\Put(
*     path="/products/{id}",
*     tags={"products"},
*     summary="Update a product",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Product ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\RequestBody(
*         required=true,
*         @OA\MediaType(
*             mediaType="application/json",
*             @OA\Schema(
*                 @OA\Property(property="name", type="string", example="Updated name"),
*                 @OA\Property(property="description", type="string", example="Updated description"),
*                 @OA\Property(property="price", type="number", example=150),
*                 @OA\Property(property="category", type="string", example="Laptops"),
*                 @OA\Property(property="img_url", type="string", example="Image URL Here")
*             )
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Product updated successfully"
*     )
* )
*/
Flight::route('PUT /products/@id', function($id) {

    $data = Flight::request()->data->getData();
    $result = Flight::productService()->updateProduct($id, $data);

    if($result['success']) {
        Flight::json(['message' => 'Product updated successfully']);
    } else {
        Flight::halt(400, $result['error']);
    }
});

/**
* @OA\Delete(
*     path="/products/{id}",
*     tags={"products"},
*     summary="Delete a product",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Product ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\Response(
*         response=200,
*         description="Product deleted successfully"
*     )
* )
*/
Flight::route('DELETE /products/@id', function($id) {

    Flight::productService()->delete($id);
    Flight::json(['message' => 'Product deleted successfully']);
});
?>