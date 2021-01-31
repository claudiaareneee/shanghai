import React from "react";
import "./CardTable.css";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import CardSet from "../common/CardSet";
import CardDiscard from "../common/CardDiscard";
import CardStack from "../common/CardStack";
import Buys from "./Buys";
import Turn from "./Turn";
import SetSelection from "./SetSelection";

function CardTable({
  game,
  turnState,
  player,
  playerCards,
  discard,
  numberOfBuys,
  highlightedCard,
  cardsOnTable,
  onCardHovered,
  onPlayerCardClicked,
  onDragStart,
  onDragOver,
  onDrop,
  onDrawClicked,
  onDiscardClicked,
  onTurnButtonClicked,
  onSelectionButtonClicked,
  onLayDown,
  onBuyClicked,
}) {
  return (
    <div className="CardTable sticky-top">
      <Row className="GameInformationBlock">
        <Col>
          {game.hand ? (
            <h5>
              Hand: {game.hand.books}{" "}
              {parseInt(game.hand.books, 10) === 1 ? "book" : "books"},{" "}
              {game.hand.runs}{" "}
              {parseInt(game.hand.runs, 10) === 1 ? "run" : "runs"}
            </h5>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row className="PilesBlock">
        <Col sm>
          <CardDiscard
            cards={discard}
            source="front"
            highlightedCard={highlightedCard}
            onCardHovered={onCardHovered}
            onCardClicked={onDiscardClicked}
          />
        </Col>
        <Col className="justify-content-center align-self-center">
          <CardStack
            numberOfCards={
              !game.numberOfDrawCards
                ? 0
                : game.numberOfDrawCards > 30
                ? 30
                : game.numberOfDrawCards
            }
            source="back"
            highlight={highlightedCard}
            onCardHovered={onCardHovered}
            onCardClicked={onDrawClicked}
          />
        </Col>
      </Row>

      <Row className="PlayerHand">
        {playerCards.length > 0 ? (
          <CardSet
            cards={playerCards}
            source="front"
            highlightedCard={highlightedCard}
            onCardClicked={onPlayerCardClicked}
            onCardHovered={onCardHovered}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        ) : (
          <h3 style={{ justifyContent: "center", width: "100%" }}>
            Congrats! You went out!{" "}
            <span role="img" aria-label="fire">
              🔥🔥🔥
            </span>
          </h3>
        )}
      </Row>

      {turnState === "Play" && !cardsOnTable[player] ? (
        <SetSelection
          hand={game.hand}
          onClick={onSelectionButtonClicked}
          onLayDown={onLayDown}
        />
      ) : (
        <></>
      )}

      <Row>
        <Col>
          <Buys
            numberOfBuys={numberOfBuys}
            laidDown={cardsOnTable[player]}
            onClick={onBuyClicked}
            disabled={game.turn && game.turn.player === player}
          />
        </Col>
        <Turn
          player={player}
          game={game}
          onTurnButtonClicked={onTurnButtonClicked}
        />
      </Row>
    </div>
  );
}

CardTable.propTypes = {
  discard: PropTypes.array.isRequired,
  playerCards: PropTypes.array.isRequired,
  onPlayerCardClicked: PropTypes.func.isRequired,
  onPlayerCardHovered: PropTypes.func.isRequired,
  onSelectionButtonClicked: PropTypes.func.isRequired,
  onLayDown: PropTypes.func.isRequired,
};

export default CardTable;
