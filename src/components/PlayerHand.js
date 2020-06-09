import React, { useState, useEffect } from "react";
import { getPlayerById } from "../api/playerApi";
import CardSet from "./CardSet";
import { Row } from "react-bootstrap";

function PlayerHand() {
  const [player, setPlayer] = useState({ cards: [] });

  useEffect(() => {
    getPlayerById(43521).then((_player) => setPlayer(_player));
    console.log("here");
  }, []);

  return (
    <Row className="PlayerHand">
      <CardSet
        onCardClicked={() => {}}
        cardsInDeck={player.cards}
        useStyle="fanStyle"
      />
    </Row>
  );
}

export default PlayerHand;
