import React from "react";
import PlayingCard from "./PlayingCard";
import PropTypes from "prop-types";
import * as constants from "./Constants";

function CardSet({
  cards,
  source,
  association,
  onCardClicked,
  onCardHovered,
  onDragStart,
  onDragOver,
  onDrop,
}) {
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
          association={association}
          onCardClicked={onCardClicked}
          onCardHovered={onCardHovered}
          highlight={card.highlight}
          selected={card.selected}
          selectedColor={card.selectedColor}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
}

CardSet.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardClicked: PropTypes.func,
  onCardHovered: PropTypes.func,
  source: PropTypes.string,
  association: PropTypes.object,
};

CardSet.defaultProps = {
  onCardClicked: () => {},
  onCardHovered: () => {},
  source: "front",
  association: { location: "player" },
};

export default CardSet;
