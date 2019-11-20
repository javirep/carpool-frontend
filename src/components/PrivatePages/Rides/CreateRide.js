import React, { Component } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

class CreateRide extends Component {
    state = {
        departureTime: "09:00",
        departureZip: "",
        departurePlace: "",
        arrivalTime: "09:30",
        arrivalZip: "",
        arrivalPlace: "",
        frequency: "L-V",
        car: true,
        showLink: false,
        errorMessage: ""
    };

    handleFormSubmit = async event => {
        event.preventDefault();
        let validForm = false
        let errorMessage = ""
        const { departureTime, departureZip, departurePlace, arrivalTime, arrivalZip, arrivalPlace, frequency, car } = this.state;

        if (!departureTime || !departureZip || !departurePlace || !arrivalTime || !arrivalZip || !arrivalPlace || !frequency) {
            console.log("Por favor, rellena todos los campos")
            errorMessage = "Por favor, rellena todos los campos"
        }
        else if (!/(\d{5})/g.test(departureZip)) {
            errorMessage = "Por favor, introduce un código postal válido"
        }
        else { validForm = true }

        if (validForm === true) {
            const apiCaller = axios.create({
                baseURL: `${process.env.REACT_APP_API_URI}`,
                withCredentials: true
            })
            await apiCaller.post("ride/", ({ departureTime, departureZip, departurePlace, arrivalTime, arrivalZip, arrivalPlace, frequency, car }));
            this.setState({
                showLink: true
            })
            this.setState({
                departureTime: "09:00",
                departureZip: "",
                departurePlace: "",
                arrivalTime: "09:30",
                arrivalZip: "",
                arrivalPlace: "",
                frequency: "L-V",
                car: true,
                errorMessage: ""
            })

        }

        this.setState({
            errorMessage
        })
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleChangeCar = event => {
        const { value } = event.target;
        value === "Si" ? this.setState({ car: true }) : this.setState({ car: false })
    }

    render() {
        const { departureTime, departureZip, departurePlace, arrivalTime, arrivalZip, arrivalPlace, frequency, errorMessage } = this.state;
        return (
            <div>
                <form className="form" onSubmit={this.handleFormSubmit}>
                    <h2>Publica tu trayecto</h2>
                    <div>
                        <p>De</p>
                        <input style={{ width: "20vw" }} type="text" name="departurePlace" placeholder="Plaza o calle" value={departurePlace} onChange={this.handleChange} />
                        <input style={{ width: "10vw" }} type="text" name="departureZip" placeholder="C.P." value={departureZip} onChange={this.handleChange} />
                        <input style={{ width: "10vw" }} type="text" placeholder="Ciudad" />
                    </div>
                    <div>
                        <p>A</p>
                        <input style={{ width: "20vw" }} type="text" name="arrivalPlace" placeholder="Plaza o calle" value={arrivalPlace} onChange={this.handleChange} />
                        <input style={{ width: "10vw" }} type="text" name="arrivalZip" placeholder="C.P." value={arrivalZip} onChange={this.handleChange} />
                        <input style={{ width: "10vw" }} type="text" placeholder="Ciudad" />
                    </div>
                    <div>
                        <p style={{ position: "relative", left: "2.6vw" }}>Hora de salida</p>
                        <input style={{ width: "12vw", position: "relative", left: "2.6vw" }} type="time" name="departureTime" placeholder="9.00?" value={departureTime} onChange={this.handleChange} />

                        <p style={{ width: "auto", position: "relative", left: "4vw" }}>Hora de llegada</p>
                        <input style={{ width: "12vw", position: "relative", left: "4vw" }} type="time" name="arrivalTime" placeholder="9.30?" value={arrivalTime} onChange={this.handleChange} />
                    </div>

                    <div>
                        <p>Frecuencia</p>
                        <select style={{ width: "20vw" }} className="input select-input" name="frequency" value={frequency} onChange={this.handleChange}>
                            <option value="L-V">Lunes a Viernes</option>
                            <option value="V">Viernes</option>
                            <option value="S">Sabado</option>
                            <option value="S">Domingo</option>
                        </select>

                        <p style={{ width: "auto", position: "relative", left: "4vw" }}>Car</p>
                        <select className="input select-input" style={{ width: "12vw", position: "relative", left: "4vw" }} name="Car" onChange={this.handleChangeCar}>
                            <option value="Si" >Si</option>
                            <option value="No" >No</option>
                        </select>
                    </div>
                    {
                        errorMessage ?
                            <span> {errorMessage}</span>
                            :
                            <></>
                    }

                    {

                        !this.state.showLink ?

                            <button className="button" type="submit" value="Signup">Publicar trayecto</button>
                            :
                            <>
                                <h3>Tu trayecto ha sido actualizado correctamente</h3>
                                <Link className="button" to="/userprofile">Ir al perfil</Link>
                            </>

                    }
                </form>
            </div>
        );
    }
}

export default CreateRide;
