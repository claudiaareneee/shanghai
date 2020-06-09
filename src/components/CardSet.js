import React from "react";
import "../styles/CardSet.css";
import PlayingCard from "./PlayingCard";
import { Col, Row } from "react-bootstrap";

function CardSet({ onCardClicked, cardsInDeck, useStyle }) {
  const offset = Math.floor(cardsInDeck.length / 2.0);
  const className = `CardSet ${useStyle}`;

  return (
    <div className={className}>
      <Row>
        {cardsInDeck.map((card, index) => (
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

export default CardSet;
