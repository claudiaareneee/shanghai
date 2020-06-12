import React from "react";
import "./CardTable.css";
import { Row, Col, Button } from "react-bootstrap";
import CardSet from "../common/CardSet";
import PropTypes from "prop-types";

function CardTable(props) {
  return (
    <div className="CardTable">
      <Row className="GameInformationBlock">
        <Col>
          Score: 120
          <br /> Hand: 1 run, 2 books
        </Col>
      </Row>
      <Row className="PilesBlock">
        <Col>
          <CardSet cards={props.game.discard} useStyle="discardStyle" />
        </Col>
        <Col>
          <CardSet cards={props.game.draw} useStyle="drawStyle" />
        </Col>
      </Row>

      <Row className="PlayerHand">
        <CardSet cards={props.player.cards} useStyle="fanStyle" />
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
  game: PropTypes.shape({ discard: PropTypes.array, draw: PropTypes.array })
    .isRequired,
  player: PropTypes.shape({ cards: PropTypes.array }).isRequired,
};

export default CardTable;
