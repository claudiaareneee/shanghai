import React from "react";
import PlayingCard from "./PlayingCard";
import PropTypes from "prop-types";
import * as constants from "./Constants";

function CardStack({
  numberOfCardsInDeck,
  numberOfCards,
  association,
  source,
  highlight,
  onCardClicked,
  onCardHovered,
  onDragStart,
}) {
  const offset = -1 * Math.floor(numberOfCards / 2.0);
  const numberOfBottomCards = numberOfCards - 1;
  const containerHeight =
    constants.CARDSTACK_STRETCH_Y * numberOfBottomCards + 10;

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

  return numberOfCards > 0 ? (
    <div style={style}>
      {[...Array(numberOfBottomCards)].map((_, index) => (
        <PlayingCard
          key={index}
          id={index}
          xTranslation={constants.CARDSTACK_STRETCH_X * (index + offset)}
          yTranslation={constants.CARDSTACK_STRETCH_Y * index}
          source={source}
          association={association}
          onDragStart={onDragStart}
        />
      ))}
      <PlayingCard
        key={numberOfBottomCards}
        id={numberOfCardsInDeck}
        xTranslation={
          constants.CARDSTACK_STRETCH_X * (numberOfBottomCards + offset)
        }
        yTranslation={constants.CARDSTACK_STRETCH_Y * numberOfBottomCards}
        source={source}
        onCardHovered={onCardHovered}
        onCardClicked={onCardClicked}
        highlight={highlight === numberOfCardsInDeck}
        association={association}
        onDragStart={onDragStart}
      />
    </div>
  ) : (
    <div style={style}>
      <PlayingCard
        id={0}
        xTranslation={
          constants.CARDSTACK_STRETCH_X * (numberOfBottomCards + offset)
        }
        yTranslation={constants.CARDSTACK_STRETCH_Y * numberOfBottomCards}
        source={"placeholder"}
        association={association}
        onDragStart={onDragStart}
      />
    </div>
  );
}

CardStack.propTypes = {
  numberOfCards: PropTypes.number,
  onCardClicked: PropTypes.func,
  source: PropTypes.string,
};

CardStack.defaultProps = {
  numberOfCards: PropTypes.number,
  onTopCardClicked: () => {},
  source: "front",
  association: { location: "draw" },
};

export default CardStack;
