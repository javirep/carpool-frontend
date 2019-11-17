import React, { Component } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

class CreateRide extends Component {
    state = {
        departureTime: "",
        departureZip: "",
        departurePlace: "",
        arrivalTime: "",
        arrivalZip: "",
        arrivalPlace: "",
        frequency: "L-V",
        car: true,
        validForm: false,
        showLink: false
    };

    handleFormSubmit = async event => {
        console.log(this.state)
        event.preventDefault();
        const { departureTime, departureZip, departurePlace, arrivalTime, arrivalZip, arrivalPlace, frequency, car, validForm } = this.state;

        if (departureTime && departureZip && departurePlace && arrivalTime && arrivalZip && arrivalPlace && frequency) {
            this.setState({
                validForm: true
            })
        }

        if (validForm === true) {
            const apiCaller = axios.create({
                baseURL: "http://localhost:4000/",
                withCredentials: true
            })
            await apiCaller.post("ride/", ({ departureTime, departureZip, departurePlace, arrivalTime, arrivalZip, arrivalPlace, frequency, car }));
            this.setState({
                showLink: true
            })
            this.setState({
                departureTime: "",
                departureZip: "",
                departurePlace: "",
                arrivalTime: "",
                arrivalZip: "",
                arrivalPlace: "",
                frequency: "L-V",
                car: true,
                validForm: false,
            })
        }

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
        const { departureTime, departureZip, departurePlace, arrivalTime, arrivalZip, arrivalPlace, frequency } = this.state;
        return (
            <div>
                <form className="form" onSubmit={this.handleFormSubmit}>
                    <h2>Crea tu trayecto</h2>
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
                        <input style={{ width: "12vw", position: "relative", left: "2.6vw" }} type="number" name="departureTime" placeholder="9.00?" value={departureTime} onChange={this.handleChange} />

                        <p style={{ width: "auto", position: "relative", left: "4vw" }}>Hora de llegada</p>
                        <input style={{ width: "12vw", position: "relative", left: "4vw" }} type="number" name="arrivalTime" placeholder="9.30?" value={arrivalTime} onChange={this.handleChange} />
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


                    <button className="button" type="submit" value="Signup">Ofrecer trayecto</button>
                    {
                        this.state.showLink ? (
                            <>
                                <p>Muchas gracias por ofrecer tu trayecto! Puedes verlo en tu perfil:</p>
                                <Link to="/userprofile">Ir al perfil</Link>
                            </>
                        ) : <></>
                    }
                </form>
            </div>
        );
    }
}

export default CreateRide;
