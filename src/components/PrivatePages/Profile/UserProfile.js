import React, { Component } from 'react'
import axios from "axios";
import { withAuth } from '../../../lib/AuthProvider';
import Ride from "./Ride"
import ProfileNotification from "./ProfileNotification"
import { Link } from "react-router-dom"

class UserProfile extends Component {

  state = {
    user: null,
    notifications: [],
    displayNotifications: false
  }

  async componentDidMount() {

    const apiCall = axios.create({
      baseURL: `${process.env.REACT_APP_API_URI}`,
      withCredentials: true
    })

    const user = await apiCall.get("auth/me")

    this.setState({
      user: user.data
    })

    const everyNotification = await apiCall.get("notification")
    const orderedNotification = [...everyNotification.data].sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    console.log(orderedNotification)
    this.setState({
      notifications: orderedNotification
    })
    console.log("Finished mounting the Profile")
  }

  async toggleNotifications() {
    this.setState({
      displayNotifications: !this.state.displayNotifications
    })

    if (this.props.user.newNotification) {
      const apiCall = axios.create({
        baseURL: `${process.env.REACT_APP_API_URI}`,
        withCredentials: true
      })
      await apiCall.post("notification/notificationSeen")
      const userUpdated = await apiCall.get("auth/me")
      this.setState({
        user: userUpdated.data
      })
    }
  }

  deleteRide = async (id) => {
    const apiCall = axios.create({
      baseURL: `${process.env.REACT_APP_API_URI}`,
      withCredentials: true
    })

    await apiCall.delete(`ride/${id}`);

    const userUpdated = await apiCall.get("auth/me")

    this.setState({
      user: userUpdated.data
    })


  }

  deleteNotification = async (id) => {
    console.log("deleteNotification has been called")
    console.log(id)
    const apiCall = axios.create({
      baseURL: `${process.env.REACT_APP_API_URI}`,
      withCredentials: true
    })

    await apiCall.delete(`notification/${id}`)

    const notificationsUpdated = await apiCall.get("notification")

    console.log(notificationsUpdated.data)

    this.setState({
      notifications: notificationsUpdated.data
    })

  }

  render() {

    const { user } = this.state;

    const redNotification = {
      display: "flex",
      alignItems: "center",
    }

    return (
      <div className="main-profile-container">
        {!user ?
          <p>loading...</p>
          :
          <>
            <section className="profile-section profile-user-info">
              <img src={user.imagePath} alt="user image" style={{ width: "10vw" }} />
              <h2>{user.name} {user.lastName}</h2>
              <Link className="edit-info-link" to="/editProfileInfo">edit profile info</Link>
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
            </section>

            <>
              {
                this.state.displayNotifications > 0 ? (
                  <section className="profile-section profile-notifications-section">
                    <h2>Tus Notifiaciones ({this.state.notifications.length})</h2>
                    <div>
                      {
                        this.state.notifications.length > 0 ?
                          (
                            this.state.notifications.map((notification, index) => {
                              return <ProfileNotification key={index} notification={notification} deleteNotification={this.deleteNotification} />
                            })
                          ) : (
                            <p style={{ fontSize: "20px", textAlign: "center" }}>No tienes ninguna notificación.</p>
                          )

                      }
                    </div>
                  </section>
                )
                  :

                  <section className="profile-section profile-rides-section">
                    <h2>Tus trayectos ({user.rides.length})</h2>

                    {
                      user.rides.length === 0 ?
                        <div className="empty-info">
                          <span style={{ fontSize: "16px" }}>No tienes ningún trayecto publicado</span>
                          <Link className="button" to="/createRide">Publicar un Trayecto</Link>
                        </div>
                        : <div className="profile-rides-div">
                          {user.rides.map((ride, index) => {
                            return <Ride style={{ width: "400px" }} key={index} index={index} ride={ride} deleteRide={this.deleteRide} myRide={true} />
                          })}
                        </div>
                    }
                  </section>

              }
            </>

          </>
        }
      </div >
    )
  }
}

export default withAuth(UserProfile) 
