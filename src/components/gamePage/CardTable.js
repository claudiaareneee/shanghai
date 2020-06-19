import React from "react";
import "./CardTable.css";
import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import CardSet from "../common/CardSet";
import CardDiscard from "../common/CardDiscard";
import CardStack from "../common/CardStack";

function CardTable({ discard, numberOfDrawCards, playerCards }) {
  return (
    <div className="CardTable sticky-top">
      <Row className="GameInformationBlock">
        <Col>
          <h5>Hand: 1 run, 2 books</h5>
        </Col>
      </Row>
      <Row className="PilesBlock">
        <Col>
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
          onCardClicked={() => {
            console.log("yay!");
          }}
        />
      </Row>

      <Row className="BuyBlock">
        <Button variant="outline-success" size="lg">
          BUYYY
        </Button>
      </Row>
    </div>
  );
}

CardTable.propTypes = {
  discard: PropTypes.array.isRequired,
  numberOfDrawCards: PropTypes.number.isRequired,
  playerCards: PropTypes.array.isRequired,
};

CardTable.defaultProps = {
  onCardClicked: () => {},
};

export default CardTable;
