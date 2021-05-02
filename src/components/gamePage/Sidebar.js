import React from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import PlayerBucket from "./PlayerBucket";
import LogMessage from "../common/LogMessage";

function Sidebar({
  user,
  players,
  hidePlayers,
  cardsOnTable,
  turnState,
  turn,
  highlightedCard,
  lastLogMessage,
  onCardClicked,
  onDropdownClicked,
  onDragStart,
  onDrop,
  onScoreCardClicked,
  onSettingsClicked,
  onNextHandClick,
  onCardHovered,
}) {
  return (
    <div className="Sidebar">
      <h3 className="Title">Players</h3>
      <div
        className="d-flex"
        style={{
          borderBottom: ".25rem dotted black",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <div className="mr-auto p-2" style={{ textAlign: "left" }}>
          <h5 style={{ textAlign: "left" }}>Last Play:</h5>
          <LogMessage logEntry={lastLogMessage} />
        </div>
        <div className="p-2 form-inline justify-content-end align-self-start d-flex flex-nowrap">
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
            onClick={onSettingsClicked}
            title="Open settings"
          >
            <i className="fas fa-cog" aria-hidden="true"></i>
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
      {Object.keys(players).map((key) => (
        <PlayerBucket
          key={key}
          turn={turn}
          user={user}
          player={players[key]}
          hidePlayer={hidePlayers[key]}
          cards={cardsOnTable[key]}
          highlightedCard={highlightedCard}
          onCardClicked={onCardClicked}
          onDropdownClicked={onDropdownClicked}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onCardHovered={onCardHovered}
        />
      ))}
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
