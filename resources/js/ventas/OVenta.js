import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link, Router } from 'react-router-dom';



class Venta  extends Component
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
                         <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.rut}</td>
                        <td hidden>{item.direccion}</td>
                        <td hidden>{item.ciudads_id}</td>
                        <td>{item.ciudad}</td>
                        <td hidden>{item.telefono}</td>
                        <td hidden>{item.email}</td>
                        <td hidden>{item.estadoempresas_id}</td>
                        <td >{item.estadoempresa}</td>
                        <td hidden>{item.usuariocreador}</td>



                        <td><Link to={`/dataportal/public/creaventa/${item.id}`}>Generar Venta</Link>
                        </td>
                     
                        </tr>                 

                );
            });
        }

        return (

           
        <div className="container">
        <table className="table">
            <thead>
                <tr><th>id</th>
                    <th>Nombre</th>
                    <th>Rut</th>
                    <th hidden>Direccion</th>
                    <th>Ciudad</th>
                    <th hidden>Telefono</th>
                    <th hidden>Email</th>
                    <th>Estado Empresa</th>
                    <th hidden>Usuario Creador</th>
                    </tr>
            </thead>
            <tbody>
            {empresa_HTMLTABLE}
              
            </tbody>
               
        </table>
        </div>  );

        
    }

    
}

 
export default Venta;

//export default Vista;
/*if (document.getElementById('empresa')) {
    ReactDOM.render(<Listar />, document.getElementById('empresa'));
}*/