import React from "react";
import GamePage from "./gamePage/GamePage";
import StartPage from "./startPage/StartPage";
import WaitingRoomPage from "./waitingRoomPage/WaitingRoomPage";
import NotFoundPage from "./notFoundPage/NotFoundPage";
import { Route, Switch } from "react-router-dom";

function App(props) {
  return (
    <Switch>
      <Route exact path="/" component={StartPage} />
      <Route path="/WaitingRoom" component={WaitingRoomPage} />
      <Route path="/play" component={GamePage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default App;
