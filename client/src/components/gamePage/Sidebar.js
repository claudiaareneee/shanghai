import React from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import PlayerBucket from "./PlayerBucket";

function Sidebar({ players, onCardClicked, onDropdownClicked }) {
  return (
    <div className="Sidebar">
      <h3 className="Title">Players</h3>
      {Object.keys(players).map((key) => (
        <PlayerBucket
          key={key}
          player={players[key]}
          onCardClicked={onCardClicked}
          onDropdownClicked={onDropdownClicked}
        />
      ))}
    </div>
  );
}

Sidebar.propTypes = {
  players: PropTypes.object.isRequired,
  onCardClicked: PropTypes.func,
  onDropdownClicked: PropTypes.func,
};

Sidebar.defaultProps = {
  onCardClicked: () => {},
  onDropdownClickedL: () => {},
};

export default Sidebar;
