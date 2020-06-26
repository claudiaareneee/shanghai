import React from "react";
import "./CardTable.css";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import CardSet from "../common/CardSet";
import CardDiscard from "../common/CardDiscard";
import CardStack from "../common/CardStack";
import Buys from "./Buys";
import Turn from "./Turn";

function CardTable({
  game,
  player,
  playerCards,
  discard,
  highlightDraw,
  numberOfBuys,
  onDrawHovered,
  onDiscardHovered,
  onPlayerCardClicked,
  onPlayerCardHovered,
  onDragStart,
  onDragOver,
  onDrop,
  onDrawClicked,
  onDiscardClicked,
  onTurnButtonClicked,
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
            onCardHovered={onDiscardHovered}
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
            highlight={highlightDraw}
            onCardHovered={onDrawHovered}
            onCardClicked={onDrawClicked}
          />
        </Col>
      </Row>

      <Row className="PlayerHand">
        <CardSet
          cards={playerCards}
          source="front"
          onCardClicked={onPlayerCardClicked}
          onCardHovered={onPlayerCardHovered}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      </Row>

      <Row>
        <Col>
          <Buys
            numberOfBuys={numberOfBuys}
            onClick={() => {
              console.log("BUYY!");
            }}
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
};

export default CardTable;
