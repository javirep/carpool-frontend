import React from 'react'

export default function ProfileNotification(props) {
    return (
        <div className="notification-card">
            <div>
                <h2>{props.notification.creator.name} {props.notification.creator.lastName}</h2>
                <p>{props.notification.message}</p>
                <p>{props.notification.date}</p>
            </div>
            <p><i className="fas fa-trash" onClick={() => props.deleteNotification(props.notification._id)}></i></p>
        </div>
    )
}
