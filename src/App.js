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
import UserProfile from "./components/PrivatePages/Profile/UserProfile"
import CreateRide from './components/PrivatePages/Rides/CreateRide';
import FindRide from './components/PrivatePages/Rides/FindRide';
import OtherProfile from './components/PrivatePages/Profile/OtherProfile';
import EditRide from './components/PrivatePages/Rides/EditRide';

export default class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/userprofile" component={UserProfile} />
          <PrivateRoute exact path="/createRide" component={CreateRide} />
          <PrivateRoute exact path="/editRide/:rideId" component={EditRide} />
          <PrivateRoute exact path="/findRide" component={FindRide} />
          <PrivateRoute exact path="/user/:theOtherUserId" component={OtherProfile} />
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

        </Switch>

      </AuthProvider>
    )
  }
}
