import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./custom.scss";
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { testGameApi, testPlayerApi, createGame } from "./api/testApi";

// testGameApi();
// testPlayerApi();

createGame({ name: "Ginny", score: 0 })
  .then((result) => {
    console.log(result);
    createGame({ name: "Harry", score: 0 }, result.id)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  })
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
