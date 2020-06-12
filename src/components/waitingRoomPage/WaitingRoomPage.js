import React from "react";
import { Jumbotron } from "react-bootstrap";

function WaitingRoomPage(props) {
  return (
    <Jumbotron className="Header">
      <h1>Shanghai</h1>
      <p>Waiting for other players to join....</p>
    </Jumbotron>
  );
}

export default WaitingRoomPage;
