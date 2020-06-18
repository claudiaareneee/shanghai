import React from "react";
import "./Sidebar.css";
import { Container, Row, Col } from "react-bootstrap";
import CardSet from "../common/CardSet";
import PlayingCard from "../common/PlayingCard";

function CardsLaid(props) {
  return props.cards.length === 0 ? (
    <PlayingCard id={0} useStyle={"placeholderStyle"} />
  ) : (
    <Row style={{ paddingRight: "1rem" }}>
      {props.cards.map((set, index) => {
        return (
          <Col key={index}>
            <CardSet
              onCardClicked={props.onCardClicked}
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
  return (
    <Container className="Sidebar">
      <p>Cards Played</p>
      {Object.keys(props.cardsLaid).map((key) => {
        return (
          <CardsLaid
            key={key}
            cards={props.cardsLaid[key]}
            onCardClicked={props.onCardClicked}
          />
        );
      })}
    </Container>
  );
}

export default Sidebar;
