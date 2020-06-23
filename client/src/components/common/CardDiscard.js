import React from "react";
import PlayingCard from "./PlayingCard";
import PropTypes from "prop-types";
import * as constants from "./Constants";
import CardPlaceholder from "./CardPlaceholder";

function CardDiscard({ cards, source, onCardClicked }) {
  const containerHeight = constants.CARD_WIDTH + constants.CARD_HEIGHT;

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
      {cards.length > 0 ? (
        cards.map((card) => (
          <PlayingCard
            key={card.id}
            id={card.id}
            yTranslation={0.5 * constants.CARD_WIDTH}
            xTranslation={0.5 * constants.CARD_WIDTH}
            rotation={card.rotation}
            transformOrigin="0% 50%"
            source={source}
            onCardClicked={onCardClicked}
          />
        ))
      ) : (
        <CardPlaceholder />
      )}
    </div>
  );
}

CardDiscard.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      rotation: PropTypes.number.isRequired,
    }).isRequired
  ),
  onCardClicked: PropTypes.func,
  source: PropTypes.string,
};

CardDiscard.defaultProps = {
  cards: [],
  onCardClicked: () => {},
  source: "front",
};

export default CardDiscard;
