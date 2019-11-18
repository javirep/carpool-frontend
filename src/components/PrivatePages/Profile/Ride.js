import React, { Component } from 'react'
import { withAuth } from '../../../lib/AuthProvider'
import { Link } from "react-router-dom"

class Ride extends Component {



    render() {
        const { props } = this
        return (
            <div>
                <div className="ride-card" style={{ width: "400px" }}>
                    <div>
                        <h2>Trayecto {props.index + 1}</h2>
                        <p><b>Salida</b> {props.ride.departure.departurePlace}, {props.ride.departure.departureZip} a las {props.ride.departure.departureTime} h</p>
                        <p><b>Llegada</b> {props.ride.arrival.arrivalPlace}, {props.ride.arrival.arrivalZip} a las {props.ride.arrival.arrivalTime} h</p>
                        <p><b>Frecuencia</b> {props.ride.frequency}</p>
                        {
                            props.ride.car ?
                                <p>Con coche <i class="fas fa-car"></i></p>
                                :
                                <p>Sin coche <i class="fas fa-shoe-prints"></i></p>
                        }
                    </div>
                    {
                        props.myRide ?
                            <div style={{ fontSize: "20px" }}>
                                <Link to={`/editRide/${props.ride._id}`}><i className="fas fa-edit"></i></Link> <br />
                                <i style={{ marginTop: "10px" }} className="fas fa-trash" onClick={() => props.deleteRide(props.ride._id)}></i>
                            </div>
                            :
                            <></>

                    }
                </div>
            </div>
        )
    }
}

export default withAuth(Ride)