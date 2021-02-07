import React from "react";
import PropTypes from "prop-types";
import {
  GROUP_1_COLOR,
  GROUP_2_COLOR,
  GROUP_3_COLOR,
} from "../common/Constants";

function LayDownSelectionButtonGroup({ hand, onClick, onLayDown }) {
  const buttonStrings = [];

  for (let i = 0; i < hand.books; i++) buttonStrings.push("book");
  for (let i = 0; i < hand.runs; i++) buttonStrings.push("run");

  const selectionColors = [GROUP_1_COLOR, GROUP_2_COLOR, GROUP_3_COLOR];

  return (
    <>
      {buttonStrings.map((_, index) => (
        <button
          className="btn"
          key={index}
          onClick={() => onClick(buttonStrings[index], selectionColors[index])}
          style={{
            marginRight: ".5rem",
            backgroundColor: "#" + selectionColors[index],
            display: "inline",
          }}
          name={buttonStrings + index}
        >
          Select {buttonStrings[index]} {index + 1}
        </button>
      ))}
      <button
        className="btn btn-primary"
        onClick={onLayDown}
        style={{
          marginRight: ".5rem",
          display: "inline",
        }}
        name="Play"
      >
        Lay down cards
      </button>
    </>
  );
}

function SetSelection({ hand, laidDown, onClick, onLayDown }) {
  return (
    <>
      {laidDown ? (
        <LayDownSelectionButtonGroup
          hand={hand}
          onClick={onClick}
          onLayDown={onLayDown}
        />
      ) : (
        <></>
      )}
      <button
        className="btn btn-warning"
        onClick={() => {}}
        style={{
          marginRight: ".5rem",
          display: "inline",
        }}
        name="SelectDiscard"
      >
        Select Discard
      </button>
    </>
  );
}

SetSelection.propTypes = {
  hand: PropTypes.object,
  onClick: PropTypes.func,
  onLayDown: PropTypes.func,
};

SetSelection.defaultProps = {
  hand: { books: 0, runs: 0 },
  onClick: () => {},
  onLayDown: () => {},
};

export default SetSelection;
