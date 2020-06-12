import React from "react";
import Header from "../common/Header";
import PlayerList from "./PlayerList";
import { Button, Col, Row } from "react-bootstrap";
import "./WaitingRoomPage.css";

function WaitingRoomPage(props) {
  return (
    <div className="WaitingRoom">
      <Header />
      <h2>Room code: 3ab23</h2>
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
