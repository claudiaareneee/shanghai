import React, { useState, useEffect } from "react";
import { getGameById } from "../api/gameApi";
import { getPlayerById } from "../api/playerApi";
import "../styles/CardTable.css";
import { Row, Col, Button } from "react-bootstrap";
import CardSet from "./CardSet";

function CardTable(props) {
  const [game, setGame] = useState({
    discard: [],
    draw: [],
  });

  const [player, setPlayer] = useState({ cards: [] });

  useEffect(() => {
    getGameById(23421).then((_game) => {
      setGame(_game);
    });
  }, []);

  useEffect(() => {
    getPlayerById(43521).then((_player) => setPlayer(_player));
  }, []);

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
          <CardSet cards={game.discard} useStyle="discardStyle" />
        </Col>
        <Col>
          <CardSet cards={game.draw} useStyle="drawStyle" />
        </Col>
      </Row>

      <Row className="PlayerHand">
        <CardSet cards={player.cards} useStyle="fanStyle" />
      </Row>

      <Row className="BuyBlock">
        <Button variant="outline-success" size="lg">
          BUYYY
        </Button>
      </Row>
    </div>
  );
}

export default CardTable;
