import React from "react";
import { Col } from "react-bootstrap";
import CardSet from "./CardSet";

function DiscardPile(props) {
  return (
    <Col>
      <CardSet
        onCardClicked={() => {}}
        cardsInDeck={props.cards}
        useStyle="discardStyle"
      />
    </Col>
  );
}

export default DiscardPile;
