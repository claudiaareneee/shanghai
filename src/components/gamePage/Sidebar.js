import React from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import PlayerBucket from "./PlayerBucket";

function Sidebar({
  players,
  cardsOnTable,
  onCardClicked,
  onDropdownClicked,
  turn,
}) {
  console.log("players:");
  console.log(players);
  console.log(cardsOnTable);
  return (
    <div className="Sidebar">
      <h3 className="Title">Players</h3>
      {Object.keys(players).map((key) => (
        <PlayerBucket
          key={key}
          turn={turn}
          player={players[key]}
          cards={cardsOnTable[key]}
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
  cardsOnTable: PropTypes.object,
};

Sidebar.defaultProps = {
  onCardClicked: () => {},
  onDropdownClicked: () => {},
  cardsOnTable: {},
};

export default Sidebar;
