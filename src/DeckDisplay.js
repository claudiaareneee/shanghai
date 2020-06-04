import React from 'react';
import './App.css';
import CardSources from './CardSources';

function DeckDisplay({onCardClicked, cards}) {
    let deck = [];

    for (let i = 0; i < 54; i++) {
        let imgSrc = CardSources.fronts[i];
        deck.push({'name': i, imgSrc});
    }

    deck.push({'name': 55, 'imgSrc': CardSources.backs[0]});

    return (<div className='container'>
        { deck.map((card) => <Card key={card.name} name={card.name} imgSrc={card.imgSrc}></Card>) }
    </div>);
}

function Card({name, imgSrc, onCardClicked}){
    return(
    <div className='Card col-6' onClick={onCardClicked}>
        <img className='CardImage' src={imgSrc} alt='name'/>
    </div>
    )
}

export default DeckDisplay;