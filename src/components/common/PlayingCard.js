import React from "react";
import CardSources from "./CardSources";
import "./PlayingCard.css";
import PropTypes from "prop-types";
import * as constants from "./Constants";
import { Card } from "react-bootstrap";

function PlayingCard({
  id,
  index,
  rotation,
  xTranslation,
  yTranslation,
  transformOrigin,
  highlight,
  selected,
  selectedColor,
  source,
  onCardClicked,
  onCardHovered,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  const style = {
    WebkitTransition: "all", // note the capital 'W' here
    msTransition: "all", // 'ms' is the only lowercase vendor prefix
    height: `${constants.CARD_HEIGHT}`,
    transformOrigin: `${transformOrigin}`,
    transform: `translateX(${xTranslation}rem) translateY(${yTranslation}rem) rotate(${rotation}deg) `,
    cursor: "pointer",
  };

  const src =
    source === "placeholder"
      ? CardSources.placeholder[0]
      : source === "back"
      ? CardSources.backs[Math.floor(id / 54)]
      : CardSources.fronts[id % 54];

  return (
    <div className="PlayingCard" style={style}>
      <img
        className="CardImage"
        id={id}
        src={src}
        alt={id}
        draggable
        onClick={onCardClicked}
        onMouseOver={onCardHovered}
        onMouseOut={onCardHovered}
        onDragStart={(e) => onDragStart(e, index)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => {
          onDrop(e, index);
        }}
        // onMouseDownCapture={(event) => console.log(event.nativeEvent)}
        // onDragOver={(event) => console.log(event)}
        style={{
          border: selected ? ".5rem solid " + selectedColor : "",
          boxShadow: highlight
            ? "0rem 0rem 2rem #ffff00"
            : "0rem 0rem 1rem #282c3452",
        }}
      />
    </div>
  );
}

PlayingCard.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  rotation: PropTypes.number,
  xTranslation: PropTypes.number,
  yTranslation: PropTypes.number,
  transformOrigin: PropTypes.string,
  highlight: PropTypes.bool,
  selected: PropTypes.bool,
  selectedColor: PropTypes.string,
  source: PropTypes.string,
  boxShadow: PropTypes.string,
  onCardClicked: PropTypes.func,
  onCardHovered: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
};

PlayingCard.defaultProps = {
  id: 0,
  index: 0,
  rotation: 0,
  xTranslation: 0,
  yTranslation: 0,
  transformOrigin: "0% 0%",
  highlight: false,
  selected: false,
  selectedColor: "#EE6123",
  source: "front",
  boxShadow: "0rem 0rem 1rem #282c3452",
  onCardClicked: () => {},
  onCardHovered: () => {},
  onDragStart: () => {},
  onDragOver: () => {},
  onDrop: () => {},
};

export default PlayingCard;
