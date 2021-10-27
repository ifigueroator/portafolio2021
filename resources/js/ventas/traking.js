import {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Router } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function Traking() {

  const [usuarios, setUsuarios]= useState([]);
  const [tablaUsuarios, setTablaUsuarios]= useState([]);
  const [busqueda, setBusqueda]= useState("");

const peticionGet=async()=>{
  await axios.get(`http://200.83.229.56/dataportal/public/listar-traking`)
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
     elemento.ov.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())    
         
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
              onChange={handleChange}
              value={busqueda}>

              </input>

          <br></br>
              <center>
        
          </center>

          <div className="table-responsive">
              <table className="table table-striped">
                  <thead className="thead-dark">
                      <tr>
                          <th>OV </th>
                          <th>Linea</th>                         
                         
                         
                      </tr>
                  </thead>

                  <tbody>

                 

                      {               
                 
                      
                      usuarios
                          ? usuarios.map((usuario) => (
                            
                                <tr key={usuario.id}>
                                     <td>{usuario.ov}</td>                                 
                                    <td>{usuario.linea}</td>
                                 
                                    
                                </tr>
                            ))
                          : "TRAYENDO DATOS"
                          
                          }
                  </tbody>
              </table>
    
              
          </div>
      </div>
  );
}

export default Traking;
