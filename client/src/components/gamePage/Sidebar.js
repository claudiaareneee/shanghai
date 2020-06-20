import React from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import PlayerBucket from "./PlayerBucket";

function Sidebar({ players, onCardClicked }) {
  return (
    <div className="Sidebar">
      <h3 className="Title">Players</h3>
      {players.map((player) => (
        <PlayerBucket
          key={player.id}
          player={player}
          onCardClicked={onCardClicked}
        />
      ))}
    </div>
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
