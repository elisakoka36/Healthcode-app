<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
use App\Models\Product; // Import the Product model

class OrderController extends Controller
{

public function getUserOrders()
{
    $user = Auth::user(); // Get the authenticated user

    // Check if the user is a super admin
    if ($user->is_admin) {
        // Fetch all orders with their items and user details
        $orders = Order::with('orderItems.product', 'user')->get();
    } else {
        // Fetch only the orders of the authenticated user
        $orders = $user->orders()->with('orderItems.product')->get();
    }

    return response()->json($orders);
}


    public function createOrder(Request $request)
    {
        $user = Auth::user(); // Assuming user is authenticated
        $data = $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $total = 0;
        foreach ($data['items'] as $item) {
            $product = Product::find($item['product_id']);
            $total += $product->price * $item['quantity'];
        }

        $order = $user->orders()->create(['total' => $total]);

        foreach ($data['items'] as $item) {
            $product = Product::find($item['product_id']);
            $order->orderItems()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);
        }

        return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
    }
}
