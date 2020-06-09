import React, { useState, useEffect } from "react";
import { getGameById } from "../api/gameApi";
import PlayerHand from "./PlayerHand";
import DiscardPile from "./DiscardPile";
import DrawPile from "./DrawPile";
import "../styles/CardTable.css";
import { Row, Col, Button } from "react-bootstrap";

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

function BuyBlock() {
  return (
    <Row className="BuyBlock">
      <Button variant="outline-success" size="lg">
        BUYYY
      </Button>
    </Row>
  );
}

function CardTable(params) {
  const [game, setGame] = useState({
    discard: [],
    draw: [],
  });

  useEffect(() => {
    getGameById(23421).then((_game) => {
      setGame(_game);
    });
  }, []);

  return (
    <div className="CardTable">
      <GameInformationBlock />
      <Row className="PilesBlock">
        <DiscardPile cards={game.discard} />
        <DrawPile cards={game.draw} />
      </Row>
      <PlayerHand />
      <BuyBlock />
    </div>
  );
}

export default CardTable;
