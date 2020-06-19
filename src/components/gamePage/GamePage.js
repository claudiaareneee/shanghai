// import React, { useState, useEffect } from "react";
import React from "react";
// import { getGameById } from "../../api/gameApi";
// import { getPlayerById } from "../../api/playerApi";
import "./GamePage.css";
import CardTable from "./CardTable";
import { Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

const players = [
  {
    id: 43521,
    name: "Aang",
    score: 0,
    cards: [],
    numberOfRemainingCards: 17,
    showCards: true,
  },
  {
    id: 52342,
    name: "Katara",
    score: 120,
    cards: [
      [80, 54, 53],
      [14, 15, 70, 71],
      [10, 90, 64],
    ],
    numberOfRemainingCards: 7,
  },
  {
    id: 43563,
    name: "Roku",
    score: 300,
    cards: [],
    numberOfRemainingCards: 11,
  },
  {
    id: 97655,
    name: "The Phenox King and Former Fire Lord Ozai",
    score: 20,
    cards: [
      [99, 60, 19],
      [93, 94, 95, 107, 97],
      [21, 34, 8],
    ],
    numberOfRemainingCards: 6,
    showCards: true,
  },
];

function getDiscard(cards) {
  const newCards = cards.map((card) => ({
    id: card,
    rotation: Math.floor(360 * Math.random()),
  }));

  return newCards;
}

function GamePage() {
  // const [game, setGame] = useState({
  //   draw: [],
  //   players: [],
  // });

  // const [player, setPlayer] = useState({ cards: [] });

  // useEffect(() => {
  //   getGameById(23421)
  //     .then((_game) => {
  //       setGame({ ..._game, discard: getDiscard });
  //     })
  //     .catch((error) => {});
  // }, []);

  // useEffect(() => {
  //   getPlayerById(43521).then((_player) => setPlayer(_player));
  // }, []);

  // function handleCardClicked({ target }) {
  //   debugger;
  // }

  return (
    <div className="GamePage">
      <Row>
        <Col>
          <CardTable
            discard={getDiscard([...Array(17).keys()])}
            numberOfDrawCards={30}
            playerCards={[...Array(17).keys()]}
          />
        </Col>

        <Col className="SidebarCol" xs lg="5">
          <Sidebar players={players} />
        </Col>
      </Row>
    </div>
  );
}

export default GamePage;
