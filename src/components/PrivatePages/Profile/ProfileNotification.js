import React from 'react'
import moment from "moment"
import "moment/locale/es"
moment.locale("es")

export default function ProfileNotification(props) {
    return (
        <div className="notification-card">
            <div>
                <h2>{props.notification.creator.name} {props.notification.creator.lastName}</h2>
                <p>{props.notification.message}</p>
                <p>{moment(props.notification.date).fromNow()}</p>
            </div>
            <p><i className="fas fa-trash" onClick={() => props.deleteNotification(props.notification._id)}></i></p>
        </div>
    )
}
