import React from "react";
import "../styles/Sidebar.css";
import { Container, Row, Col } from "react-bootstrap";
import CardSet from "./CardSet";

const cards = {
  43521: [],
  52342: [
    [80, 54, 53],
    [14, 15, 70, 71],
    [10, 90, 64],
  ],
  43563: [],
  97655: [
    [99, 60, 19],
    [93, 94, 95, 107, 97],
    [21, 34, 8],
  ],
};

function CardsLaid(props) {
  return (
    <Row style={{ paddingRight: "1rem" }}>
      {props.cards.map((set, index) => {
        return (
          <Col key={index}>
            <CardSet
              onCardClicked={() => {}}
              cards={set}
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
