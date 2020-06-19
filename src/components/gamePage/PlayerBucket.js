import React from "react";
import CardSlide from "../common/CardSlide";
import PropTypes from "prop-types";
import CardPlaceholder from "../common/CardPlaceholder";
import { Row, Col } from "react-bootstrap";
import "./PlayerBucket.css";

function CardsPlayed({ cards, onCardClicked }) {
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

function PlayerBucket({ player, onCardClicked }) {
  return (
    <>
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
            <i className="fas fa-lg fa-chevron-circle-up"></i>
          ) : (
            <i className="fas fa-lg fa-chevron-circle-down"></i>
          )}
        </Col>
      </Row>
      {player.showCards ? (
        <CardsPlayed cards={player.cards} onCardClicked={onCardClicked} />
      ) : (
        <></>
      )}
    </>
  );
}

PlayerBucket.propTypes = {
  player: PropTypes.object.isRequired,
  onCardClicked: PropTypes.func.isRequired,
};

export default PlayerBucket;
