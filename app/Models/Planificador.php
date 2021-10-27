<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planificador extends Model
{
    use HasFactory;
    protected $fillable=[
       ' FECHA_PLANIFICACION',
        'OV',
       ' LINEA',
        'LLAVE_DE_BUSQUEDA',
        'FECHA_REPROGRAMACION',
       ' CLIENTE',
       ' TIPO_DE_PAGO',
        'NUMERO_ARTICULO',
        'DESCRIPCION_ARTICULO',
       ' TRANSPORTE',
       ' COMUNA',
       ' DIRECCION',
        'CANTIDAD',
       ' VALOR',
        'SOLICITUD_DE_MATERIAL',
       ' GUIA',
       ' TIPO_DE_VENTA',
        'CORREO_CONTACTE',
        'CLAUSULA',
       ' CANAL_DE_VENTA',
       ' ORDEN_DE_COMPRA',
    ];
}
