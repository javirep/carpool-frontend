import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { withAuth } from "../lib/AuthProvider"
import logo from "./logo.png"
import axios from "axios"

class Navbar extends Component {

    state = {
        user: null
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
    }

    callLogOut() {
        this.props.logout()
    }


    render() {

        const { user } = this.props;

        return (
            <nav className="Navbar">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                {
                    user ?
                        (<ul>
                            <li><Link to="/findRide"> Buscar Trayecto</Link></li>
                            <li><Link to="/createRide"> Publicar Trayecto</Link></li>
                            <li><Link to="/" onClick={() => this.callLogOut()}>Log Out</Link></li>
                            <li><Link to="/userprofile"> Hi {user.name}  </Link></li>
                        </ul>)
                        :
                        (<ul>
                            <li><Link to="/createRide"> Publicar Trayecto</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/login">Log In</Link></li>
                        </ul>)

                }
            </nav>
        )
    }
}

export default withAuth(Navbar)