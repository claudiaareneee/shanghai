import React from "react";
import "./Sidebar.css";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import PlayerBucket from "./PlayerBucket";

function Sidebar({ players, onCardClicked }) {
  return (
    <Container className="Sidebar">
      <h3 className="Title">Players</h3>
      {players.map((player) => (
        <PlayerBucket
          key={player.id}
          player={player}
          onCardClicked={onCardClicked}
        />
      ))}
    </Container>
  );
}

Sidebar.propTypes = {
  players: PropTypes.array.isRequired,
  onCardClicked: PropTypes.func,
};

Sidebar.defaultProps = {
  onCardClicked: () => {},
};

export default Sidebar;
