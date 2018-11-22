// @flow
import React, { Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { hot } from "react-hot-loader";

import Navbar from "Components/Navbar/navbar";

import Splash from "Components/Splash/splash";
import Info from "Components/Info/info";
import Services from "Components/Services/services";
import Footer from "Components/Footer/footer";

import AppointmentForm from "Components/AppointmentForm/appointment-form";

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

const App = () => {
  return (
    <Fragment>
      <div id={style.container}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/book" component={AppointmentForm} />
        </Switch>
      </div>
      <Footer />
    </Fragment>
  )
};

export default withRouter(hot(module)(App)); // eslint-disable-line no-undef