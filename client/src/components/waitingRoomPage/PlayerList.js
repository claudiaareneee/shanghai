import React from "react";
import { ListGroup } from "react-bootstrap";
import "./PlayerList.css";
import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";

function PlayerList({ players, onClick, gameId }) {
  return (
    <>
      <h2>Room code: {gameId}</h2>
      <Row className="PlayerList justify-content-center">
        <Col md="auto" className="w-50">
          <h4>Players</h4>
          <ListGroup>
            {players.map((player) => (
              <ListGroup.Item key={player.name} variant="info">
                {player.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <p>Waiting for others to join...</p>
          <Button className="float-right" onClick={onClick}>
            {"Everybody's in!"}
          </Button>
        </Col>
      </Row>
    </>
  );
}

PlayerList.propTypes = {
  gameId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  players: PropTypes.array,
};

PlayerList.defaultProps = {
  players: [],
};

export default PlayerList;
