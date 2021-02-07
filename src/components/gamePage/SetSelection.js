import React from "react";
import PropTypes from "prop-types";
import {
  GROUP_1_COLOR,
  GROUP_2_COLOR,
  GROUP_3_COLOR,
  DISCARD_COLOR,
} from "../common/Constants";

function LayDownSelectionButtonGroup({ hand, onSelectionButtonClicked }) {
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
          onClick={() => {
            onSelectionButtonClicked(selectionColors[index]);
          }}
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
    </>
  );
}

function SetSelection({ hand, laidDown, onSelectionButtonClicked }) {
  return (
    <>
      {laidDown ? (
        <LayDownSelectionButtonGroup
          hand={hand}
          onSelectionButtonClicked={onSelectionButtonClicked}
        />
      ) : (
        <></>
      )}
      <button
        className="btn btn-warning"
        onClick={() => {
          onSelectionButtonClicked(DISCARD_COLOR);
        }}
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
