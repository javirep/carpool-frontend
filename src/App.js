import './App.css';
import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom"
import AuthProvider from "./lib/AuthProvider"

import AnonRoute from "./components/AnonRoute"
import PrivateRoute from "./components/PrivateRoute"

import Navbar from "./components/Navbar"
import Signup from "./components/AuthPages/Signup"
import Login from "./components/AuthPages/Login"
import Private from "./components/PrivatePages/Private"

export default class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Navbar />
        <Switch>
          <AnonRoute path="/signup" component={Signup} />
          <AnonRoute path="/login" component={Login} />
          <PrivateRoute path="/private" component={Private} />
        </Switch>
      </AuthProvider>
    )
  }
}
