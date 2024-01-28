<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Foreign key to the users table
            $table->string('first_name');
            $table->string('last_name');
            $table->string('country');
            $table->text('notes')->nullable(); // Notes can be optional
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')
                  ->onDelete('cascade'); // This line sets up the foreign key constraint and ensures that reservations are deleted when the associated user is deleted.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
