<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemsVenta extends Model
{
   use HasFactory;
   protected $fillable =[
    'ventas_id',
    'articulos_id',  
    'cantidad',
    'estadoitem'
 
 ];
}
