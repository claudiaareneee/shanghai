import React from "react";
import "./styles/CardTable.css";
import { Row, Col, Button } from "react-bootstrap";
import CardSet from "./CardSet";
import CardSources from "./CardSources";

function getDeck(numberOfCards, shouldShowFront) {
  let deck = [];
  for (let i = 0; i < numberOfCards; i++) {
    let frontImageSource = CardSources.fronts[i % 54];
    deck.push({
      id: i,
      shouldShowFront,
      frontImageSource,
      backImageSource: CardSources.backs[0],
    });
  }
  return deck;
}

function getDiscard() {
  return getDeck(50, true);
}

function getDraw() {
  return getDeck(50, false);
}

function getHand() {
  return getDeck(17, true);
}

function GameInformationBlock() {
  return (
    <Row className="GameInformationBlock">
      <Col>
        Score: 120
        <br /> Hand: 1 run, 2 books
      </Col>
    </Row>
  );
}

function PilesBlock() {
  return (
    <Row className="PilesBlock">
      <DiscardPile />
      <DrawPile />
    </Row>
  );
}

function HandBlock() {
  return (
    <Row className="HandBlock">
      <CardSet
        onCardClicked={() => {}}
        cardsInDeck={getHand()}
        useStyle="fanStyle"
      />
    </Row>
  );
}

function BuyBlock() {
  return (
    <Row className="BuyBlock">
      <Button variant="outline-success" size="lg">
        BUYYY
      </Button>
    </Row>
  );
}

function DiscardPile() {
  return (
    <Col>
      <CardSet
        onCardClicked={() => {}}
        cardsInDeck={getDiscard()}
        useStyle="discardStyle"
      />
    </Col>
  );
}

function DrawPile() {
  return (
    <Col>
      <CardSet
        onCardClicked={() => {}}
        cardsInDeck={getDraw()}
        useStyle="slideStyle"
      />
    </Col>
  );
}

function CardTable(params) {
  return (
    <div className="CardTable">
      <GameInformationBlock />
      <PilesBlock />
      <HandBlock />
      <BuyBlock />
    </div>
  );
}

export default CardTable;
