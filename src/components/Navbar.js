import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { withAuth } from "../lib/AuthProvider"

class Navbar extends Component {
    render() {

        const { user, logout, isLoggedin } = this.props;
        return (
            <nav className="Navbar">
                <h1>Carpool</h1>
                {
                    isLoggedin ?
                        (<ul>
                            <li>Buscar Trayecto</li>
                            <li>Ofrecer Trayecto</li>
                            <li>Log out</li>
                            <li>Hi {user.name}</li>
                        </ul>)
                        :
                        (<ul>
                            <li>Ofrecer Trayecto</li>
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/login">Log In</Link></li>
                        </ul>)

                }
            </nav>
        )
    }
}

export default withAuth(Navbar)