<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
   // use HasFactory;
   protected $fillable=[

  'empresas_id',  
  'direccion',
  'ciudad',
  'telefono',
  'vendedor',
  'ordencompra',//7
  'canalventas_id',//8
  'tipopagos_id',//9
  'tipoventas_id',//10  
  'obsdespacho',  
   'estadoventa',//se creara un trigger para el ingreso de este parametro
   ];
}
