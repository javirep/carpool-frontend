import React, { Component } from 'react'
import axios from "axios";
import { withAuth } from '../../../lib/AuthProvider';
import Ride from "./Ride"
import ProfileNotification from "./ProfileNotification"
import { Link } from "react-router-dom"

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
        this.setState({
            notifications: everyNotification.data
        })
        console.log("Finished mounting the Profile")
    }

    async toggleNotifications() {
        this.setState({
            displayNotifications: !this.state.displayNotifications
        })

        if (this.props.user.newNotification) {
            const apiCall = axios.create({
                baseURL: "http://localhost:4000/",
                withCredentials: true
            })
            await apiCall.post("notification/notificationSeen")
            this.props.user.newNotification = false
        }
    }

    render() {

        const { user } = this.props;
        const flex = {
            display: "flex",
        }
        const redNotification = {
            display: "flex",
            alignItems: "center",
        }

        return (
            <div style={flex}>
                <div>
                    <h2>{user.name}</h2>
                    <p className="button" onClick={(() => this.toggleNotifications())}>
                        {
                            this.state.displayNotifications ? "Ver Trayectos" : (
                                <>
                                    <span style={redNotification}>Ver Notificaciones
                                    {user.newNotification ?
                                            <div className="red-ball"></div>
                                            :
                                            <></>

                                        }
                                    </span>
                                </>
                            )
                        }
                    </p>
                </div>

                <div>
                    {
                        this.state.displayNotifications > 0 ? (
                            <>
                                <h2>Tus Notifiaciones</h2>
                                {
                                    this.state.notifications.length > 0 ?
                                        (
                                            this.state.notifications.map((notification, index) => {
                                                return <ProfileNotification key={index} notification={notification} />
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
                                        user.rides.length === 0 ?
                                            <Link to="/createRide">Create a new ride!</Link>
                                            : (
                                                user.rides.map((ride, index) => {
                                                    console.log(ride)
                                                    return <Ride key={index} index={index} ride={ride} />
                                                })
                                            )

                                    }

                                </>
                            )
                    }
                </div>
            </div >
        )
    }
}

export default withAuth(UserProfile) 
