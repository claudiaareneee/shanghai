import React, { useEffect, useState } from "react";
import * as gameApi from "../../api/gameApi";
import * as playerApi from "../../api/playerApi";
import "./GamePage.css";
import CardTable from "./CardTable";
import { Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

function GamePage() {
  const [game, setGame] = useState({});
  const [players, setPlayers] = useState({});
  const [discard, setDiscard] = useState([]);
  const [highlightDraw, setHighlightDraw] = useState(false);
  const [cardsInHand, setCardsInHand] = useState([]);
  const room = localStorage.getItem("room") || "";
  const player = localStorage.getItem("uid") || "";

  useEffect(() => {
    if (!game.id)
      gameApi.getGameById(room, (game) => {
        setGame(game);
      });
    else {
      playerApi.getPlayers(game.id, (players) => {
        setPlayers(players);
      });
      playerApi.getPlayerCardsInHandById(player, (players) => {
        setCardsInHand(
          players.map((card, index) =>
            players[index].highlight
              ? { id: card }
              : { id: card, highlight: false }
          )
        );
      });
      gameApi.getDiscard(game.id, (discard) => {
        if (discard)
          setDiscard(
            discard.map((card, index) =>
              discard[index].rotation
                ? { id: card }
                : { id: card, rotation: Math.random() * 360 }
            )
          );
      });
    }
  }, [room, game, player]);

  function handleDropdownClicked(playerId) {
    const showCards = players[playerId].showCards ? false : true;
    setPlayers({ ...players, [playerId]: { ...players[playerId], showCards } });
  }

  function handlePlayerCardClicked({ target }) {
    console.log("card clicked");
  }

  function handlePlayerCardHovered({ target }) {
    setCardsInHand(
      cardsInHand.map((card) =>
        card.id === parseInt(target.id, 10)
          ? { ...card, highlight: !card.highlight }
          : { ...card }
      )
    );
  }

  function handleDrawHovered({ target }) {
    setHighlightDraw(!highlightDraw);
  }

  const onDragStart = (event, id) => {
    console.log("dragstart:", id);
    event.dataTransfer.setData("id", id);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, cat) => {
    let id = parseInt(event.dataTransfer.getData("id"), 10);
    console.log("drag:", id);
    console.log("drop:", cat);

    const card = cardsInHand[parseInt(id, 10)];
    const newArray = cardsInHand.filter((card, index) => {
      return id !== index;
    });

    if (cat > 0) {
      const startArray = newArray.splice(0, cat);
      setCardsInHand([...startArray, card, ...newArray]);
    } else {
      setCardsInHand([card, ...newArray]);
    }
  };

  return (
    <div className="GamePage">
      <Row>
        <Col>
          <CardTable
            discard={discard || []}
            numberOfDrawCards={
              !game.numberOfDrawCards
                ? 0
                : game.numberOfDrawCards > 30
                ? 30
                : game.numberOfDrawCards
            }
            playerCards={cardsInHand}
            onPlayerCardClicked={handlePlayerCardClicked}
            onPlayerCardHovered={handlePlayerCardHovered}
            hand={game.hand || { books: 0, runs: 0 }}
            numberOfBuys={
              players[player] ? parseInt(players[player].buys, 10) : 0
            }
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDrawHovered={handleDrawHovered}
            highlightDraw={highlightDraw}
          />
        </Col>

        <Col className="SidebarCol" xs lg="5">
          <Sidebar
            turn={game.turn}
            players={players}
            onDropdownClicked={handleDropdownClicked}
          />
        </Col>
      </Row>
    </div>
  );
}

export default GamePage;
