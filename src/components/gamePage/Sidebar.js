import React from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import PlayerBucket from "./PlayerBucket";

function Sidebar({
  user,
  players,
  showPlayers,
  cardsOnTable,
  onCardClicked,
  onDropdownClicked,
  onDrop,
  onScoreCardClicked,
  turn,
}) {
  return (
    <div className="Sidebar">
      <h3 className="Title">Players</h3>
      {Object.keys(players).map((key) => (
        <PlayerBucket
          key={key}
          turn={turn}
          user={user}
          player={players[key]}
          showPlayer={showPlayers[key]}
          cards={cardsOnTable[key]}
          onCardClicked={onCardClicked}
          onDropdownClicked={onDropdownClicked}
          onDrop={onDrop}
        />
      ))}
      <button
        className="btn btn-primary"
        style={{ float: "right", margin: ".5rem" }}
        onClick={onScoreCardClicked}
      >
        View Game Stats
      </button>
    </div>
  );
}

Sidebar.propTypes = {
  players: PropTypes.object.isRequired,
  onCardClicked: PropTypes.func,
  onDropdownClicked: PropTypes.func,
  onDrop: PropTypes.func,
  onScoreCardClicked: PropTypes.func,
  // cardsOnTable: PropTypes.object,
};

Sidebar.defaultProps = {
  onCardClicked: () => {},
  onDropdownClicked: () => {},
  onDrop: () => {},
  onScoreCardClicked: () => {},
  // cardsOnTable: {},
};

export default Sidebar;
