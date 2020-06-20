import React from "react";
import PlayingCard from "./PlayingCard";
import PropTypes from "prop-types";
import * as constants from "./Constants";

function CardSlide({ cards, source, onCardClicked }) {
  const offset = -1 * Math.floor(cards.length / 2.0);
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
      {cards.map((card, index) => (
        <PlayingCard
          key={card}
          id={card}
          xTranslation={constants.CARDSLIDE_STRETCH_X * (index + offset)}
          source={source}
          onCardClicked={onCardClicked}
        />
      ))}
    </div>
  );
}

CardSlide.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.number),
  onCardClicked: PropTypes.func,
  source: PropTypes.string,
};

CardSlide.defaultProps = {
  cards: PropTypes.arrayOf(PropTypes.number),
  onCardClicked: () => {},
  source: "front",
};

export default CardSlide;
