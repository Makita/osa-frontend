/* eslint-disable no-invalid-this */
// @flow
import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader";

import Navbar from "Components/Navbar/navbar";

import Splash from "Components/Splash/splash";
import Info from "Components/Info/info";
import Services from "Components/Services/services";
import Footer from "Components/Footer/footer";

import AppointmentForm from "Components/AppointmentForm/appointment-form";
import AppointmentDetails from "Components/AppointmentDetails/appointment-details";

import style from './app.scss';

const Main = () => {
  return (
    <Fragment>
      <Splash />
      <Info />
      <Services />
    </Fragment>
  );
}

class App extends Component {
  state = {
    // The last appointment created using AppointmentForm; used for /details
    createdAppointment: {}
  }

  setCreatedAppointment = (appointment) => {
    this.setState({
      createdAppointment: appointment
    })
  }

  render() {
    const { createdAppointment } = this.state;

    return (
      <Fragment>
        <div id={style.container}>
          <Navbar />
          <Switch>
            <Route exact path="/book" render={() => <AppointmentForm setCreatedAppointment={this.setCreatedAppointment} />} />
            <Route exact path="/details" render={() => <AppointmentDetails appointment={createdAppointment} />} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default hot(module)(App); // eslint-disable-line no-undef