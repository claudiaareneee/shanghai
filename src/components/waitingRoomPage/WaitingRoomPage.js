import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import PlayerList from "./PlayerList";
import { Button, Col, Row } from "react-bootstrap";
import "./WaitingRoomPage.css";

function WaitingRoomPage(props) {
  const [room, setRoom] = useState(localStorage.getItem("room") || "");

  useEffect(() => {
    localStorage.setItem("room", room);
  }, [room]);

  return (
    <div className="WaitingRoom">
      <Header />
      <h2>Room code: {room}</h2>
      <Row className="PlayerList justify-content-center">
        <Col md="auto" className="w-50">
          <h4>Players</h4>
          <PlayerList />
          <p>Waiting for others to join...</p>
          <Button className="float-right">Everybody's in!</Button>
        </Col>
      </Row>
    </div>
  );
}

export default WaitingRoomPage;
