import './App.css';
import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom"
import AuthProvider from "./lib/AuthProvider"

import AnonRoute from "./components/AnonRoute"
import PrivateRoute from "./components/PrivateRoute"

import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Signup from "./components/AuthPages/Signup"
import Login from "./components/AuthPages/Login"
import UserProfile from "./components/PrivatePages/UserProfile"

export default class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/userprofile" component={UserProfile} />
          <AnonRoute path="/signup" component={Signup} />
          <AnonRoute path="/login" component={Login} />
        </Switch>

      </AuthProvider>
    )
  }
}
