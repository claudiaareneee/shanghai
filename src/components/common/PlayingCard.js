import React from "react";
import CardSources from "./CardSources";
import "./PlayingCard.css";
import PropTypes from "prop-types";
import * as constants from "./Constants";

function PlayingCard({
  id,
  rotation,
  xTranslation,
  yTranslation,
  transformOrigin,
  source,
  onCardClicked,
}) {
  const style = {
    WebkitTransition: "all", // note the capital 'W' here
    msTransition: "all", // 'ms' is the only lowercase vendor prefix
    height: `${constants.CARD_HEIGHT}`,
    transformOrigin: `${transformOrigin}`,
    transform: `translateX(${xTranslation}rem) translateY(${yTranslation}rem) rotate(${rotation}deg) `,
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
        onClick={onCardClicked}
      />
    </div>
  );
}

PlayingCard.propTypes = {
  id: PropTypes.number,
  rotation: PropTypes.number,
  xTranslation: PropTypes.number,
  yTranslation: PropTypes.number,
  transformOrigin: PropTypes.string,
  source: PropTypes.string,
  onCardClicked: PropTypes.func,
};

PlayingCard.defaultProps = {
  id: 0,
  rotation: 0,
  xTranslation: 0,
  yTranslation: 0,
  transformOrigin: "0% 0%",
  source: "front",
  onCardClicked: () => {},
};

export default PlayingCard;
