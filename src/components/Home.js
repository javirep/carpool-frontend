import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class Home extends Component {
    render() {
        return (
            <div>
                <header><Link to="/" className="button" >Buscar Trayecto</Link></header>
            </div>
        )
    }
}
