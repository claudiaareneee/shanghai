import React, { Component } from 'react';
import CardSet from './CardSet';
import './css/App.css';
import CardSources from './CardSources';
import CardTable from './CardTable';
import { Container } from 'react-bootstrap';


function getDeck() {
  let deck = [];
  for (let i = 0; i < 54; i++) {
    let frontImageSource = CardSources.fronts[i];
    deck.push({'id': i, shouldShowFront: true, frontImageSource, backImageSource: CardSources.backs[0]});
  }
  return deck;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cardsInDeck: getDeck() }
    // this.handleCardClicked = this.handleCardClicked.bind(this);
  }

  render() { 
    return ( <Container className="App">
      <CardTable/>
    </Container> );
  }
}

export default App;
