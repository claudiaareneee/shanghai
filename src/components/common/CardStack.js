import React from "react";
import PlayingCard from "./PlayingCard";
import PropTypes from "prop-types";

function CardStack({ numberOfCards, source, onTopCardClicked }) {
  const offset = -1 * Math.floor(numberOfCards / 2.0);
  const numberOfBottomCards = numberOfCards - 1;
  const containerHeight = 0.1 * numberOfBottomCards + 10;

  const style = {
    width: "100%",
    height: `${containerHeight}rem`,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    perspective: "1000px",
  };

  return (
    <div style={style}>
      {[...Array(numberOfBottomCards)].map((_, index) => (
        <PlayingCard
          key={index}
          id={index}
          xTranslation={0.1 * (index + offset)}
          yTranslation={0.05 * index}
          source={source}
        />
      ))}
      <PlayingCard
        key={numberOfBottomCards}
        id={numberOfBottomCards}
        xTranslation={0.1 * (numberOfBottomCards + offset)}
        yTranslation={0.05 * numberOfBottomCards}
        source={source}
        onCardClicked={onTopCardClicked}
      />
    </div>
  );
}

CardStack.propTypes = {
  numberOfCards: PropTypes.number,
  onTopCardClicked: PropTypes.func,
  source: PropTypes.bool,
};

CardStack.defaultProps = {
  numberOfCards: PropTypes.number,
  onTopCardClicked: () => {},
  source: false,
};

export default CardStack;
