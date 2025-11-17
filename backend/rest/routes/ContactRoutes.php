<?php

/**
* @OA\Post(
*     path="/contact",
*     tags={"contact"},
*     summary="Submit a contact message",
*     @OA\RequestBody(
*         required=true,
*         @OA\MediaType(
*             mediaType="application/json",
*             @OA\Schema(
*                 required={"name", "email", "message"},
*                 @OA\Property(property="name", type="string", example="Test User"),
*                 @OA\Property(property="email", type="string", example="test@gmail.com"),
*                 @OA\Property(property="message", type="string", example="How much wood could a woodchuck chuck if a woodchuck could chuck wood?")
*             )
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Message sent successfully"
*     )
* )
*/
Flight::route('POST /contact', function() {

    $data = Flight::request()->data->getData();
    $result = Flight::contactService()->submitMessage($data);

    if($result['success']) {
        Flight::json(['message' => 'Message sent successfully']);
    } else {
        Flight::halt(400, $result['error']);
    }

});

?>