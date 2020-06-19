import React from "react";
import PlayingCard from "./PlayingCard";
import * as constants from "./Constants";

function CardPlaceholder() {
  const containerHeight = constants.CARD_HEIGHT;

  const style = {
    width: "100%",
    height: `${containerHeight}rem`,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  return (
    <div style={style}>
      <PlayingCard id={"placeholder"} source={"placeholder"} />
    </div>
  );
}

export default CardPlaceholder;
