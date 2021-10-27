import {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Router } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Pagination from './paginacion';
import Modal from './Modal';




function ListVenta() {

  const [usuarios, setUsuarios]= useState([]);
  const [tablaUsuarios, setTablaUsuarios]= useState([]);
  const [busqueda, setBusqueda]= useState("");

  // const [currentPage, setCurrentPage]=useState(1);
  // const[employeesPerPage]=useState(2);





const peticionGet=async()=>{
  await axios.get(`http://200.83.229.56/dataportal/public/listar-planificador`)
  .then(response=>{
    setUsuarios(response.data);
    setTablaUsuarios(response.data);

   
           
  }).catch(error=>{
    console.log(error);
  })
}

const handleChange=e=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);
}

const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
    if(
     elemento.cliente.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())    
    ||elemento.ov.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ||elemento.tipo_de_pago.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ||elemento.comuna.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ||elemento.transporte.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ||elemento.fecha_reprogramacion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
   
   
     
    ){
      return elemento;
    }
  });
  setUsuarios(resultadosBusqueda);
}


useEffect(()=>{
peticionGet();
},[])


 

  return (
  
    
      <div className="container">
  <br></br>

          <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Busqueda por OV, Cliente, Tipo pago, Comuna, Transporte, Fecha Reprogramacion"
              onChange={handleChange}
              value={busqueda}
          ></input>

          <br></br>
              <center>
          {/* <Pagination/> */}
          </center>

          <div className="table-responsive">
              <table className="table table-striped">
                  <thead className="thead-dark">
                      <tr>
                          <th>OV </th>
                          <th>Linea</th>                         
                          <th>N° Articulos</th>
                          <th>Descr.Articulo</th>
                          <th>Cantidad</th>
                          <th>Sol. Material</th>


                          <th>Llave de busqueda</th>
                          <th>Fecha Reprogramacion</th>
                          <th>Cliente</th>
                          <th>Tipo de pago</th>            
                          <th>Transporte</th>
                          <th>Comuna</th>
                          <th>Direccion</th>                          
                          <th>Valor</th>                          
                          <th>Guia</th>
                          <th>T. Venta</th>
                          <th>Correo</th>
                          <th>Clausula</th>
                          <th>C. Venta</th>
                          <th>OCompra</th>
                          <th>Agendamiento</th>
                          <th>Packing List</th>
                          <th>OT Transp/ Patente</th>
                      </tr>
                  </thead>

                  <tbody>

                 

                      {               
                 
                      
                      usuarios 
                         && 
                        
                          usuarios.map((usuario) => (
                            
                                <tr key={usuario.id}>
                                 
                                    {/* <td><a href="#"> {usuario.ov}</a></td> */}
                  <td>  <button >
                      <Link to={`/dataportal/public/datosov/${usuario.id}`}>{usuario.ov}</Link>
                      </button></td>
                                    <td>{usuario.linea}</td>
                                    <td>{usuario.numero_articulo}</td>
                                    <td>{usuario.descripcion_articulo}</td>
                                    <td>{usuario.cantidad}</td>
                                    <td>{usuario.solicitud_de_material}</td>

                                    <td>{usuario.llave_de_busqueda}</td>
                                    <td>{usuario.fecha_reprogramacion}</td>
                                    <td>{usuario.cliente}</td>
                                    <td>{usuario.tipo_de_pago}</td>                                   
                                    <td>{usuario.transporte}</td>
                                    <td>{usuario.comuna}</td>
                                    <td>{usuario.direccion}</td>                                   
                                    <td>{usuario.valor}</td>                                   
                                    <td>{usuario.guia}</td>
                                    <td>{usuario.tipo_de_venta}</td>
                                    <td>{usuario.correo_contacte}</td>
                                    <td>{usuario.clausula}</td>
                                    <td>{usuario.canal_de_venta}</td>
                                    <td>{usuario.orden_de_compra}</td>

                                    <td>?</td>
                                    <td>?</td>
                                    <td>?</td>

                                    
                                </tr>
                            )) 
                         
                          
                          }
                  </tbody>
              </table>
                           <Modal id=''ov='' contenido=''></Modal>
              
          </div>
      </div>
  );
}

export default ListVenta;











// class ListVenta  extends Component {

//     state={
//         planificador:[],
//         loading:true,
//     }

//     async componentDidMount(){
//     const res =await axios.get(`http://200.83.229.56/dataportal/public/listar-planificador`);
//    if(res.data.status===200)
//    {
//        this.setState({
//         planificador:res.data.planificador,
//         loading:false,
//        });
//    }
// }

//     render() {

//         var planificador_HTMLTABLE="";
//         if(this.state.loading)
//         {
//             planificador_HTMLTABLE=<tr><td colSpan="20"><h2>Espere.. trayendo datos!!</h2></td></tr>
//         }
//         else
//         {
//             planificador_HTMLTABLE=
//             this.state.planificador.map((item)=>{
//                 return(
//                     <tr key={item.id}>

//                         <td>{item.ov}</td>
//                         <td >{item.linea}</td>
//                         <td >{item.llave_de_busqueda}</td>
//                         <td>{item.fecha_reprogramacion}</td>
//                         <td >{item.cliente}</td>
//                         <td >{item.tipo_de_pago}</td>
//                         <td >{item.numero_articulo}</td>
//                         <td >{item.descripcion_articulo}</td>
//                         <td >{item.tipo_de_pago}</td>
//                         <td >?</td>
//                         <td >{item.transporte}</td>
//                         <td >{item.comuna}</td>
//                         <td >{item.direccion}</td>
//                         <td >{item.cantidad}</td>
//                         <td >{item.valor}</td>
//                         <td >{item.solicitud_de_material}</td>
//                         <td >?</td>
//                         <td >?</td>
//                         <td >{item.guia}</td>
//                         <td >?</td>

//                         {/* <td><Link to={`/dataportal/public/creaventa/${item.id}`}>Generar Venta</Link>
//                         </td> */}

//                         </tr>

//                 );
//             });
//         }

//         return (

//         <div className="container">
//         <table className="table table-striped">
//             <thead className="thead-dark">
//                 <tr>

//                     <th>OV </th>
//                     <th >Linea</th>
//                     <th>Llave de busqueda</th>
//                     <th >Fecha Reprogramacion</th>
//                     <th >Cliente</th>
//                     <th>Tipo de pago</th>
//                     <th>N° Articulos</th>
//                     <th >Descr.Articulo</th>
//                     <th>T.Despacho</th>
//                     <th >Transporte</th>
//                     <th >Comuna</th>
//                     <th>Direccion</th>
//                     <th>Tipo de pago</th>
//                     <th>Cantidad</th>
//                     <th>Valor</th>
//                     <th>Sol. Material</th>
//                     <th>Agendamiento</th>
//                     <th >Packing List</th>
//                       <th >Guia</th>
//                         <th >OT Transp/ Patente</th>

//                     </tr>
//             </thead>
//             <tbody>
//             {planificador_HTMLTABLE}

//             </tbody>

//         </table>
//         </div>  );

//     }

// }

// export default ListVenta;
