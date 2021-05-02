import React from "react";
import PlayingCard from "./PlayingCard";
import PropTypes from "prop-types";
import * as constants from "./Constants";

function CardSlide({
  cards,
  source,
  association,
  highlightedCard,
  onCardClicked,
  onDragStart,
  onDrop,
  onCardHovered,
}) {
  const containerHeight = constants.CARD_HEIGHT;
  const containerWidth =
    constants.CARD_WIDTH + constants.CARDSLIDE_STRETCH_X * (cards.length - 1);

  const style = {
    width: `${containerWidth}rem`,
    height: `${containerHeight}rem`,
    display: "flex",
    justifyContent: "left",
    // overflow: "hidden",
    position: "relative",
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: ".5rem",
    marginRight: ".5rem",
  };
  return (
    <div
      style={style}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
    >
      {cards.length > 0 ? (
        cards.map((card, index) => (
          <PlayingCard
            key={card}
            id={parseInt(card, 10)}
            index={index}
            xTranslation={constants.CARDSLIDE_STRETCH_X * index}
            source={source}
            association={association}
            highlight={parseInt(card, 10) === highlightedCard}
            onCardClicked={onCardClicked}
            onDrop={onDrop}
            onDragStart={onDragStart}
            onCardHovered={onCardHovered}
          />
        ))
      ) : (
        <PlayingCard id={0} source={"placeholder"} />
      )}
    </div>
  );
}

CardSlide.propTypes = {
  cards: PropTypes.array,
  onCardClicked: PropTypes.func,
  source: PropTypes.string,
  association: PropTypes.object,
};

CardSlide.defaultProps = {
  cards: [],
  onCardClicked: () => {},
  source: "front",
  association: { location: "player" },
};

export default CardSlide;
