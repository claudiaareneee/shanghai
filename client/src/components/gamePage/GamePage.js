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
              ? { id: parseInt(card, 10) }
              : { id: parseInt(card, 10), highlight: false }
          )
        );
      });
      gameApi.getDiscard(game.id, (_discard) => {
        if (_discard)
          setDiscard(
            Object.keys(_discard).map((key, index) =>
              discard[index] && discard[index].rotation
                ? { id: parseInt(_discard[key], 10) }
                : {
                    id: parseInt(_discard[key], 10),
                    rotation: parseInt(_discard[key], 10) * 3,
                  }
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
    if (game.turn && game.turn.player === player) {
      gameApi.pushToDiscard(game.id, target.id);

      const newCards = cardsInHand.filter(
        (card) => card.id !== parseInt(target.id, 10)
      );

      setCardsInHand(newCards);
      playerApi.setPlayerCardsInHand(
        player,
        game.id,
        newCards.map((card) => card.id)
      );
    }
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

  function handleDiscardClicked({ target }) {
    console.log("discard");

    if (game.turn && game.turn.player === player)
      gameApi.popDiscard(game.id, (card) => {
        const newCards = [
          ...cardsInHand,
          { id: parseInt(Object.values(card)[0], 10) },
        ];

        setCardsInHand(newCards);

        playerApi.setPlayerCardsInHand(
          player,
          game.id,
          newCards.map((card) => card.id)
        );

        if (discard.length === 1) setDiscard([]);
      });
  }

  function handleDiscardHovered({ target }) {
    setDiscard(
      discard.map((card) =>
        card.id === parseInt(target.id, 10)
          ? { ...card, highlight: !card.highlight }
          : { ...card }
      )
    );
  }

  function handleDrawClicked({ target }) {
    console.log("draw");

    if (game.turn && game.turn.player === player)
      gameApi.popDrawCard(game.id, game.numberOfDrawCards, (card) => {
        const newCards = [
          ...cardsInHand,
          { id: parseInt(Object.values(card)[0], 10) },
        ];

        setCardsInHand(newCards);

        playerApi.setPlayerCardsInHand(
          player,
          game.id,
          newCards.map((card) => card.id)
        );
      });
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

    let cards = [];

    if (cat > 0) {
      const startArray = newArray.splice(0, cat);
      cards = [...startArray, card, ...newArray];
    } else {
      cards = [card, ...newArray];
    }

    setCardsInHand(cards);
    playerApi.setPlayerCardsInHand(
      player,
      game.id,
      cards.map((card) => card.id)
    );
  };

  return (
    <div className="GamePage">
      <Row>
        <Col>
          <CardTable
            game={game}
            player={player}
            discard={discard || []}
            playerCards={cardsInHand}
            onPlayerCardClicked={handlePlayerCardClicked}
            onPlayerCardHovered={handlePlayerCardHovered}
            numberOfBuys={
              players[player] ? parseInt(players[player].buys, 10) : 0
            }
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDrawClicked={handleDrawClicked}
            onDrawHovered={handleDrawHovered}
            onDiscardClicked={handleDiscardClicked}
            onDiscardHovered={handleDiscardHovered}
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
