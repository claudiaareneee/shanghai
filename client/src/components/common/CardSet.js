import React from "react";
import PlayingCard from "./PlayingCard";
import PropTypes from "prop-types";
import * as constants from "./Constants";

function CardSet({ cards, source, onCardClicked, onCardHovered }) {
  const offset = -1 * Math.floor(cards.length / 2.0);
  const containerHeight =
    0.5 * constants.CARD_WIDTH + constants.CARD_HEIGHT + 1;

  const style = {
    width: "100%",
    height: `${containerHeight}rem`,
    display: "flex",
    justifyContent: "center",
    // overflow: "hidden",
    position: "relative",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  return (
    <div style={style}>
      {cards.map((card, index) => (
        <PlayingCard
          key={card.id}
          id={card.id}
          index={index}
          xTranslation={constants.CARDSET_STRETCH_X * (index + offset)}
          yTranslation={1}
          rotation={(180 / cards.length) * (index + offset)}
          transformOrigin="50% 100%"
          source={source}
          onCardClicked={onCardClicked}
          onCardHovered={onCardHovered}
          boxShadow={
            card.highlight
              ? "0rem 0rem 2rem #ffff00"
              : "0rem 0rem 1rem #282c3452"
          }
        />
      ))}
    </div>
  );
}

CardSet.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.number),
  onCardClicked: PropTypes.func,
  onCardHovered: PropTypes.func,
  source: PropTypes.string,
};

CardSet.defaultProps = {
  cards: PropTypes.arrayOf(PropTypes.number),
  onCardClicked: () => {},
  onCardHovered: () => {},
  source: "front",
};

export default CardSet;
