import React from 'react'

export default function ProfileNotification(props) {
    return (
        <div>
            <h2>{props.notification.creator.name} {props.notification.creator.lastName}</h2>
            <div>
                <p>{props.notification.message}</p>
                <p>{props.notification.date}</p>
            </div>
        </div>
    )
}
