import React, { useState, useEffect } from "react";
import { getGameById } from "../api/gameApi";
import { getPlayerById } from "../api/playerApi";
import "./App.css";
import CardTable from "./gamePage/CardTable";
import Sidebar from "./gamePage/Sidebar";
import { Row, Col } from "react-bootstrap";

function App(props) {
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

  return (
    <div className="App">
      <Row style={{ width: "100%" }}>
        <Col>
          <CardTable game={game} player={player} />
        </Col>
        <Col className="SidebarCol" xs lg="5">
          <Sidebar cardsLaid={game.players} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
