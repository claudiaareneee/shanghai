import React from 'react';
import './App.css';

function DeckDisplay({onCardClicked, cardsInDeck}) {
    return (<div className='container'>
        { cardsInDeck.map((card) => <Card key={card.id} onCardClicked={onCardClicked} {...card}></Card>) }
    </div>);
}

function Card(props){
    return(
    <div className='Card col-6'>
        <img className='CardImage' src={props.shouldShowFront ? props.frontImageSource : props.backImageSource} alt={props.id}  onClick={() => {props.onCardClicked(props.id)}}/>
    </div>
    )
}

export default DeckDisplay;