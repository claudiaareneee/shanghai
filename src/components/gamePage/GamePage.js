import React, { useEffect, useState } from "react";
import * as baseApi from "../../api/baseApi";
import * as gameApi from "../../api/gameApi";
import * as playerApi from "../../api/playerApi";
import "./GamePage.css";
import CardTable from "./CardTable";
import { Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { GROUP_COLORS, DISCARD_COLOR, GAME_EVENTS } from "../common/Constants";
import GameStatsModal from "./GameStatsModal";
import LogModal from "./LogModal";
import * as tools from "./../../tools";
import ForkMeOnGithub from "fork-me-on-github";

function GamePage() {
  const [game, setGame] = useState({});
  const [turnState, setTurnState] = useState("Wait");
  const [players, setPlayers] = useState({});
  const [discard, setDiscard] = useState([]);
  const [cardToDiscard, setCardToDiscard] = useState(-1);
  const [cardsInHand, setCardsInHand] = useState([]);
  const [highlightedCard, setHighlightedCard] = useState(-1);
  const [cardsOnTable, setCardsOnTable] = useState([]);
  const [statsModalShow, setStatsModalShow] = React.useState(false);
  const [logModalShow, setLogModalShow] = React.useState(false);
  const [showPlayers, setShowPlayers] = React.useState({});
  const [selection, setSelection] = useState({
    selecting: "none",
    color: "",
  });
  const [comment, setComment] = useState("");
  const [dragAssociation, setDragAssociation] = useState({});
  const [drawingJoker, setDrawingJoker] = useState({ isDrawing: false });
  const [logEntries, setLogEntries] = useState([]);
  const room = localStorage.getItem("room") || "";
  const player = localStorage.getItem("uid") || "";

  useEffect(() => {
    if (!game.id) {
      // Initialize listeners
      gameApi.getGameById(room, (game) => {
        setGame(game);
      });

      playerApi.getPlayers(room, (players) => {
        setPlayers(players);
      });

      playerApi.getPlayerCardsInHandById(player, (players) => {
        setCardsInHand(
          Object.values(players).map((card) => ({
            id: parseInt(card, 10),
          }))
        );
      });

      gameApi.getDiscard(room, (_discard) => {
        if (_discard)
          setDiscard(
            Object.keys(_discard).map((key, index) => ({
              id: parseInt(_discard[key], 10),
              rotation: parseInt(_discard[key], 10) * 3,
            }))
          );
      });

      playerApi.getPlayerCardsOnTableById(room, (_cardsOnTable) =>
        setCardsOnTable(_cardsOnTable)
      );

      gameApi.getLogEntriesById(room, (entries) => {
        if (entries) setLogEntries(Object.values(entries));
      });
    } else {
      if (game.turn.state === "endOfHand") setTurnState("EndOfHand");
      else if (player === game.turn.player) {
        switch (game.turn.state) {
          case "playing":
            setTurnState("Play");
            break;
          case "discarding":
            setTurnState("Discard");
            break;
          default:
            setTurnState("Draw");
            break;
        }
      } else setTurnState("Wait");

      // I could see this being problematic
      if (game.turn.state === "drawing" && turnState === "EndOfHand") {
        setCardsOnTable([]);
      }
    }
  }, [room, game, player, turnState]);

  function handleDropdownClicked(playerId) {
    const showPlayer = showPlayers[playerId] ? false : true;
    setShowPlayers({ ...showPlayers, [playerId]: showPlayer });
  }

  function handlePlayerCardClicked({ target }) {
    if (selection.selecting !== "none") {
      const newCardsInHand = cardsInHand.map((card) => {
        if (card.id.toString() === target.id)
          return {
            ...card,
            selected: !card.selected,
            selectedColor: selection.color,
          };
        else if (selection.selecting === "Discard")
          return { ...card, selected: false };
        else return card;
      });
      setCardsInHand(newCardsInHand);

      if (turnState === "Discard") {
        if (cardToDiscard !== target.id) setCardToDiscard(target.id);
        else setCardToDiscard(-1);
      }
    }
  }

  function handleCardHovered({ target }) {
    const id = parseInt(target.id, 10);
    const newHighlightedCard = highlightedCard === id ? -1 : id;
    setHighlightedCard(newHighlightedCard);
  }

  function handleDiscardClicked({ target }) {
    if (turnState === "Draw")
      gameApi.popDiscard(game.id, (card) => {
        const cardId = parseInt(Object.values(card)[0], 10);
        const newCards = [...cardsInHand, { id: cardId }];

        setCardsInHand(newCards);

        playerApi.setPlayerCardsInHand(
          player,
          game.id,
          newCards.map((card) => card.id)
        );

        gameApi.pushLogEntry(game.id, {
          player: players[player].name,
          gameEvent: GAME_EVENTS.drewDiscardPile,
          card: cardId,
        });

        if (discard.length === 1) setDiscard([]);
        baseApi.nextTurn(game);
      });
  }

  function handleDrawClicked({ target }) {
    if (turnState === "Draw")
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

        gameApi.pushLogEntry(game.id, {
          player: players[player].name,
          gameEvent: GAME_EVENTS.drewDrawPile,
        });

        baseApi.performBuy(
          game,
          player,
          players,
          discard[discard.length - 1].id
        );

        setTurnState("Play");
        baseApi.nextTurn(game);
      });
  }

  function handleCardOnTableClicked({ target }, association) {
    const isJoker = target.id % 54 === 53 || target.id % 54 === 52;
    if (cardsOnTable[player] && turnState === "Draw" && isJoker) {
      console.log("can joker draw");
      setDrawingJoker({ isDrawing: true, card: target.id, association });
    } else {
      console.log("can't draw this one");
    }
  }

  function handleTurnButtonClicked({ target }) {
    setTurnState(target.name);
    setSelection({ ...selection, selecting: "none" });

    if (target.name === "Draw") {
      toast.success("🦄 Select draw card!");
    }

    if (target.name === "Discard") {
      baseApi.setTurn(game, "discarding");
      toast.warn("🐨 Select a card to discard!");
    }
  }

  const onDragStart = (event, index, id, association) => {
    console.log("dragstart:", id);
    event.dataTransfer.setData("index", index);
    event.dataTransfer.setData("id", id);
    setDragAssociation(association);
    console.log("drag start assoc", association);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, cat, association) => {
    const cardIndex = parseInt(event.dataTransfer.getData("index"), 10);
    console.log("drag:", cardIndex);
    console.log("drop:", cat);
    console.log("association", association);

    const card = cardsInHand[parseInt(cardIndex, 10)];
    const newArray = cardsInHand.filter((card, index) => {
      return cardIndex !== index;
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

    setDragAssociation({});
  };

  const onDropCardsOnTable = (event, newIndex, association) => {
    const oldIndex = parseInt(event.dataTransfer.getData("index"), 10);
    // console.log("drag:", oldIndex);
    // console.log("drop:", newIndex);
    // console.log("association", association);
    // console.log("dragAssociation", dragAssociation);

    const cardId = event.dataTransfer.getData("id");

    if (dragAssociation.location !== "player" && turnState === "Play") {
      // remove card from original location
      const newPlayerCardsOnTableOldAssociation = tools.removeCardFromCardsLaidWithIndex(
        cardsOnTable[dragAssociation.location],
        oldIndex,
        dragAssociation
      );

      // add card to new location
      const newPlayerCardsOnTableNewAssociation =
        dragAssociation.location === association.location
          ? tools.addCardToCardsLaid(
              newPlayerCardsOnTableOldAssociation,
              newIndex,
              association,
              parseInt(cardId, 10)
            )
          : tools.addCardToCardsLaid(
              cardsOnTable[association.location],
              newIndex,
              association,
              parseInt(cardId, 10)
            );

      // set cards on deck
      if (dragAssociation.location !== association.location) {
        playerApi.setPlayerCardsOnTable(
          dragAssociation.location,
          game.id,
          newPlayerCardsOnTableOldAssociation
        );
      }

      playerApi.setPlayerCardsOnTable(
        association.location,
        game.id,
        newPlayerCardsOnTableNewAssociation
      );

      // todo: game event for moving cards log
    } else if (turnState === "Play" && cardsOnTable[player]) {
      if (cardsInHand.length === 1) {
        toast.error("Cannot play card. Must have a card to discard");
        return;
      }

      const newPlayerCardsOnTable = tools.addCardToCardsLaid(
        Object.values(cardsOnTable[association.location]),
        newIndex,
        association,
        parseInt(cardId, 10)
      );

      playerApi.setPlayerCardsOnTable(
        association.location,
        game.id,
        newPlayerCardsOnTable
      );

      const newPlayerCardsInHand = cardsInHand
        .filter((card) => card.id.toString() !== cardId)
        .map((card) => card.id);

      playerApi.setPlayerCardsInHand(player, game.id, newPlayerCardsInHand);

      console.log(
        "players[association.location]",
        players[association.location]
      );

      gameApi.pushLogEntry(game.id, {
        player: players[player].name,
        gameEvent: GAME_EVENTS.playedCards,
        card: cardId,
        opponent: players[association.location].name,
      });
    } else {
      toast.error(
        "Oops! You can only move cards after drawing on your turn 🌵"
      );
    }
  };

  const handleSelectionButtonClicked = (color) => {
    const selecting = color === DISCARD_COLOR ? "Discard" : "Play";
    setSelection({ ...selection, selecting, color });
    setTurnState(selecting);

    const turnState = selecting === "Discard" ? "discarding" : "playing";
    console.log("turnState", turnState);
    gameApi.setNextTurn(game.id, { ...game.turn, state: turnState });
  };

  const handlePlaySelectedYes = () => {
    if (selection.selecting === "Play") {
      const selectedCards = GROUP_COLORS.map((color) =>
        cardsInHand
          .filter((card) => card.selected && card.selectedColor === color)
          .map((card) => card.id)
      );

      const numberOfSelectionsMade = selectedCards.reduce(
        (p, c) => (c.length > 0 ? p + 1 : p),
        0
      );

      if (numberOfSelectionsMade !== game.hand.books + game.hand.runs) {
        toast.error(
          `Uh oh, please select ${game.hand.books} books and ${game.hand.runs} runs`
        );
        return;
      }

      const newCardsInHand = cardsInHand.filter((card) => !card.selected);

      if (newCardsInHand.length === 0) {
        toast.error("Uh oh! You need at least one card to discard!");
        return;
      }

      playerApi.setPlayerCardsOnTable(player, game.id, selectedCards);
      playerApi.setPlayerCardsInHand(
        player,
        game.id,
        newCardsInHand.map((card) => card.id)
      );

      gameApi.pushLogEntry(game.id, {
        player: players[player].name,
        gameEvent: GAME_EVENTS.laidDown,
      });
    } else if (selection.selecting === "Discard") {
      if (cardToDiscard === -1) {
        toast.error(`Uh oh, please select a card to discard`);
        return;
      }

      gameApi.pushToDiscard(game.id, cardToDiscard);

      const newCards = cardsInHand.filter(
        (card) => card.id !== parseInt(cardToDiscard, 10)
      );

      setCardsInHand(newCards);
      setCardToDiscard(-1);

      playerApi.setPlayerCardsInHand(
        player,
        game.id,
        newCards.map((card) => card.id)
      );

      gameApi.pushLogEntry(game.id, {
        player: players[player].name,
        gameEvent: GAME_EVENTS.discard,
        card: parseInt(cardToDiscard, 10),
      });

      if (newCards.length !== 0) {
        baseApi.nextTurn(game);
        setTurnState("Wait");
      } else {
        toast.success("congratz 🦑, you just went out");
        setTurnState("EndOfHand");
        playerApi.calculateScores(game.id, players);
        playerApi.setNumberOfRemainingCards(game.id, player, 0);

        gameApi.pushLogEntry(game.id, {
          player: players[player].name,
          gameEvent: GAME_EVENTS.wentOut,
        });

        baseApi.nextTurn(game, true);
      }
    }
    setSelection({ ...selection, selecting: "none" });
  };

  const handlePlaySelectedNo = () => {
    const newCardsInHand = cardsInHand.map((card) => ({
      ...card,
      selected: false,
    }));
    setCardsInHand(newCardsInHand);
    setSelection({ ...selection, selecting: "none" });

    if (turnState === "Discard")
      gameApi.setNextTurn(game.id, { ...game.turn, state: "playing" });

    if (drawingJoker.isDrawing) setDrawingJoker({ drawing: false });
  };

  const handleDrawJokerYes = () => {
    const cardId = parseInt(drawingJoker.card, 10);

    const newCardsOnTable = tools.removeCardFromCardsLaidWithId(
      cardsOnTable[drawingJoker.association.location],
      cardId,
      drawingJoker.association
    );
    console.log("drawingJoker: ", drawingJoker);
    playerApi.setPlayerCardsOnTable(
      drawingJoker.association.location,
      game.id,
      newCardsOnTable
    );

    const newCards = [...cardsInHand, { id: cardId }];
    setCardsInHand(newCards);

    playerApi.setPlayerCardsInHand(
      player,
      game.id,
      newCards.map((card) => card.id)
    );

    gameApi.pushLogEntry(game.id, {
      player: players[player].name,
      gameEvent: GAME_EVENTS.drewJoker,
      opponent: players[drawingJoker.association.location].name,
    });

    setDrawingJoker({ isDrawing: false });
    baseApi.nextTurn(game);
  };

  const handleDrawJokerNo = () => {
    setDrawingJoker({ drawing: false });
  };

  const handleNextHandClick = () => {
    baseApi.setDeal(game);
    gameApi.pushLogEntry(game.id, {
      player: players[player].name,
      gameEvent: GAME_EVENTS.moveToNextHand,
    });
    setCardsOnTable([]);
  };

  const handleBuyClicked = () => {
    toast.info("ooo buy");
    if (game.buyers && Object.values(game.buyers).includes(player)) return;

    gameApi.pushBuyer(game.id, player);
  };

  const handleCommentChanged = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = () => {
    if (comment !== "") {
      baseApi.addComment(game.id, player, comment);
      setComment("");
    }
  };

  return (
    <div className="GamePage">
      <Row>
        <Col>
          <CardTable
            game={game}
            turnState={turnState}
            player={player}
            discard={discard || []}
            playerCards={cardsInHand}
            highlightedCard={highlightedCard}
            cardsOnTable={cardsOnTable}
            selection={selection}
            numberOfBuys={
              players[player] ? parseInt(players[player].buys, 10) : 0
            }
            drawingJoker={drawingJoker}
            onPlayerCardClicked={handlePlayerCardClicked}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDrawClicked={handleDrawClicked}
            onCardHovered={handleCardHovered}
            onDiscardClicked={handleDiscardClicked}
            onTurnButtonClicked={handleTurnButtonClicked}
            onSelectionButtonClicked={handleSelectionButtonClicked}
            onPlaySelectedYes={handlePlaySelectedYes}
            onPlaySelectedNo={handlePlaySelectedNo}
            onDrawJokerYes={handleDrawJokerYes}
            onDrawJokerNo={handleDrawJokerNo}
            onBuyClicked={handleBuyClicked}
          />
        </Col>

        <Col className="SidebarCol" xs lg="5">
          <Sidebar
            user={player}
            turn={game.turn}
            players={players}
            showPlayers={showPlayers}
            turnState={turnState}
            highlightedCard={highlightedCard}
            cardsOnTable={cardsOnTable}
            lastLogMessage={logEntries[logEntries.length - 1] || {}}
            onDragStart={onDragStart}
            onDrop={onDropCardsOnTable}
            onCardClicked={handleCardOnTableClicked}
            onCardHovered={handleCardHovered}
            onDropdownClicked={handleDropdownClicked}
            onScoreCardClicked={() => setStatsModalShow(true)}
            onLogClicked={() => setLogModalShow(true)}
            onNextHandClick={handleNextHandClick}
          />
        </Col>
      </Row>
      <GameStatsModal
        gameId={game.id || ""}
        show={statsModalShow}
        players={players}
        comment={comment}
        onHide={() => setStatsModalShow(false)}
        onSubmitComment={handleSubmitComment}
        onCommentChange={handleCommentChanged}
      />
      <LogModal
        show={logModalShow}
        onHide={() => setLogModalShow(false)}
        logEntries={logEntries}
      />
      <ForkMeOnGithub
        repo="https://github.com/claudiaareneee/shanghai"
        colorBackground="lightblue"
        colorOctocat="black"
      />
    </div>
  );
}

export default GamePage;
