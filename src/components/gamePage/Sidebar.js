import React from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import PlayerBucket from "./PlayerBucket";

function Sidebar({
  user,
  players,
  showPlayers,
  cardsOnTable,
  turnState,
  turn,
  highlightedCard,
  onCardClicked,
  onDropdownClicked,
  onDragStart,
  onDrop,
  onScoreCardClicked,
  onNextHandClick,
  onCardHovered,
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
          highlightedCard={highlightedCard}
          onCardClicked={onCardClicked}
          onDropdownClicked={onDropdownClicked}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onCardHovered={onCardHovered}
        />
      ))}
      <div className="form-inline justify-content-end">
        {turnState === "EndOfHand" ? (
          <button
            className="btn btn-success"
            onClick={onNextHandClick}
            title="Move to next hand"
          >
            shuffle <i className="fas fa-random" aria-hidden="true"></i>
          </button>
        ) : (
          <></>
        )}
        <button
          className="btn btn-info"
          style={{ float: "right", marginLeft: ".5rem" }}
          onClick={onScoreCardClicked}
          title="Open game log"
        >
          <i className="fas fa-book" aria-hidden="true"></i>
        </button>
        <button
          className="btn btn-primary"
          style={{ float: "right", margin: ".5rem" }}
          onClick={onScoreCardClicked}
          title="Open game stats"
        >
          <i className="fas fa-info-circle" aria-hidden="true"></i>
        </button>
      </div>
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
