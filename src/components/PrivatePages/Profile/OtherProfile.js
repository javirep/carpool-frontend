import React, { Component } from 'react'
import axios from "axios";
import { withAuth } from '../../../lib/AuthProvider';
import Ride from "./Ride"
import ProfileNotification from "./ProfileNotification"

class OtherProfile extends Component {

    state = {
        theOtherUser: {},
        notificationMessage: "",
        notificationSuccesfull: false
    }

    async componentDidMount() {
        const apiCall = axios.create({
            baseURL: "http://localhost:4000/user/",
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
            baseURL: "http://localhost:4000/",
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
        const flex = {
            display: "flex",
        }

        return (
            <div style={flex}>
                <div>
                    <h2>{theOtherUser.name}</h2>
                    <p className="button" onClick={(() => this.toggleNotifications())}>
                        {
                            this.state.displayNotifications ? "Ver Trayectos" : "Enviar Notificación"
                        }
                    </p>
                </div>

                <div>
                    {
                        this.state.displayNotifications ? (
                            <>
                                <h2>Escribe una notificación</h2>

                                <form>
                                    <input type="textArea" onChange={(e) => this.handleChange(e)} name="notificationMessage" value={this.state.notificationMessage} />
                                    {
                                        this.state.notificationSuccesfull ?
                                            <p> Tu notifiación se ha enviado correctamente</p>
                                            :
                                            <button type="Submit" onClick={(e) => this.sendMessage(e)}>Enviar mensaje</button>

                                    }
                                </form>
                            </>
                        )
                            :
                            (
                                <>
                                    <h2>Trayectos de {theOtherUser.name}</h2>
                                    {/* {
                                        theOtherUser.rides.length === 0 ?
                                            <p>Este usuario no tiene ningún trayecto</p>
                                            : (
                                                theOtherUser.rides.map((ride, index) => {
                                                    console.log(ride)
                                                    return <Ride key={index} index={index} ride={ride} />
                                                })
                                            )

                                    } */}

                                </>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default withAuth(OtherProfile) 
