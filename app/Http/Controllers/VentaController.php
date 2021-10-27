<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\Comuna;
use App\Models\Ciudad;
use App\Models\User;
use App\Models\Estadoempresa;
use App\Models\Tipopago;
use App\Models\Tipoventa;
use App\Models\Canalventa;
use App\Models\Venta;
use App\Models\ItemsVenta;
use App\Models\Articulo;
use App\Models\Planificador;
use DB;
use Illuminate\Support\Facades\Validator;

class VentaController extends Controller
{
 public function __construct()
  {
      $this->middleware('auth');
  }

    public function v_ventas()
    {
  //  $request->user()->authorizeRoles(['user','admin']);  
      return view('ventas');
    }

    public function crea_ventas($id)
    {
   $ciudad=Ciudad::all();
   $estadoempresa=Estadoempresa::all();
  $empresa = Empresa::select(
     'empresas.id',
     'empresas.nombre',
     'empresas.rut',
     'empresas.direccion',
     'empresas.ciudads_id', 
     'empresas.estadoempresas_id',  
     'empresas.telefono',
     'empresas.email',       
     'empresas.usuariocreador',     
     'ciudads.ciudad',     
     'estadoempresas.estadoempresa',
   )
   ->join('ciudads','empresas.ciudads_id','=','ciudads.id')
   ->join('estadoempresas','empresas.estadoempresas_id','=','estadoempresas.id')    
   ->find($id);

      
      if($empresa)
      {
        return response()->json([
          'status'=>200,
          'empresa'=>$empresa, 
        ]);

      }
      else
      {
        return response()->json([
          'status'=>404,
          'empresa'=>'Id no encontrado', 
        ]);

      }
          
      
    }
  

    public function canalventa()
    {
      $canalventa=Canalventa::select('id','canalventa')->get();
      return  $canalventa;
     
    }
    public function tipopago()
    {
      $tipopago=Tipopago::select('id','tipopago')->get();
      return  $tipopago;
     
    }
    public function tipoventa()
    {
      $tipoventa=Tipoventa::select('id','tipoventa')->get();
      return  $tipoventa;
     
    }

   
 /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

    public function crearventa(Request $request)
    {
       $validator = Validator::make($request->all(),[
            'empresas_id'=>'required',       
            'direccion'=>'required|max:200',
            'ciudad'=>'required',       
            'telefono'=>'required|max:14',     
            'vendedor'=>'required|max:100',
            'ordencompra'=>'required',
            'canalventas_id'=>'required',
            'tipopagos_id'=>'required',
            'tipoventas_id'=>'required',
            'obsdespacho'=>'required|max:200',
           'articulos_id'=>'required',
           'cantidad'=>'required',
           'estadoitem'=>'required',
    
    
            ]);
    
            if($validator->fails())
            {
            return response()->json([
            'validate_err'=>$validator->messages(),
            ]);
            }
            else
            {
       /*+++++++++++++ SOLO GUARDA UN ITEMS  ********/
              // $data= $request->all();//TRAE LA DATOS QUE GENERA LA VENTA
              // $lastid=Venta::create($data)->id;


              // $articulo = new ItemsVenta;//ESTO LLENA Y GUARDA LO QUE SE INGRESA EN ARTICULOS           
              //     $articulo->ventas_id=$lastid;
              //      $articulo->articulos_id=$request->input('articulos_id');
              //      $articulo->cantidad=$request->input('cantidad');
              //      $articulo->estadoitem=$request->input('estadoitem');                 
              //      $articulo->save();
              //      return response()->json([
              //       'status'=>200,
              //       'message'=>'Venta Creada', ]);  
              //  }
       /*+++++++++++++FIN SOLO GUARDA UN ITEMS  ********/   
       
            $data= $request->all();//TRAE LA DATOS QUE GENERA LA VENTA
               $lastid=Venta::create($data)->id;
             
             
          /*$data2= array($request->all());*/
                  $articulo = new ItemsVenta;
                  

                  $articulo = array(
                    'ventas_id'=>$lastid,
                    'articulos_id' => $articulo->articulos_id,
                    'cantidad' => $articulo->cantidad,
                    'estadoitem' => $articulo->estadoitem ,);
                  
              //  foreach($articulo as $key=>$insert){
              //   $articulo=[
              //   'ventas_id'=>$lastid,
              //   'articulos_id'=>$request->articulos_id[$key],
              //   'cantidad'=>$request->cantidad[$key],
              //   'estadoitem'=>$request->estadoitem[$key],];
                DB::table('items_ventas')->insert($articulo);    
                             
                 
               
                        
           }
           return response()->json([
            'status'=>200,
            'message'=>'Venta Creada', ]);  
       



      }  

      public function listar()
    {
    // $empresa = Empresa::all();
      $planificador=Planificador::select(
        'ID',
        'FECHA_PLANIFICACION',
        'OV',
       'LINEA',
        'LLAVE_DE_BUSQUEDA',
        'FECHA_REPROGRAMACION',
       'CLIENTE',
       'TIPO_DE_PAGO',
        'NUMERO_ARTICULO',
        'DESCRIPCION_ARTICULO',
       'TRANSPORTE',
       'COMUNA',
       'DIRECCION',
        'CANTIDAD',
       'VALOR',
        'SOLICITUD_DE_MATERIAL',
       'GUIA',
       'TIPO_DE_VENTA',
        'CORREO_CONTACTE',
        'CLAUSULA',
       'CANAL_DE_VENTA',
       'ORDEN_DE_COMPRA',
      )
      ->orderBy('solicitud_de_material','desc')
      ->orderBy('OV','asc')
      ->get();     
      return  $planificador;    
     
    }


    public function datosov($id)
    {
      $datosOv=Planificador::find($id);
      if($datosOv)
      {
        return response()->json([
          'status'=>200,
          'datosOv'=>$datosOv, 
        ]);

      }
      else
      {
        return response()->json([
          'status'=>404,
          'ov'=>'Id no encontrado', 
        ]);

      }
          
    }

    public function traking()
    {
    // $empresa = Empresa::all();
      $traking=Planificador::select(
        'ID',       
        'OV',
        'LINEA',       
        'NUMERO_ARTICULO',
        'DESCRIPCION_ARTICULO',     
        'CANTIDAD',      
        'SOLICITUD_DE_MATERIAL',)    
        ->get();     
      return  $traking;    
     
    }

  

}

