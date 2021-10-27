import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Select from "react-select";
import swal from "sweetalert";

class Crear extends Component {
    state = {
        nombre: "",
        rut: "",
        direccion: "",
        ciudads_id: "",
        estadoempresas_id: "",
        telefono: "",
        email: "",
        usuariocreador: "",
        name: "",
        ciudades: [],
        estadoempresas: [],
        users: [],
        error_list: [],
    };

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    crear = async (e) => {
        e.preventDefault();

        const res = await axios.post(
            `http://200.83.229.56/dataportal/public/crear-empresa`,
            this.state,
            {
                nombre: "",
                rut: "",
                direccion: "",
                ciudads_id: "",
                estadoempresas_id: "",
                telefono: "",
                email: "",
                usuariocreador: "-",
                users: "",
            }
        );

        if (res.data.status === 200) {
            // console.log(res.data.message);

            swal({
                text: res.data.message,
                icon: "success",
                button: "acepta",
            });
            this.props.history.push("/dataportal/public/empresas");

            this.setState({
                nombre: "",
                rut: "",
                direccion: "",
                ciudads_id: "",
                estadoempresas_id: "",
                telefono: "",
                email: "",
                usuariocreador: "",
            });
        } else {
            this.setState({
                error_list: res.data.validate_err,
            });
        }
    };

    componentDidMount() {
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

        axios
            .get(`http://200.83.229.56/dataportal/public/user`)
            .then((response) => {
                console.log(response);
                this.setState({ users: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.crear}>
                <div className="container">
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
                    <span className="text-danger">
                        {this.state.error_list.rut}
                    </span>
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
                    <div>
                        <select
                            name="ciudads_id"
                            className="form-control"
                            onChange={this.handleInput}
                        >
                            <option defaultValue disable>
                                Elija una ciudad..
                            </option>
                            {this.state.ciudades.map((items) => (
                                <option key={items.id} value={items.id}>
                                    {items.ciudad}
                                </option>
                            ))}
                        </select>
                        <span className="text-danger">
                            {this.state.error_list.ciudads_id}
                        </span>
                    </div>

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

                    <label> Estado Empresa </label>
                    <div>
                        <select
                            name="estadoempresas_id"
                            className="form-control"
                            onChange={this.handleInput}
                        >
                            <option defaultValue disable>
                                Elija un estado..
                            </option>
                            {this.state.estadoempresas.map((items) => (
                                <option key={items.id} value={items.id}>
                                    {items.estadoempresa}
                                </option>
                            ))}
                        </select>
                        <span className="text-danger">
                            {this.state.error_list.estadoempresa}
                        </span>
                    </div>

                    <label> Creado por </label>
                    <div>
                        <select
                            name="usuariocreador"
                            className="form-control"
                            onChange={this.handleInput}
                        >
                            <option defaultValue disable>
                                Elija usuario..
                            </option>
                            {this.state.users.map((items) => (
                                <option key={items.id} value={items.name}>
                                    {items.name}
                                </option>
                            ))}
                        </select>
                        <span className="text-danger">
                            {this.state.error_list.estadoempresa}
                        </span>
                    </div>
                    <span className="text-danger">
                        {this.state.error_list.usuariocreador}
                    </span>

                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">
                            GUARDAR
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Crear;

/*if (document.getElementById('crear')) {
    ReactDOM.render(<Crear />, document.getElementById('crear'));
}*/
