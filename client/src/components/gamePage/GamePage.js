// import React, { useState, useEffect } from "react";
import React, { useEffect, useState } from "react";
import * as gameApi from "../../api/gameApi";
import * as playerApi from "../../api/playerApi";
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
  const [game, setGame] = useState({});
  const [players, setPlayers] = useState({});
  const [discard, setDiscard] = useState([]);
  const [cardsInHand, setCardsInHand] = useState([]);
  const room = localStorage.getItem("room") || "";
  const player = localStorage.getItem("uid") || "";

  useEffect(() => {
    console.log(game);
    if (!game.id)
      gameApi.getGameById(room, (game) => {
        setGame(game);
      });
    else {
      playerApi.getPlayers(game.id, (players) => {
        setPlayers(players);
      });
      playerApi.getPlayerCardsInHandById(player, (players) => {
        setCardsInHand(players);
      });
      gameApi.getDiscard(game.id, (discard) => {
        setDiscard(
          discard.map((card, index) =>
            discard[index].rotation
              ? { id: card }
              : { id: card, rotation: Math.random() * 360 }
          )
        );
      });
    }
  }, [game]);

  return (
    <div className="GamePage">
      <Row>
        <Col>
          <CardTable
            discard={discard || []}
            numberOfDrawCards={30}
            playerCards={cardsInHand}
            hand={game.hand || { books: 0, runs: 0 }}
          />
        </Col>

        {/* <Col className="SidebarCol" xs lg="5">
          <Sidebar players={players} />
        </Col> */}
      </Row>
    </div>
  );
}

export default GamePage;
