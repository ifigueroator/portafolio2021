import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Venta from './OVenta';
import ListVenta from './Lventas';
import Creaventa from './CreaVenta';
import OvDatos from './OvDatos';



function OrVenta() {

    return(

      
        <div className="container">
        <div className="Venta">
           <Router>

               <nav className="navbar navbar-expand navbar-dark bg-dark">
                   <div className="nav navbar-nav">
                      
                       <Link className="nav-item nav-link active" to={"/dataportal/public/ventas"} >Venta<span className="sr-only"></span></Link>
                       <Link className="nav-item nav-link active" to={"/dataportal/public/lista-planificador"}>Planificador</Link>
                       
                       </div>
                </nav>   
                  
                   <Route exact path="/dataportal/public/ventas" component={Venta} />
                   <Route exact path="/dataportal/public/creaventa/:id" component={Creaventa} />
                   <Route exact  path="/dataportal/public/lista-planificador" component={ListVenta} />
                   <Route exact path="/dataportal/public/datosov/:id" component={OvDatos} />  
                
                    
            </Router>            
        </div>
        
        </div>   
       
   
    )
    
}

//export default Vista;
if (document.getElementById('venta')) {
    ReactDOM.render(<OrVenta />, document.getElementById('venta'));
}