<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVentasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ventas', function (Blueprint $table) {
            $table->bigIncrements('id');//OV   orden de ventas
            $table->unsignedBigInteger('empresas_id');
            $table->foreign('empresas_id')->references('id')->on('empresas');//por medio de una busqueda
             $table->string('direccion');//viene de empresas
             $table->string('ciudad');//viene de empresas
             $table->string('telefono');  
             $table->string('vendedor');//se refiere a quien esta creando la venta en el sistema
             $table->string('ordencompra');    

            $table->unsignedBigInteger('canalventas_id');
            $table->foreign('canalventas_id')->references('id')->on('canalventas');

            $table->unsignedBigInteger('tipopagos_id');
            $table->foreign('tipopagos_id')->references('id')->on('tipopagos');

            $table->unsignedBigInteger('tipoventas_id');
            $table->foreign('tipoventas_id')->references('id')->on('tipoventas');
                   
            $table->string('obsdespacho');           
            $table->string('estadoventa');//pendiente, completa,faltaxdespachar   
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ventas');
    }
}
