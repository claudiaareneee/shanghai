import React from "react";
import PlayingCard from "./PlayingCard";
import PropTypes from "prop-types";
import * as constants from "./Constants";

function CardStack({ numberOfCards, source, onTopCardClicked }) {
  const offset = -1 * Math.floor(numberOfCards / 2.0);
  const numberOfBottomCards = numberOfCards - 1;
  const containerHeight =
    constants.CARDSTACK_STRETCH_Y * numberOfBottomCards + 10;

  const style = {
    width: "100%",
    height: `${containerHeight}rem`,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    margin: "1rem",
  };

  return (
    <div style={style}>
      {[...Array(numberOfBottomCards)].map((_, index) => (
        <PlayingCard
          key={index}
          id={index}
          xTranslation={constants.CARDSTACK_STRETCH_X * (index + offset)}
          yTranslation={constants.CARDSTACK_STRETCH_Y * index}
          source={source}
        />
      ))}
      <PlayingCard
        key={numberOfBottomCards}
        id={numberOfBottomCards}
        xTranslation={
          constants.CARDSTACK_STRETCH_X * (numberOfBottomCards + offset)
        }
        yTranslation={constants.CARDSTACK_STRETCH_Y * numberOfBottomCards}
        source={source}
        onCardClicked={onTopCardClicked}
      />
    </div>
  );
}

CardStack.propTypes = {
  numberOfCards: PropTypes.number,
  onTopCardClicked: PropTypes.func,
  source: PropTypes.string,
};

CardStack.defaultProps = {
  numberOfCards: PropTypes.number,
  onTopCardClicked: () => {},
  source: "front",
};

export default CardStack;
