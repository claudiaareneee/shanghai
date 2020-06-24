import React from "react";
import CardSlide from "../common/CardSlide";
import PropTypes from "prop-types";
import CardPlaceholder from "../common/CardPlaceholder";
import { Row, Col, Container } from "react-bootstrap";
import "./PlayerBucket.css";

function CardsPlayed({ cards = [], onCardClicked }) {
  return cards.length === 0 ? (
    <div className="cards">
      <CardPlaceholder source={"placeholder"} />
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

function PlayerBucket({ player, onCardClicked, onDropdownClicked }) {
  return (
    <Container>
      <Row className="player">
        <Col>
          <h5 className="name">{player.name}</h5>
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
