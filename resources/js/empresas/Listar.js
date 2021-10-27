import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link, Router } from 'react-router-dom';
import Dashboard from '../components/Dashboard';


class Listar  extends Component
{


    state={
        empresa:[],
        loading:true,
    }
    
    async componentDidMount(){    
    const res =await axios.get(`http://200.83.229.56/dataportal/public/listar-empresa`);
   if(res.data.status===200)
   {
       this.setState({
        empresa:res.data.empresa,
        loading:false,
       });
   }  
}

    eliminar= async(e, id)=>{
    const thidClickedFunda=e.currentTarget;
    thidClickedFunda.innerText="Eliminando!!"
    const res = await axios.delete(`http://200.83.229.56/dataportal/public/eliminar-empresa/${id}`);
    if(res.data.status ===200)
    {
        thidClickedFunda.closest("tr").remove();
        console.log(res.data.message);

    }
}

    render() { 
        var empresa_HTMLTABLE="";
        if(this.state.loading)
        {
            empresa_HTMLTABLE=<tr><td colSpan="10"><h2>Espere.. trayendo datos!!</h2></td></tr>
        }
        else
        {
            empresa_HTMLTABLE=
            this.state.empresa.map((item)=>{
                return(
                    <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td>{item.rut}</td>
                        <td>{item.direccion}</td>
                        <td hidden>{item.ciudads_id}</td>
                        <td>{item.ciudad}</td>
                        <td>{item.telefono}</td>
                        <td>{item.email}</td>
                        <td hidden>{item.estadoempresas_id}</td>
                        <td>{item.estadoempresa}</td>
                        <td>{item.usuariocreador}</td>



                        <td><Link to={`/dataportal/public/EditarEmpresa/${item.id}`}>Editar</Link>
                        </td>
                        <td>
                            <a href="" type="button" onClick={(e)=>this.eliminar(e,item.id)}>Eliminar</a>
                        </td>
                        </tr>                 

                );
            });
        }

        return (

           
        <div className="container">
        <table className="table">
            <thead>
                <tr><th>Nombre</th>
                    <th>Rut</th>
                    <th>Direccion</th>
                    <th>Ciudad</th>
                    <th>Telefono</th>
                    <th>Email</th>
                    <th>Estado Empresa</th>
                    <th>Usuario Creador</th>
                    </tr>
            </thead>
            <tbody>
            {empresa_HTMLTABLE}
              
            </tbody>
               
        </table>
        </div>  );

        
    }

    
}

 
export default Listar;

//export default Vista;
/*if (document.getElementById('empresa')) {
    ReactDOM.render(<Listar />, document.getElementById('empresa'));
}*/