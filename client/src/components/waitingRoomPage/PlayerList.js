import React from "react";
import { ListGroup } from "react-bootstrap";
import "./PlayerList.css";
import PropTypes from "prop-types";

function PlayerList({ players }) {
  return (
    <>
      <h4>Players</h4>
      <ListGroup>
        {players.map((player) => (
          <ListGroup.Item key={player.name} variant="info">
            {player.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <p>Waiting for others to join...</p>
    </>
  );
}

PlayerList.propTypes = {
  players: PropTypes.array,
};

PlayerList.defaultProps = {
  players: [],
};

export default PlayerList;
