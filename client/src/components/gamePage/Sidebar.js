import React from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import PlayerBucket from "./PlayerBucket";

function Sidebar({ players, onCardClicked }) {
  return (
    <div className="Sidebar">
      <h3 className="Title">Players</h3>
      {Object.keys(players).map((key) => (
        <PlayerBucket
          key={players[key].id}
          player={players[key]}
          onCardClicked={onCardClicked}
        />
      ))}
    </div>
  );
}

Sidebar.propTypes = {
  players: PropTypes.object.isRequired,
  onCardClicked: PropTypes.func,
};

Sidebar.defaultProps = {
  onCardClicked: () => {},
};

export default Sidebar;
