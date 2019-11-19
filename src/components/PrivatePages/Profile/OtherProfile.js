import React, { Component } from 'react'
import axios from "axios";
import { withAuth } from '../../../lib/AuthProvider';
import Ride from "./Ride"

class OtherProfile extends Component {

    state = {
        theOtherUser: null,
        notificationMessage: "",
        notificationSuccesfull: false
    }

    async componentDidMount() {
        const apiCall = axios.create({
            baseURL: `${process.env.REACT_APP_API_URI}/user/`,
            withCredentials: true
        })
        const { theOtherUserId } = this.props.match.params
        const response = await apiCall.get(theOtherUserId)
        this.setState({
            theOtherUser: response.data
        })
    }

    toggleNotifications() {
        this.setState({
            displayNotifications: !this.state.displayNotifications
        })
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    async sendMessage(event) {
        event.preventDefault()
        const { notificationMessage, theOtherUser } = this.state

        /* console.log(notificationMessage)
        console.log(theOtherUser._id) */

        const apiCall = axios.create({
            baseURL: `${process.env.REACT_APP_API_URI}`,
            withCredentials: true
        })
        await apiCall.post("notification/", ({ "message": notificationMessage, "receiverId": theOtherUser._id }))
        this.setState({
            notificationMessage: "",
            notificationSuccesfull: true
        })

    }

    render() {

        const { theOtherUser } = this.state;

        return (
            <div className="main-profile-container">
                {
                    !theOtherUser ?
                        <p>loading...</p>
                        :
                        <>
                            <section className="profile-section profile-user-info">
                                <h2>{theOtherUser.name} {theOtherUser.lastName}</h2>
                                <p className="button" onClick={(() => this.toggleNotifications())}>
                                    {
                                        this.state.displayNotifications ? "Ver Trayectos" : "Enviar Notificación"
                                    }
                                </p>
                            </section>

                            <div>
                                {
                                    this.state.displayNotifications ? (
                                        <section className="profile-section profile-notifications-section">
                                            <h2>Escribe una notificación</h2>

                                            <form className="seding-notification-form">
                                                <textarea onChange={(e) => this.handleChange(e)} name="notificationMessage" value={this.state.notificationMessage} />

                                                {
                                                    this.state.notificationSuccesfull ?
                                                        <p style={{ fontSize: "16px" }}>Tu notifiación se ha enviado correctamente</p>
                                                        :
                                                        <button className="button" type="Submit" onClick={(e) => this.sendMessage(e)}>Enviar Notificación</button>

                                                }
                                            </form>
                                        </section>
                                    )
                                        :
                                        (
                                            <section className="profile-section profile-rides-section">
                                                <h2>Trayectos de {theOtherUser.name} ({theOtherUser.rides.length})</h2>
                                                <div className="profile-rides-div">
                                                    {
                                                        theOtherUser.rides.length === 0 ?
                                                            <p>Este usuario no tiene ningún trayecto</p>
                                                            : (
                                                                theOtherUser.rides.map((ride, index) => {
                                                                    console.log(ride)
                                                                    return <Ride key={index} index={index} ride={ride} />
                                                                })
                                                            )

                                                    }
                                                </div>

                                            </section>
                                        )
                                }
                            </div>
                        </>
                }


            </div>
        )
    }
}

export default withAuth(OtherProfile) 
