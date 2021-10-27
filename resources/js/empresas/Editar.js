import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import swal from "sweetalert";

class Editar extends Component {
    state = {
        nombre: "",
        rut: "",
        direccion: "",
        ciudads_id: "",
        ciudad: "",
        estadoempresas_id: "",
        telefono: "",
        email: "",
        usuariocreador: "",
        ciudades: [],
        estadoempresas: [],
        error_list: [],
    };
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    async componentDidMount() {
        const emp_id = this.props.match.params.id;
        // console.log(emp_id);
        const res = await axios.get(
            `http://200.83.229.56/dataportal/public/EditarEmpresa/${emp_id}`
        );
        if (res.data.status === 200) {
            this.setState({
                nombre: res.data.empresa.nombre,
                rut: res.data.empresa.rut,
                direccion: res.data.empresa.direccion,
                ciudads_id: res.data.empresa.ciudads_id,
                ciudad: res.data.empresa.ciudad,
                telefono: res.data.empresa.telefono,
                email: res.data.empresa.email,
                estadoempresas_id: res.data.empresa.estadoempresas_id,
                usuariocreador: res.data.empresa.usuariocreador,
            });
        } else if (res.data.status === 404) {
            swal({
                title: "Error de ID",
                text: res.data.message,
                icon: "warning!",
                button: "acepta",
            });
            this.props.history.push("/dataportal/public/empresas");
        }

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
            .get(`http://200.83.229.56/dataportal/public/estadoempresa`)
            .then((response) => {
                console.log(response);
                this.setState({ estadoempresas: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    editar = async (e) => {
        e.preventDefault();

        // document.getElementById('mensaje').disable=true;
        // document.getElementById('mensaje').innerText="Modificadar";
        const emp_id = this.props.match.params.id;
        const res = await axios.put(
            `http://200.83.229.56/dataportal/public/editar-empresa/${emp_id}`,
            this.state
        );

        if (res.data.status === 200) {
            swal({
                text: res.data.message,
                icon: "success",
                button: "acepta",
            });
            //console.log(res.data.message);
            this.props.history.push("/dataportal/public/empresas");

            // document.getElementById('mensaje').disable=false;
            //document.getElementById('mensaje').innerText="Datos Modificados!!";
        } else if (res.data.status === 404) {
            swal({
                title: "Error de ID",
                text: res.data.message,
                icon: "warning!",
                button: "acepta",
            });
            this.props.history.push("/dataportal/public/empresas");
        } else {
            this.setState({
                error_list: res.data.validate_err,
            });
        }
    };

    render() {
        return (
            <form onSubmit={this.editar}>
                <label> Nombre Empresa</label>
                <input 
                    type="text"
                    name="nombre"
                    onChange={this.handleInput}
                    value={this.state.nombre}
                    className="form-control"
                />
                <span className="text-danger">
                    {this.state.error_list.nombre}
                </span>
                <label> Rut Empresa</label>
                <input
                    type="text"
                    name="rut"
                    onChange={this.handleInput}
                    value={this.state.rut}
                    className="form-control"
                    placeholder="sin guion-incluya dig verificador"
                />
                <span className="text-danger">{this.state.error_list.rut}</span>
                <label> Direccion Empresa</label>
                <input
                    type="text"
                    name="direccion"
                    onChange={this.handleInput}
                    value={this.state.direccion}
                    className="form-control"
                />
                <span className="text-danger">
                    {this.state.error_list.direccion}
                </span>

                <label> Ciudad </label>
                <select
                    name="ciudads_id"
                    className="form-control"
                    onChange={this.handleInput}
                >

                    
                    <option value={this.state.ciudads_id}>
                        {this.state.ciudads_id}
                    </option>
                    {this.state.ciudades.map((items) => (
                        <option key={items.id} value={items.id}>
                            {items.ciudad}
                        </option>
                    ))}
                </select>

                <label> Telefono </label>
                <input
                    type="text"
                    name="telefono"
                    onChange={this.handleInput}
                    value={this.state.telefono}
                    className="form-control"
                />
                <span className="text-danger">
                    {this.state.error_list.telefono}
                </span>

                <label> Email </label>
                <input
                    type="email"
                    name="email"
                    onChange={this.handleInput}
                    value={this.state.email}
                    className="form-control"
                />
                <span className="text-danger">
                    {this.state.error_list.email}
                </span>

                <label> Estado Empresa</label>
                <select
                    name="estadoempresas_id"
                    className="form-control"
                    onChange={this.handleInput}
                >
                    <option value={this.state.estadoempresas_id}>
                        {this.state.estadoempresas_id}
                    </option>
                    {this.state.estadoempresas.map((items) => (
                        <option key={items.id} value={items.id}>
                            {items.estadoempresa}
                        </option>
                    ))}
                </select>

                <label hidden> Creado por</label>
                <input hidden
                    type="text"
                    name="usuariocreador"
                    onChange={this.handleInput}
                    value={this.state.usuariocreador}
                    className="form-control"
                />
                <span className="text-danger">
                    {this.state.error_list.usuariocreador}
                </span>

                <div className="modal-footer">
                    <button
                        type="submit"
                        id="mensaje"
                        className="btn btn-primary"
                    >
                        Modificar
                    </button>
                </div>
            </form>
        );
    }
}

export default Editar;

/*if (document.getElementById('editar')) {
    ReactDOM.render(<Editar />, document.getElementById('editar'));
}*/
