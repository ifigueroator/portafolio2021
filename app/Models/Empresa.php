<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;
    //protected $table = 'empresas'; esta funcion proteje la tabla de un borrado accidental
    //public $incrementing = false;
    protected $fillable=[
        'nombre',
        'rut',
        'direccion',
        'ciudads_id', 
        'estadoempresas_id',  
        'telefono',
        'email',       
        'usuariocreador',
    ];
}
