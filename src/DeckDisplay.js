import React from 'react';
import './App.css';

function DeckDisplay({onCardClicked, cardsInDeck}) {
    return (<div className='container'>
        { cardsInDeck.map((card) => <Card key={card.name} onCardClicked={onCardClicked} {...card}></Card>) }
    </div>);
}

function Card(props){
    return(
    <div className='Card col-6' onClick={() => {props.onCardClicked(props.name)}}>
        <img className='CardImage' src={props.shouldShowFront ? props.frontImageSource : props.backImageSource} alt='name'/>
    </div>
    )
}

export default DeckDisplay;