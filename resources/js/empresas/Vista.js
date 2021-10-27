import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Listar from './Listar';
import Crear from './Crear';
import Editar from './Editar';


function Empresa() {

    return(
        <div className="container">
        <div className="Empresa">
           <Router>

               <nav className="navbar navbar-expand navbar-light bg-light">
                   <div className="nav navbar-nav">
                      
                       <Link className="nav-item nav-link active" to={"/dataportal/public/empresas"} >Volver <span className="sr-only"></span></Link>
                       <Link className="nav-item nav-link" to={"/dataportal/public/CrearEmpresa"}>Nueva Empresa</Link>
                       </div>
                </nav>   
                  
                   <Route exact path="/dataportal/public/empresas" component={Listar} />
                   <Route  path="/dataportal/public/CrearEmpresa" component={Crear} />
                   <Route path="/dataportal/public/EditarEmpresa/:id" component={Editar} />       
            </Router>            
        </div>
        </div>   
    )
    
}

//export default Vista;
if (document.getElementById('empresa')) {
    ReactDOM.render(<Empresa />, document.getElementById('empresa'));
}