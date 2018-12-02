import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import appointments from "Reducers/appointments"; // eslint-disable-line import/no-unresolved

import App from "./app";

const mainReducer = combineReducers({ appointments });

ReactDOM.render(
  (
    <Provider store={createStore(
      mainReducer,
    )}>
      <Router>
          <App />
      </Router>
    </Provider>
  ),
  document.getElementById("root")
);