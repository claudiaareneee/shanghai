import React from "react";
import "./Sidebar.css";
import { Container, Row, Col } from "react-bootstrap";
import CardSlide from "../common/CardSlide";
import PropTypes from "prop-types";
import CardPlaceholder from "../common/CardPlaceholder";

function CardsLaid({ cards, onCardClicked }) {
  return cards.length === 0 ? (
    <div>
      <CardPlaceholder source={"placeholder"} />
    </div>
  ) : (
    // <Row>
    <div>
      {cards.map((set, index) => {
        return (
          // <Col key={index}>
          <CardSlide
            key={index}
            onCardClicked={onCardClicked}
            cards={set}
            useStyle="slideStyle"
          />
          // </Col>
        );
      })}
    </div>
    // </Row>
  );
}

CardsLaid.propTypes = {
  cards: PropTypes.array.isRequired,
  onCardClicked: PropTypes.func.isRequired,
};

function Sidebar({ cardsLaid, onCardClicked }) {
  return (
    <Container className="Sidebar">
      <p>Cards Played</p>
      {Object.keys(cardsLaid).map((key) => {
        return (
          <CardsLaid
            key={key}
            cards={cardsLaid[key]}
            onCardClicked={onCardClicked}
          />
        );
      })}
    </Container>
  );
}

Sidebar.propTypes = {
  cardsLaid: PropTypes.object.isRequired,
  onCardClicked: PropTypes.func,
};

Sidebar.defaultProps = {
  onCardClicked: () => {},
};

export default Sidebar;
