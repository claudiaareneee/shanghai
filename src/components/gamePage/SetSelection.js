import React from "react";
import PropTypes from "prop-types";

function SetSelection({ hand, onClick }) {
  const buttonStrings = [];

  for (let i = 0; i < hand.books; i++) buttonStrings.push("book");
  for (let i = 0; i < hand.runs; i++) buttonStrings.push("run");

  const selectionColors = ["#EE6123", "#00916E", "#FA003F"];

  return (
    <>
      {buttonStrings.map((_, index) => (
        <button
          className="btn"
          onClick={() => onClick(buttonStrings[index], selectionColors[index])}
          style={{
            marginRight: ".5rem",
            backgroundColor: selectionColors[index],
            display: "inline",
          }}
          name="Play"
        >
          Make selection {index + 1}
        </button>
      ))}
    </>
  );
}

SetSelection.propTypes = {
  hand: PropTypes.object,
  onClick: PropTypes.func,
};

SetSelection.defaultProps = {
  hand: { books: 0, runs: 0 },
  onClick: () => {},
};

export default SetSelection;
