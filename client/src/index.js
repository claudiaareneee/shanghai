import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./custom.scss";
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import * as gameApi from "./api/gameApi";

// gameApi
//   .getGames()
//   .then((res) => console.log(res))
//   .catch((error) => console.log(error));
gameApi
  .saveGame({ id: 23421, test: 35 })
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

const store = configureStore(); //pass in default values, this is good for localstorage and server rendered app

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("root")
);
