<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product; // Import the Product model

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = Product::all(); // Fetch all products from the database

        // Return a JSON response with the products data
        return response()->json($products);
    }
 /**
     * Store a newly created product in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'productName' => 'required|max:255',
            'productPrice' => 'required|numeric',
            'productImage' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle file upload
        if ($request->hasFile('productImage')) {
            $image = $request->file('productImage');
            $imageName = time() . '.' . $image->getClientOriginalExtension(); // Create a unique name for the image
            $imagePath = $image->storeAs('', $imageName, 'public');        }

        // Create a new product instance and set its properties
        $product = new Product();
        $product->name = $validatedData['productName'];
        $product->price = $validatedData['productPrice'];
        $product->image = 'storage/'.$imageName ?? ''; // Save the image name or an empty string if no image

        // Save the product to the database
        $product->save();

        // Return a success response
        return response()->json([
            'message' => 'Product created successfully!',
            'product' => $product,
        ]);
    }
}
