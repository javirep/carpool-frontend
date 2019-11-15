import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { withAuth } from "../lib/AuthProvider"

class Navbar extends Component {

    callLogOut() {
        this.props.logout()
    }


    render() {

        const { user, isLoggedIn } = this.props;
        return (
            <nav className="Navbar">
                <Link to="/">
                    <img src="./images/logo.png" alt="logo" />
                </Link>
                {
                    isLoggedIn ?
                        (<ul>
                            <li>Buscar Trayecto</li>
                            <li>Ofrecer Trayecto</li>
                            <li><a href="/" onClick={() => this.callLogOut()}>Log Out</a></li>
                            <li><Link to="/userprofile">Hi {user.name}</Link></li>
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