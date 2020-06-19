import React from "react";
import "./Sidebar.css";
import { Container } from "react-bootstrap";
import CardSlide from "../common/CardSlide";
import PropTypes from "prop-types";
import CardPlaceholder from "../common/CardPlaceholder";

function CardsLaid({ cards, onCardClicked }) {
  return cards.length === 0 ? (
    <div>
      <CardPlaceholder source={"placeholder"} />
    </div>
  ) : (
    <div>
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

CardsLaid.propTypes = {
  cards: PropTypes.array.isRequired,
  onCardClicked: PropTypes.func.isRequired,
};

function Sidebar({ players, onCardClicked }) {
  return (
    <Container className="Sidebar">
      <p>Cards Played</p>
      {players.map((player) => {
        return (
          <CardsLaid
            key={player.id}
            cards={player.cards}
            onCardClicked={onCardClicked}
          />
        );
      })}
    </Container>
  );
}

Sidebar.propTypes = {
  players: PropTypes.array.isRequired,
  onCardClicked: PropTypes.func,
};

Sidebar.defaultProps = {
  onCardClicked: () => {},
};

export default Sidebar;
