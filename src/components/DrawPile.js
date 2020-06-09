import React from "react";
import { Col } from "react-bootstrap";
import CardSet from "./CardSet";

function DrawPile(props) {
  return (
    <Col>
      <CardSet
        onCardClicked={() => {}}
        cardsInDeck={props.cards}
        useStyle="slideStyle"
      />
    </Col>
  );
}

export default DrawPile;
