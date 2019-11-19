import React from 'react'
import { Link } from "react-router-dom"
import moment from "moment"
moment.locale("es")

export default function Ride(props) {
    const { user } = props.ride
    return (
        <div className="ride-card">
            <div>
                <h2>{user.name} {user.lastName}</h2>
                <p> <b>Salida</b> {props.ride.departure.departurePlace} a las {props.ride.departure.departureTime} h</p>
                <p> <b>Llegada</b> {props.ride.arrival.arrivalPlace}a las  {props.ride.arrival.arrivalTime} h</p>
                <p><b>Frecuencia</b> {props.ride.frequency}</p>
                {
                    props.ride.car ?
                        <p>Con coche <i class="fas fa-car"></i></p>
                        :
                        <p>Sin coche <i class="fas fa-shoe-prints"></i></p>
                }
                {
                    props.ride.updated_at ?
                        <p>Publicado {moment(props.ride.updated_at).fromNow()}</p> : <p>Publicado {moment(props.ride.created_at).fromNow()}</p>
                }
            </div>

            <Link to={`/user/${user._id}`} className="button">Ver perfil</Link>
        </div>
    )
}
