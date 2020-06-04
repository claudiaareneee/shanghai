import React, { Component } from 'react';
import UserCards from './UserCards';
import './App.css';
import CardSources from './CardSources';


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
    this.handleCardClicked = this.handleCardClicked.bind(this);
  }

  handleCardClicked (cardName) {
    const card = this.state.cardsInDeck.find(card => card.id  === cardName);
    card.shouldShowFront = !card.shouldShowFront;

    // TODO: find a better way to do this that feels less hacky
    this.setState(Object.assign({}, this.state.cardsInDeck));
  }

  render() { 
    return ( <div className="App">
      {/* {console.log('App',this.state)} */}
      <UserCards cardsInDeck={this.state.cardsInDeck} onCardClicked={this.handleCardClicked} useFanStyle={false}/>
    </div> );
  }
}

export default App;
