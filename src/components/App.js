import React from "react";
import GamePage from "./gamePage/GamePage";
import StartPage from "./startPage/StartPage";
import WaitingRoomPage from "./waitingRoomPage/WaitingRoomPage";
import { Route } from "react-router-dom";

function App(props) {
  return (
    <>
      <Route exact path="/" component={StartPage} />
      <Route path="/WaitingRoom" component={WaitingRoomPage} />
    </>
  );
}

export default App;
