import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { createStore } from 'redux';
import appointments from "Reducers/appointments"; // eslint-disable-line import/no-unresolved

import App from "./app";

// eslint-disable-next-line import/prefer-default-export
export const ReduxContext = React.createContext(createStore(appointments));

ReactDOM.render(
  (
    <ReduxContext.Provider>
      <Router>
          <App />
      </Router>
    </ReduxContext.Provider>
  ),
  document.getElementById("root")
);