import React from 'react'

export default function Ride(props) {
    return (
        <div>
            <h2>viaje {props.index + 1}</h2>
            <p>de: {props.ride.departure.departurePlace}, {props.ride.departure.departureZip} at {props.ride.departure.departureTime}</p>
            <p>a: {props.ride.arrival.arrivalPlace}, {props.ride.arrival.arrivalZip} at {props.ride.arrival.arrivalTime}</p>
            <p>frecuencia: {props.ride.frequency}</p>
        </div>
    )
}
