import React, { useState, useEffect } from "react";
import { getGameById } from "../../api/gameApi";
import { getPlayerById } from "../../api/playerApi";
import "./GamePage.css";
import CardTable from "./CardTable";
import Sidebar from "./Sidebar";
import { Row, Col } from "react-bootstrap";

function GamePage(props) {
  const [game, setGame] = useState({
    discard: [],
    draw: [],
    players: [],
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

  function handleCardClicked({ target }) {
    setGame({
      ...game,
      discard: game.discard.filter((card) => card !== parseInt(target.id, 10)),
    });
  }

  return (
    <div className="GamePage">
      <Row style={{ width: "100%" }}>
        <Col>
          <CardTable
            game={game}
            player={player}
            onCardClicked={handleCardClicked}
          />
        </Col>
        <Col className="SidebarCol" xs lg="5">
          <Sidebar cardsLaid={game.players} />
        </Col>
      </Row>
    </div>
  );
}

export default GamePage;
