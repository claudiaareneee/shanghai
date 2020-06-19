// import React, { useState, useEffect } from "react";
import React from "react";
// import { getGameById } from "../../api/gameApi";
// import { getPlayerById } from "../../api/playerApi";
import "./GamePage.css";
import CardTable from "./CardTable";
import { Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

const players = {
  43521: [],
  52342: [
    [80, 54, 53],
    [14, 15, 70, 71, 14, 15, 70, 71, 14, 15, 70, 71],
    [10, 90, 64],
  ],
  43563: [],
  97655: [
    [99, 60, 19],
    [93, 94, 95, 107, 97],
    [21, 34, 8],
  ],
};

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
          <Sidebar cardsLaid={players} />
        </Col>
      </Row>
    </div>
  );
}

export default GamePage;
