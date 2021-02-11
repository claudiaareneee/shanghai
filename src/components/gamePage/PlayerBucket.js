import React from "react";
import CardSlide from "../common/CardSlide";
import PropTypes from "prop-types";
import * as constants from "../common/Constants";
import PlayingCard from "../common/PlayingCard";
import { Row, Col, Container } from "react-bootstrap";
import "./PlayerBucket.css";

function CardsPlayed({
  cards = [],
  player,
  highlightedCard,
  onCardClicked,
  onDragStart,
  onDrop,
  onCardHovered,
}) {
  const containerHeight = constants.CARD_HEIGHT;

  const style = {
    width: "100%",
    height: `${containerHeight}rem`,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  return cards.length === 0 ? (
    <div className="cards">
      <div style={style}>
        <PlayingCard id={0} source={"placeholder"} />
      </div>
      <small>No cards played</small>
    </div>
  ) : (
    <div className="cards">
      {Object.values(cards).map((set, index) => {
        return (
          <CardSlide
            key={index}
            onCardClicked={onCardClicked}
            onDragStart={onDragStart}
            onDrop={onDrop}
            index={index}
            cards={set}
            association={{ location: player, index: index }}
            highlightedCard={highlightedCard}
            useStyle="slideStyle"
            onCardHovered={onCardHovered}
          />
        );
      })}
    </div>
  );
}

CardsPlayed.propTypes = {
  cards: PropTypes.array.isRequired,
  onCardClicked: PropTypes.func.isRequired,
};

function PlayerBucket({
  user,
  player,
  showPlayer,
  cards,
  highlightedCard,
  onCardClicked,
  onDropdownClicked,
  onDragStart,
  onDrop,
  onCardHovered,
  turn,
}) {
  const style = turn.player === player.id ? { backgroundColor: "#0066cc" } : {};
  return (
    <Container>
      <Row className="player" style={style}>
        <Col>
          {turn.player === player.id ? (
            <h5 className="name">
              {player.id === user ? "⭐️" : ""} {player.name} ({turn.state})
            </h5>
          ) : (
            <h5 className="name">
              {player.id === user ? "⭐️" : ""} {player.name}
            </h5>
          )}
          <div className="playerInfo" style={{ textAlign: "left" }}>
            <p>Score: {player.score || 0}</p>
            <p>Cards left: {player.numberOfRemainingCards}</p>
            <p>Buys left: {player.buys}</p>
            {cards.length > 0 ? (
              <p>
                <i
                  className="fa fa-arrow-down"
                  aria-hidden="true"
                  title="Laid down"
                ></i>
              </p>
            ) : (
              <></>
            )}
          </div>
        </Col>
        <Col xs lg={2}>
          {showPlayer ? (
            <i
              className="fas fa-lg fa-chevron-circle-up"
              onClick={() => onDropdownClicked(player.id)}
            ></i>
          ) : (
            <i
              className="fas fa-lg fa-chevron-circle-down"
              onClick={() => onDropdownClicked(player.id)}
            ></i>
          )}
        </Col>
      </Row>
      {showPlayer ? (
        <CardsPlayed
          cards={cards}
          highlightedCard={highlightedCard}
          onCardClicked={onCardClicked}
          onDrop={onDrop}
          onDragStart={onDragStart}
          player={player.id}
          onCardHovered={onCardHovered}
        />
      ) : (
        <></>
      )}
    </Container>
  );
}

PlayerBucket.propTypes = {
  player: PropTypes.object.isRequired,
  onCardClicked: PropTypes.func.isRequired,
  onDropdownClicked: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

PlayerBucket.defaultProps = {
  cards: [],
};

export default PlayerBucket;
