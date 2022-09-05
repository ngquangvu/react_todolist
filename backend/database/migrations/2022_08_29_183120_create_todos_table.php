<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable(false);
            $table->string('content')->nullable();
            $table->enum('status', ['N/A', 'New', 'In-progress', 'Pending', 'Canceled', 'Complete']);
            $table->enum('priority', ['High', 'Medium', 'Low']);
            $table->dateTime('due_date')->nullable(false);
            $table->bigInteger('created_by')->unsigned()->nullable(false);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by')->references('id')->on('users')->onUpdate('CASCADE')->onDelete('RESTRICT');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todos');
    }
};
