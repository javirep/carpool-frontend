import React from 'react'
import { Link } from "react-router-dom"

export default function Ride(props) {
    const { user } = props.ride
    return (
        <div className="ride-card">
            <div>
                <h2>{user.name} {user.lastName}</h2>
                <p>de: {props.ride.departure.departurePlace}, {props.ride.departure.departureZip} at {props.ride.departure.departureTime}</p>
                <p>a: {props.ride.arrival.arrivalPlace}, {props.ride.arrival.arrivalZip} at {props.ride.arrival.arrivalTime}</p>
            </div>
            <p>frecuencia: {props.ride.frequency}</p>
            <Link to={`/user/${user._id}`} className="button">Ver perfil</Link>
        </div>
    )
}
