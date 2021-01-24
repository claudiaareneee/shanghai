import React from "react";
import PlayingCard from "./PlayingCard";
import PropTypes from "prop-types";
import * as constants from "./Constants";

function CardSlide({ cards, source, association, onCardClicked, onDrop }) {
  const offset = -1 * Math.floor(cards.length / 2.0);
  const containerHeight = constants.CARD_HEIGHT;

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
    <div
      style={style}
      onDrop={(event) => {
        // debugger;
        console.log(event);
      }}
      onDragOver={(event) => event.preventDefault()}
    >
      {cards.length > 0 ? (
        cards.map((card, index) => (
          <PlayingCard
            key={card}
            id={card}
            xTranslation={constants.CARDSLIDE_STRETCH_X * (index + offset)}
            source={source}
            association={association}
            onCardClicked={onCardClicked}
            onDrop={onDrop}
          />
        ))
      ) : (
        <PlayingCard id={0} source={"placeholder"} />
      )}
    </div>
  );
}

CardSlide.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.number),
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