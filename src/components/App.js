import React from "react";
import { Route, Switch } from "react-router-dom";
import GamePage from "./gamePage/GamePage";
import StartPage from "./startPage/StartPage";
import WaitingRoomPage from "./waitingRoomPage/WaitingRoomPage";
import NotFoundPage from "./notFoundPage/NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route path="/WaitingRoom" component={WaitingRoomPage} />
        <Route path="/play" component={GamePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
