import React from "react";
import PlayingCard from "./PlayingCard";
import PropTypes from "prop-types";
import * as constants from "./Constants";

function CardDiscard({
  cards,
  source,
  highlightedCard,
  onCardHovered,
  onCardClicked,
  onDrop,
  onDragStart,
}) {
  const containerHeight = constants.CARD_WIDTH + constants.CARD_HEIGHT;

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
      <PlayingCard
        id={0}
        yTranslation={0.5 * constants.CARD_WIDTH}
        transformOrigin="0% 50%"
        source={"placeholder"}
        association={{ location: "discard" }}
        onCardClicked={onCardClicked}
        onDragStart={onDragStart}
        onDrop={onDrop}
      />
      {cards.map((card, index) => (
        <PlayingCard
          key={card.id}
          id={card.id}
          yTranslation={0.5 * constants.CARD_WIDTH}
          xTranslation={0.5 * constants.CARD_WIDTH}
          rotation={card.rotation}
          transformOrigin="0% 50%"
          source={source}
          association={{ location: "discard" }}
          highlight={card.id === highlightedCard}
          onCardClicked={index === cards.length - 1 ? onCardClicked : () => {}}
          onCardHovered={index === cards.length - 1 ? onCardHovered : () => {}}
          onDragStart={onDragStart}
          onDrop={onDrop}
        />
      ))}
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
