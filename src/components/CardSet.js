import React from "react";
import "../styles/CardSet.css";
import PlayingCard from "./PlayingCard";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";

function CardSet({ onCardClicked, cards, useStyle }) {
  const offset = Math.floor(cards.length / 2.0);
  const className = `CardSet ${useStyle}`;

  return (
    <div className={className}>
      <Row>
        {cards.map((card, index) => (
          <PlayingCard
            key={card}
            id={card}
            onCardClicked={onCardClicked}
            offset={index - offset}
            useStyle={useStyle}
          ></PlayingCard>
        ))}
      </Row>
    </div>
  );
}

CardSet.propTypes = {
  onCardClicked: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.number).isRequired,
  useStyle: PropTypes.string,
};

CardSet.defaultProps = {
  onCardClicked: () => {},
  useStyle: "fanStyle",
};

export default CardSet;
