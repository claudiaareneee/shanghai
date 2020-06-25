import React from "react";
import "./CardTable.css";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import CardSet from "../common/CardSet";
import CardDiscard from "../common/CardDiscard";
import CardStack from "../common/CardStack";
import Buys from "./Buys";

function CardTable({
  discard,
  numberOfDrawCards,
  playerCards,
  onPlayerCardClicked,
  onPlayerCardHovered,
  hand,
  numberOfBuys,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  return (
    <div className="CardTable sticky-top">
      <Row className="GameInformationBlock">
        <Col>
          <h5>
            Hand: {hand.books}{" "}
            {parseInt(hand.books, 10) === 1 ? "book" : "books"}, {hand.runs}{" "}
            {parseInt(hand.runs, 10) === 1 ? "run" : "runs"}
          </h5>
        </Col>
      </Row>
      <Row className="PilesBlock">
        <Col sm>
          <CardDiscard
            cards={discard}
            source="front"
            onCardClicked={() => {
              console.log("yay!");
            }}
          />
        </Col>
        <Col className="justify-content-center align-self-center">
          <CardStack
            numberOfCards={numberOfDrawCards}
            source="back"
            onTopCardClicked={() => {
              console.log("Top Card Clicked");
            }}
          />
        </Col>
      </Row>

      <Row className="PlayerHand">
        <CardSet
          cards={playerCards}
          source="front"
          onCardClicked={onPlayerCardClicked}
          onCardHovered={onPlayerCardHovered}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      </Row>

      <Buys
        numberOfBuys={numberOfBuys}
        onClick={() => {
          console.log("BUYY!");
        }}
      />
    </div>
  );
}

CardTable.propTypes = {
  discard: PropTypes.array.isRequired,
  numberOfDrawCards: PropTypes.number.isRequired,
  playerCards: PropTypes.array.isRequired,
  onPlayerCardClicked: PropTypes.func.isRequired,
  onPlayerCardHovered: PropTypes.func.isRequired,
  hand: PropTypes.object.isRequired,
};

export default CardTable;
