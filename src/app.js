// @flow
import React, { Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { hot } from "react-hot-loader";

import Navbar from "Components/Navbar/navbar";

import Splash from "Components/Splash/splash";
import Info from "Components/Info/info";
import Services from "Components/Services/services";
import Footer from "Components/Footer/footer";

import Appointment from "Components/AppointmentForm/appointment-form";

const Main = () => {
  return (
    <Fragment>
      <Splash />
      <Info />
      <Services />
    </Fragment>
  );
}

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/book" component={Appointment} />
      </Switch>
      <Footer />
    </Fragment>
  )
};

export default hot(module)(App); // eslint-disable-line no-undef