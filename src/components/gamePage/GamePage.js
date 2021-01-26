import React, { useEffect, useState } from "react";
import * as baseApi from "../../api/baseApi";
import * as gameApi from "../../api/gameApi";
import * as playerApi from "../../api/playerApi";
import "./GamePage.css";
import CardTable from "./CardTable";
import { Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import {
  GROUP_1_COLOR,
  GROUP_2_COLOR,
  GROUP_3_COLOR,
} from "../common/Constants";
import NextHandModal from "./NextHandModal";

function GamePage() {
  const [game, setGame] = useState({});
  const [turnState, setTurnState] = useState("Wait");
  const [players, setPlayers] = useState({});
  const [discard, setDiscard] = useState([]);
  const [highlightDraw, setHighlightDraw] = useState(false);
  const [cardsInHand, setCardsInHand] = useState([]);
  const [cardsOnTable, setCardsOnTable] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [selection, setSelection] = useState({
    selecting: false,
    color: "",
  });
  const [cardSelections, setCardSelections] = useState({
    [GROUP_1_COLOR]: [],
    [GROUP_2_COLOR]: [],
    [GROUP_3_COLOR]: [],
  });
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
            Object.keys(_discard).map((key, index) => ({
              id: parseInt(_discard[key], 10),
              rotation: parseInt(_discard[key], 10) * 3,
            }))
          );
      });

      playerApi.getPlayerCardsOnTableById(game.id, (_cardsOnTable) =>
        setCardsOnTable(_cardsOnTable)
      );

      if (player === game.turn.player) {
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
      }
    }
  }, [room, game, player]);

  function handleDropdownClicked(playerId) {
    const showCards = players[playerId].showCards ? false : true;
    setPlayers({ ...players, [playerId]: { ...players[playerId], showCards } });
  }

  function handlePlayerCardClicked({ target }) {
    if (turnState === "Play" && selection.selecting) {
      let isSelected = false;
      const newCardsInHand = cardsInHand.map((card) => {
        if (card.id.toString() === target.id) {
          card.selected = !card.selected;
          isSelected = card.selected;
          card.selectedColor = selection.color;
        }
        return card;
      });

      const newCardSelections = !isSelected
        ? cardSelections[selection.color].length === 1
          ? { ...cardSelections, [selection.color]: [] }
          : {
              ...cardSelections,
              [selection.color]: [
                cardSelections[selection.color].filter(
                  (id) => id === target.id
                ),
              ],
            }
        : {
            ...cardSelections,
            [selection.color]: [...cardSelections[selection.color], target.id],
          };

      setCardsInHand(newCardsInHand);
      setCardSelections(newCardSelections);
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
        playerApi.calculateScores(game.id, players);
        baseApi.nextTurn(game, true);
        setTurnState("EndOfHand");
        // setModalShow(true);
      }
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

        setTurnState("Play");
        baseApi.nextTurn(game);
      });
  }

  function handleDrawHovered({ target }) {
    setHighlightDraw(!highlightDraw);
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

  const onDragStart = (event, index, id) => {
    console.log("dragstart:", id);
    event.dataTransfer.setData("index", index);
    event.dataTransfer.setData("id", id);
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
  };

  const onDropCardsOnTable = (event, index, association) => {
    console.log("drag:", index);
    console.log("drop:", index);
    console.log("association", association);
    console.log(cardsOnTable);

    const cardId = event.dataTransfer.getData("id");

    if (turnState === "Play" && cardsOnTable[player]) {
      const newPlayerCardsOnTable = Object.values(
        cardsOnTable[association.location]
      ).map((set, index) => {
        if (index === association.index) return [...set, cardId];
        return set;
      });

      playerApi.setPlayerCardsOnTable(
        association.location,
        game.id,
        newPlayerCardsOnTable
      );

      const newPlayerCardsInHand = cardsInHand
        .filter((card) => card.id.toString() !== cardId)
        .map((card) => card.id);

      playerApi.setPlayerCardsInHand(player, game.id, newPlayerCardsInHand);

      console.log(cardsOnTable[player]);
      console.log(newPlayerCardsOnTable);
      toast.success("got to here");
    }
  };

  const handleSelectionButtonClicked = (type, color) => {
    toast.info(color + " " + type + " selected");
    setSelection({ ...selection, selecting: true, color });
  };

  const handleLayDown = () => {
    let cardsToRemove = [];

    Object.values(cardSelections).forEach((value) => {
      cardsToRemove = [...cardsToRemove, ...value];
    });

    const newCardsInHand = cardsInHand.filter(
      (card) => !cardsToRemove.includes(card.id.toString())
    );

    playerApi.setPlayerCardsOnTable(player, game.id, cardSelections);
    playerApi.setPlayerCardsInHand(
      player,
      game.id,
      newCardsInHand.map((card) => card.id)
    );
  };

  const handleNextHandClick = () => {};

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
            onTurnButtonClicked={handleTurnButtonClicked}
            highlightDraw={highlightDraw}
            onSelectionButtonClicked={handleSelectionButtonClicked}
            onLayDown={handleLayDown}
          />
        </Col>

        <Col className="SidebarCol" xs lg="5">
          <Sidebar
            turn={game.turn}
            players={players}
            onDrop={onDropCardsOnTable}
            cardsOnTable={cardsOnTable}
            onDropdownClicked={handleDropdownClicked}
            onScoreCardClicked={() => {
              setModalShow(true);
            }}
          />
        </Col>
      </Row>
      <NextHandModal
        show={modalShow}
        turnState={turnState}
        players={players}
        onHide={() => setModalShow(false)}
        onNextHandClick={handleNextHandClick}
      />
    </div>
  );
}

export default GamePage;
