import React from "react";
import "../styles/Sidebar.css";
import { Container, Row, Col } from "react-bootstrap";
import CardSet from "./CardSet";

const cards = {
  43521: [],
  52342: [
    [26, 0, 54],
    [14, 15, 16, 17],
    [10, 36, 64],
  ],
  43563: [],
  97655: [
    [45, 6, 19],
    [39, 40, 41, 53, 43],
    [21, 34, 8],
  ],
};

function CardsLaid(props) {
  return (
    <Row style={{ paddingRight: "1rem" }}>
      {props.cards.map((set) => {
        return (
          <Col>
            <CardSet
              onCardClicked={() => {}}
              cardsInDeck={set}
              useStyle="slideStyle"
            />
          </Col>
        );
      })}
    </Row>
  );
}

function Sidebar(props) {
  console.log(cards);
  return (
    <Container className="Sidebar">
      <p>Cards Played</p>
      {Object.keys(cards).map((key) => {
        return <CardsLaid key={key} cards={cards[key]} />;
      })}
    </Container>
  );
}

export default Sidebar;
