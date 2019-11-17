import React, { Component } from 'react'
import axios from "axios";
import FoundedRide from "./FoundedRide"
import { withAuth } from "../../../lib/AuthProvider"
import { Link } from "react-router-dom"

class FindRide extends Component {

    state = {
        fromFilter: "",
        toFilter: "",
        departureTimeFilter: "",
        arrivalTimeFilter: "",
        frequencyFilter: "",
        carFilter: false,
        rides: []
    }

    async componentDidMount() {
        const apiCaller = axios.create({
            baseURL: "http://localhost:4000/",
            withCredentials: true
        })
        const everyRide = await apiCaller.get("ride/everyRide");
        this.setState({
            rides: everyRide.data
        })
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        this.setState({
            rides: this.state.rides
        })
    };

    handleChangeCar = event => {
        const { value } = event.target;
        if (value === "Si") {
            this.setState({
                carFilter: true
            })
        }
        if (value === "No") {
            this.setState({
                carFilter: false
            })
        }
        if (value === "") {
            this.setState({
                carFilter: "Both"
            })
        }
    }

    filterRides = () => {
        return this.state.rides.filter(ride => {

            const containDepartureZip = ride.departure.departureZip.includes(this.state.fromFilter)
            const containArrivalZip = ride.arrival.arrivalZip.includes(this.state.toFilter)
            const containDepartureTime = ride.departure.departureTime.includes(this.state.departureTimeFilter)
            const containArrivalTime = ride.arrival.arrivalTime.includes(this.state.arrivalTimeFilter)
            const containFrequency = ride.frequency.includes(this.state.frequencyFilter)
            var containCar = false

            if (this.state.carFilter === "Both") {
                containCar = true
            } else if (this.state.carFilter === ride.car) {
                containCar = true
            }

            return (this.props.user._id !== ride.user._id && containDepartureZip && containArrivalZip && containDepartureTime && containArrivalTime && containFrequency && containCar)
        })
    }

    render() {
        const { fromFilter, toFilter, departureTimeFilter, arrivalTimeFilter, frequencyFilter } = this.state
        const filteredRides = this.filterRides()


        return (
            <div style={{ display: "flex", margin: "0 5vw" }}>
                <form className="center-form form ">
                    <h2>Filtra tu búsqueda</h2>
                    <div>
                        <p>De</p>
                        <input type="text" name="fromFilter" placeholder="Código Postal" value={fromFilter} onChange={this.handleChange} />
                    </div>

                    <div>
                        <p>A</p>
                        <input type="text" name="toFilter" placeholder="Código Postal" value={toFilter} onChange={this.handleChange} />
                    </div>

                    <div>
                        <p>Salir</p>
                        <input type="number" name="departureTimeFilter" placeholder="9.00?" value={departureTimeFilter} onChange={this.handleChange} />
                    </div>

                    <div>
                        <p>Llegar</p>
                        <input type="number" name="arrivalTimeFilter" placeholder="9.30?" value={arrivalTimeFilter} onChange={this.handleChange} />
                    </div>

                    <div>
                        <p>Frecuencia</p>
                        <select className="input select-input" name="frequencyFilter" value={frequencyFilter} onChange={this.handleChange}>
                            <option value=""> Cualquiera </option>
                            <option value="L-V">Lunes a Viernes</option>
                            <option value="V">Viernes</option>
                            <option value="S">Sabado</option>
                            <option value="S">Domingo</option>
                        </select>
                    </div>

                    <div>
                        <p>Car</p>
                        <select className="input select-input" name="CarFilter" onChange={this.handleChangeCar}>
                            <option value=""> Indiferente</option>
                            <option value="Si" >Si</option>
                            <option value="No" >No</option>
                        </select>
                    </div>
                </form>
                <div>
                    {
                        filteredRides.length > 0 ? (
                            filteredRides.map((ride, key) => {
                                return <FoundedRide key={key} index={key} ride={ride} />
                            })) : (
                                <>
                                    <p>No hay ningún trayecto que coincida, ¿podrías crear uno nuevo?</p>
                                    <Link className="button" to="createRide"> Crear Trayecto </Link>
                                </>
                            )
                    }
                </div>
            </div>
        )
    }
}


export default withAuth(FindRide)