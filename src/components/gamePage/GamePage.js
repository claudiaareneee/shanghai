import React, { useEffect, useState } from "react";
import * as baseApi from "../../api/baseApi";
import * as gameApi from "../../api/gameApi";
import * as playerApi from "../../api/playerApi";
import "./GamePage.css";
import CardTable from "./CardTable";
import { Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { GROUP_COLORS } from "../common/Constants";
import GameStatsModal from "./GameStatsModal";

function GamePage() {
  const [game, setGame] = useState({});
  const [turnState, setTurnState] = useState("Wait");
  const [players, setPlayers] = useState({});
  const [discard, setDiscard] = useState([]);
  const [cardsInHand, setCardsInHand] = useState([]);
  const [highlightedCard, setHighlightedCard] = useState(-1);
  const [cardsOnTable, setCardsOnTable] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [showPlayers, setShowPlayers] = React.useState({});
  const [selection, setSelection] = useState({
    selecting: false,
    color: "",
  });
  const [comment, setComment] = useState("");
  const [dragAssociation, setDragAssociation] = useState({});
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
        setDiscard([]);
        setCardsOnTable([]);
      }
    }
  }, [room, game, player, turnState]);

  function handleDropdownClicked(playerId) {
    const showPlayer = showPlayers[playerId] ? false : true;
    setShowPlayers({ ...showPlayers, [playerId]: showPlayer });
  }

  function handlePlayerCardClicked({ target }) {
    if (turnState === "Play" && selection.selecting) {
      const newCardsInHand = cardsInHand.map((card) => {
        if (card.id.toString() === target.id) {
          return {
            ...card,
            selected: !card.selected,
            selectedColor: selection.color,
          };
        }
        return card;
      });
      setCardsInHand(newCardsInHand);
    }

    if (turnState === "Discard") {
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

      if (newCards.length !== 0) {
        baseApi.nextTurn(game);
        setTurnState("Wait");
      } else {
        toast.success("congratz 🦑, you just went out");
        setTurnState("EndOfHand");
        playerApi.calculateScores(game.id, players);
        playerApi.setNumberOfRemainingCards(game.id, player, 0);
        baseApi.nextTurn(game, true);
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

        baseApi.performBuy(game, player, players);

        setTurnState("Play");
        baseApi.nextTurn(game);
      });
  }

  function handleTurnButtonClicked({ target }) {
    setTurnState(target.name);
    setSelection({ ...selection, selecting: false });

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

  const removeCard = (cards, index, association) => {
    return cards.map((set, i) => {
      if (i === association.index) {
        const newSet = [...set].filter((_, j) => j !== index);
        console.log("newset", newSet);
        return newSet;
      }
      console.log("newset", set);
      return set;
    });
  };

  const addCard = (cards, index, association, card) => {
    return cards.map((set, i) => {
      if (i === association.index) {
        const newSet = [...set];
        const startArray = newSet.splice(0, index + 1);
        let cards =
          newSet.length > 0
            ? [...startArray, card, ...newSet]
            : [...startArray, card];
        return cards;
      }
      return set;
    });
  };

  const onDropCardsOnTable = (event, newIndex, association) => {
    const oldIndex = parseInt(event.dataTransfer.getData("index"), 10);
    // console.log("drag:", oldIndex);
    // console.log("drop:", newIndex);
    // console.log("association", association);
    // console.log("dragAssociation", dragAssociation);

    const cardId = event.dataTransfer.getData("id");

    if (dragAssociation.location !== "player") {
      // remove card from original location
      const newPlayerCardsOnTableOldAssociation = removeCard(
        cardsOnTable[dragAssociation.location],
        oldIndex,
        dragAssociation
      );

      // add card to new location
      const newPlayerCardsOnTableNewAssociation =
        dragAssociation.location === association.location
          ? addCard(
              newPlayerCardsOnTableOldAssociation,
              newIndex,
              association,
              parseInt(cardId, 10)
            )
          : addCard(
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
    } else if (turnState === "Play" && cardsOnTable[player]) {
      const newPlayerCardsOnTable = addCard(
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
    }
  };

  const handleSelectionButtonClicked = (type, color) => {
    setSelection({ ...selection, selecting: true, color });
  };

  const handleLayDown = () => {
    const selectedCards = GROUP_COLORS.map((color) =>
      cardsInHand
        .filter((card) => card.selected && card.selectedColor === color)
        .map((card) => card.id)
    );
    playerApi.setPlayerCardsOnTable(player, game.id, selectedCards);

    const newCardsInHand = cardsInHand.filter((card) => !card.selected);
    playerApi.setPlayerCardsInHand(
      player,
      game.id,
      newCardsInHand.map((card) => card.id)
    );
  };

  const handleNextHandClick = () => {
    baseApi.setDeal(game);
    setDiscard([]);
    setCardsOnTable([]);
  };

  const handleBuyClicked = () => {
    toast.info("ooo buy");
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
            onPlayerCardClicked={handlePlayerCardClicked}
            numberOfBuys={
              players[player] ? parseInt(players[player].buys, 10) : 0
            }
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDrawClicked={handleDrawClicked}
            onCardHovered={handleCardHovered}
            onDiscardClicked={handleDiscardClicked}
            onTurnButtonClicked={handleTurnButtonClicked}
            onSelectionButtonClicked={handleSelectionButtonClicked}
            onLayDown={handleLayDown}
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
            onDragStart={onDragStart}
            onDrop={onDropCardsOnTable}
            cardsOnTable={cardsOnTable}
            onDropdownClicked={handleDropdownClicked}
            onScoreCardClicked={() => {
              setModalShow(true);
            }}
            onNextHandClick={handleNextHandClick}
          />
        </Col>
      </Row>
      <GameStatsModal
        gameId={game.id || ""}
        show={modalShow}
        players={players}
        comment={comment}
        onHide={() => setModalShow(false)}
        onSubmitComment={handleSubmitComment}
        onCommentChange={handleCommentChanged}
      />
    </div>
  );
}

export default GamePage;
