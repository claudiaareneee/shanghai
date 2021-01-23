import React from "react";
import CardSlide from "../common/CardSlide";
import PropTypes from "prop-types";
import * as constants from "../common/Constants";
import PlayingCard from "../common/PlayingCard";
import { Row, Col, Container } from "react-bootstrap";
import "./PlayerBucket.css";

function CardsPlayed({ cards = [], onCardClicked }) {
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
      {cards.map((set, index) => {
        return (
          <CardSlide
            key={index}
            onCardClicked={onCardClicked}
            cards={set}
            useStyle="slideStyle"
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

function PlayerBucket({ player, onCardClicked, onDropdownClicked, turn }) {
  const style = turn.player === player.id ? { backgroundColor: "#0066cc" } : {};
  return (
    <Container>
      <Row className="player" style={style}>
        <Col>
          {turn.player === player.id ? (
            <h5 className="name">
              {player.name} ({turn.state})
            </h5>
          ) : (
            <h5 className="name">{player.name}</h5>
          )}
          <div className="playerInfo">
            <p>Score: {player.score}</p>
            <p>Remaining Cards: {player.numberOfRemainingCards}</p>
          </div>
        </Col>
        <Col xs lg={2}>
          {player.showCards ? (
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
      {player.showCards ? (
        <CardsPlayed
          cards={player.cards}
          onCardClicked={() => onCardClicked(player.id)}
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
};

export default PlayerBucket;
