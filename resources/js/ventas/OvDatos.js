import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import Traking from "./traking";

class OvDatos extends Component {
    state = {
        ov: "",
        cliente: "",
        orden_de_compra: "",
        tipo_de_venta: "",
        canal_de_venta: "",
        clausula:"", //tipo despacho
         transporte:"",
         guia:"",
        error_list: [],
       
    };
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

 

    async componentDidMount() {
        const datosov = this.props.match.params.id;
        console.log(datosov);
        const res = await axios.get(
            `http://200.83.229.56/dataportal/public/datosov/${datosov}`
        );
        if (res.data.status === 200) {
            this.setState({
                ov: res.data.datosOv.ov,
                cliente: res.data.datosOv.cliente,
                orden_de_compra: res.data.datosOv.orden_de_compra,
                tipo_de_venta: res.data.datosOv.tipo_de_venta,
                canal_de_venta: res.data.datosOv.canal_de_venta,
                clausula: res.data.datosOv.clausula,
                transporte: res.data.datosOv.transporte,
                guia: res.data.datosOv.guia,

              
              
            });
        } else if (res.data.status === 404) {
            swal({
                title: "Error de ID",
                text: res.data.message,
                icon: "warning!",
                button: "acepta",
            });
           // this.props.history.push("/dataportal/public/empresas");
        }

      
    }

 

    render() {
        
        return (
            <div className="container">


                <div className="table-responsive">
                    <table className="table table-striped">
                        <br></br>
                       <strong>  DATOS OV </strong>
                        <tr>
                            <thead className="thead-dark">
                           
                                <td>Orden de Venta : </td>
                                <strong>
                                    {" "}
                                    <td>{this.state.ov}</td>
                                </strong>
                            </thead>
                        </tr>

                        <tr>
                            <thead className="thead-dark">
                                <td>Cliente Final : </td>
                                <strong>
                                    {" "}
                                    <td>{this.state.cliente}</td>
                                </strong>
                            </thead>
                        </tr>

                        <tr>
                            <thead className="thead-dark">
                                <td>Orden de compra Cliente : </td>
                                <strong>
                                    <td>{this.state.orden_de_compra}</td>
                                </strong>
                            </thead>
                        </tr>

                        <tr>
                            <thead className="thead-dark">
                                <td>Tipo de Venta : </td>
                                <strong>
                                    {" "}
                                    <td>{this.state.tipo_de_venta}</td>
                                </strong>
                            </thead>
                        </tr>

                        <tr>
                            <thead className="thead-dark">
                                <td>Canal de Venta : </td>
                                <strong>
                                    {" "}
                                    <td>{this.state.canal_de_venta}</td>
                                </strong>
                            </thead>
                        </tr>
                    </table>

                    {/*  +++++++DATOS DE DESPACHO++++++++++ */}

                    <table className="table table-striped">
                    <br></br>
                       <strong> DATOS DESPACHO </strong>
                        <tr>
                            <thead className="thead-dark">
                           
                                <td>Tipo Despacho : </td>
                                <strong>
                                    {" "}
                                    <td>{this.state.clausula}</td>
                                </strong>
                            </thead>
                        </tr>

                        <tr>
                            <thead className="thead-dark">
                                <td>Transporte : </td>
                                <strong>
                                    {" "}
                                    <td>{this.state.transporte}</td>
                                </strong>
                            </thead>
                        </tr>

                        <tr>
                            <thead className="thead-dark">
                                <td>Guia : </td>
                                <strong>
                                    <td>{this.state.guia}</td>
                                </strong>
                            </thead>
                        </tr>

                        <tr>
                            <thead className="thead-dark">
                                <td>OT Transporte / Patente (No hay dato) : </td>
                                <strong>
                                    {" "}
                                    <td>Sin datos</td>
                                </strong>
                            </thead>
                        </tr>

                        <tr>
                            <thead className="thead-dark">
                                <td>Cita / PL (No hay dato) : </td>
                                <strong>
                                    {" "}
                                    <td>Sin datos</td>
                                </strong>
                            </thead>
                        </tr>
                    </table>
                </div>

                <br></br>
               
                          
                              {/* <Traking/> */}

         


            </div>
            
        );
    }
}

export default OvDatos;

/*if (document.getElementById('editar')) {
    ReactDOM.render(<Editar />, document.getElementById('editar'));
}*/
