import React, { Component } from "react";
import CardSet from "./CardSet";
import "./styles/App.css";
import CardSources from "./CardSources";
import CardTable from "./CardTable";
import Sidebar from "./Sidebar";
import { Container, Row, Col } from "react-bootstrap";

function getDeck() {
  let deck = [];
  for (let i = 0; i < 54; i++) {
    let frontImageSource = CardSources.fronts[i];
    deck.push({
      id: i,
      shouldShowFront: true,
      frontImageSource,
      backImageSource: CardSources.backs[0],
    });
  }
  return deck;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cardsInDeck: getDeck() };
    // this.handleCardClicked = this.handleCardClicked.bind(this);
  }

  render() {
    return (
      <div className="App">
        <Row style={{ width: "100%" }}>
          <Col>
            <CardTable />
          </Col>
          <Col style={{ backgroundColor: "blue" }} xs lg="5">
            <Sidebar />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
