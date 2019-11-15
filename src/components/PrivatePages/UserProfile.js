import React, { Component } from 'react'
import axios from "axios";
import { withAuth } from '../../lib/AuthProvider';
import Ride from "./Ride"

class UserProfile extends Component {

    state = {
        notifications: [],
        displayNotifications: false
    }

    async componentDidMount() {
        const apiCall = axios.create({
            baseURL: "http://localhost:4000/",
            withCredentials: true
        })
        const everyNotification = await apiCall.get("notification")
        console.log(everyNotification)
        this.setState({
            notifications: everyNotification.data
        })
    }

    toggleNotifications() {
        this.setState({
            displayNotifications: !this.state.displayNotifications
        })
    }

    render() {

        const { user } = this.props;

        const flex = {
            display: "flex",

        }

        return (
            <div style={flex}>
                <div>
                    <h2>{user.name}</h2>
                    <p className="button" onClick={(() => this.toggleNotifications())}>Ver notificaciones</p>
                </div>

                <div>
                    {
                        this.state.displayNotifications ? (
                            <>
                                <h2>Tus Notifiaciones</h2>
                                {
                                    this.state.notifications.length > 0 ?
                                        (
                                            this.state.notifications.map((notification, index) => {
                                                return <p key={index}>{notification.message}</p>
                                            })
                                        ) : (
                                            <p>You dont have any notification.</p>
                                        )

                                }

                            </>
                        )
                            :
                            (
                                <>
                                    <h2>Tus trayectos</h2>
                                    {
                                        user.rides.map((ride, index) => {
                                            return <Ride key={index} index={index} ride={ride} />
                                        })
                                    }

                                </>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default withAuth(UserProfile) 
