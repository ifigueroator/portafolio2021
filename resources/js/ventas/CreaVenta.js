import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import swal from "sweetalert";
//import { NotificationContainer, NotificationManager } from 'react-notifications';
import Articulo from "./articulo";

class Creaventa extends Component {
    state = {
        empresas_id: "",
        direccion: "",
        ciudad: "",
        telefono: "",
        vendedor: "",
        ordencompra: "",
        canalventas_id: "",
        tipopagos_id: "",
        tipoventas_id: "",
        obsdespacho: "",
        ciudades: [],
        estadoempresas: [],
        users: [],
        canalventas: [],
        tipoventas: [],
        tipopagos: [],

        error_list: [],

        articulo: [{ articulos_id: "", cantidad: "", estadoitem: "" }],
    };
    handleChange(i, e) {
        let articulo = this.state.articulo;
        articulo[i][e.target.name] = e.target.value;
        this.setState({ articulo });
    }

    addFormFields() {
        this.setState({ articulo: [...this.state.articulo,
                { articulos_id: "", cantidad: "", estadoitem: "" },
            ],
        });
    }

    removeFormFields(i) {
        let articulo = this.state.articulo;
        articulo.splice(i, 1);
        this.setState({ articulo });
    }

    // principio input de creacion de la venta no incluye articulos

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    crearventa = async (e) => {
        e.preventDefault();

        const res = await axios.post(
            `http://200.83.229.56/dataportal/public/crear-venta`,
            this.state,
            {
                empresas_id: "",
                direccion: "",
                ciudad: "",
                telefono: "",
                vendedor: "",
                ordencompra: "",
                canalventas_id: "",
                tipopagos_id: "",
                tipoventas_id: "",
                obsdespacho: "",
                articulos_id:"",
                cantidad:"",
                estadoitem:"",
            }
        );

        if (res.data.status === 200) {
            console.log(res.data.message);

            swal({
                text: res.data.message,
                icon: "success",
                button: "acepta",
            });
            this.props.history.push("/dataportal/public/ventas");

            this.setState({
                empresas_id: "",
                direccion: "",
                ciudads_id: "",
                telefono: "",
                vendedor: "",
                ordencompra: "",
            });
        } else {
            this.setState({
                error_list: res.data.validate_err,
            });
        }
    };

    async componentDidMount() {
        axios
            .get(`http://200.83.229.56/dataportal/public/ciudad`)
            .then((response) => {
                console.log(response);
                this.setState({ ciudades: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(`http://200.83.229.56/dataportal/public/user`)
            .then((response) => {
                console.log(response);
                this.setState({ users: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(`http://200.83.229.56/dataportal/public/canalventa`)
            .then((response) => {
                console.log(response);
                this.setState({ canalventas: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(`http://200.83.229.56/dataportal/public/tipopago`)
            .then((response) => {
                console.log(response);
                this.setState({ tipopagos: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get(`http://200.83.229.56/dataportal/public/tipoventa`)
            .then((response) => {
                console.log(response);
                this.setState({ tipoventas: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

        const emp_id = this.props.match.params.id;
        // console.log(emp_id);
        const res = await axios.get(
            `http://200.83.229.56/dataportal/public/creaventa/${emp_id}`
        );
        if (res.data.status === 200) {
            this.setState({
                empresas_id: res.data.empresa.id,
                nombre: res.data.empresa.nombre,
                rut: res.data.empresa.rut,
                direccion: res.data.empresa.direccion,
                ciudads_id: res.data.empresa.ciudads_id,
                ciudad: res.data.empresa.ciudad,
                telefono: res.data.empresa.telefono,
                // email: res.data.empresa.email,
                // estadoempresas_id: res.data.empresa.estadoempresas_id,
                // usuariocreador: res.data.empresa.usuariocreador,
            });
        } else if (res.data.status === 404) {
            swal({
                title: "Error de ID",
                text: res.data.message,
                icon: "warning!",
                button: "acepta",
            });
            this.props.history.push("/dataportal/public/ventas");
        }
    }

    render() {
        return (
            <div className="content">
                <form onSubmit={this.crearventa}>
                    <h3>
                    
                        Empresa:{this.state.nombre} - Rut:{this.state.rut}{" "}
                    </h3>

                    <div hidden className="col">
                        <input
                            name="empresas_id"
                            onChange={this.handleInput}
                            value={this.state.empresas_id}
                            type="text"
                        ></input>{" "}
                        <span className="text-danger">
                            {this.state.error_list.empresas_id}
                        </span>
                    </div>

                    <div className="row row-cols-auto">
                        <div className="col">
                            <label> Direccion Despacho</label>
                            <input
                                type="text"
                                name="direccion"
                                onChange={this.handleInput}
                                value={this.state.direccion}
                                className="form-control-sm"
                            ></input>
                            <span className="text-danger">
                                {this.state.error_list.direccion}
                            </span>
                        </div>
                        <div className="col">
                            <label> Ciudad</label> <br></br>
                            <div>
                                <select
                                    name="ciudad"
                                    className="form-control-sm "
                                    onChange={this.handleInput}
                                >
                                    <option value={this.state.ciudads_id}>
                                        {this.state.ciudad}
                                    </option>
                                    {this.state.ciudades.map((items) => (
                                        <option key={items.id} value={items.id}>
                                            {items.ciudad}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-danger">
                                    {this.state.error_list.ciudad}
                                </span>
                            </div>
                        </div>

                        <div className="col">
                            <label> Telefono Contacto </label>
                            <br></br>
                            <input
                                name="telefono"
                                onChange={this.handleInput}
                                value={this.state.telefono}
                                type="text"
                                className="form-control-sm"
                                placeholder="Telefono"
                            ></input>
                            <span className="text-danger">
                                {this.state.error_list.telefono}
                            </span>
                        </div>

                        <div className="col">
                            <label> Vendedor</label>
                            <div>
                                <select
                                    name="vendedor"
                                    className="form-control-sm"
                                    onChange={this.handleInput}
                                >
                                    <option defaultValue disable>
                                        Elija Vendedor..
                                    </option>
                                    {this.state.users.map((items) => (
                                        <option
                                            key={items.id}
                                            value={items.name}
                                        >
                                            {items.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-danger">
                                    {this.state.error_list.vendedor}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-auto">
                        <div className="col">
                            <label> Orden de compra</label> <br></br>
                            <input
                                type="text"
                                name="ordencompra"
                                onChange={this.handleInput}
                                value={this.state.ordencompra}
                                className="form-control-sm"
                                placeholder="Ingrese OC"
                            ></input>
                            <span className="text-danger">
                                {this.state.error_list.ordencompra}
                            </span>
                        </div>

                        <div className="col">
                            <label> Canal Ventas</label> <br></br>
                            <div>
                                <select
                                    name="canalventas_id"
                                    className="form-control-sm "
                                    onChange={this.handleInput}
                                >
                                    <option defaultValue disable>
                                        Elija Canal Ventas..
                                    </option>
                                    {this.state.canalventas.map((items) => (
                                        <option key={items.id} value={items.id}>
                                            {items.canalventa}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-danger">
                                    {this.state.error_list.canalventas_id}
                                </span>
                            </div>
                        </div>

                        <div className="col">
                            <label> Tipo de pago</label> <br></br>
                            <div>
                                <select
                                    name="tipopagos_id"
                                    className="form-control-sm "
                                    onChange={this.handleInput}
                                >
                                    <option defaultValue disable>
                                        Elija Tipo pago..
                                    </option>
                                    {this.state.tipopagos.map((items) => (
                                        <option key={items.id} value={items.id}>
                                            {items.tipopago}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-danger">
                                    {this.state.error_list.tipopagos_id}
                                </span>
                            </div>
                        </div>

                        <div className="col">
                            <label> Tipo de Venta</label> <br></br>
                            <div>
                                <select
                                    name="tipoventas_id"
                                    className="form-control-sm "
                                    onChange={this.handleInput}
                                >
                                    <option defaultValue disable>
                                        Elija tipo venta..
                                    </option>
                                    {this.state.tipoventas.map((items) => (
                                        <option key={items.id} value={items.id}>
                                            {items.tipoventa}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-danger">
                                    {this.state.error_list.tipoventas_id}
                                </span>
                            </div>
                        </div>
                    </div>
                    <label for="form7">Observaciones:</label>
                    <div className="row row-cols-auto">
                        <div className="col">
                            <div className="md-form">
                                <textarea
                                    name="obsdespacho"
                                    onChange={this.handleInput}
                                    value={this.state.obsdespacho}
                                    className="md-textarea form-control"
                                    rows="1"
                                    placeholder="Ingrese observaciones del despacho."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <br></br>
                    <h1>Ingrese productos (EN CONSTRUCCION!!!!!!!! )</h1>

                    {this.state.articulo.map((element, index) => (
                        <div className="form-inline" key={index}>
                            <label>Articulo</label>
                            <input
                                type="text"
                                name="articulos_id"
                                value={element.articulos_id || ""}
                                onChange={(e) => this.handleChange(index, e)}
                            />
                               <span className="text-danger">
                                {this.state.error_list.articulos_id}
                            </span>
                            <label>cantidad</label>
                            <input
                                type="text"
                                name="cantidad"
                                value={element.cantidad || ""}
                                onChange={(e) => this.handleChange(index, e)}
                            />
                            <label>Estado Item</label>
                            <input
                                type="text"
                                name="estadoitem"
                                value={element.estadoitem || "" }
                                onChange={(e) => this.handleChange(index, e)}
                            />
                            {index ? (
                                <button
                                    type="button"
                                    className="button remove"
                                    onClick={() => this.removeFormFields(index)}
                                >
                                    Remove
                                </button>
                            ) : null}
                        </div>
                    ))}
                    <div className="button-section">
                        <button
                            className="button add"
                            type="button"
                            onClick={() => this.addFormFields()}
                        >
                            Add
                        </button>
                    </div>

                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">
                            Crear Venta
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Creaventa;
