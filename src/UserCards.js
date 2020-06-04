import React from 'react';
import './App.css';
import './bootstrap.min.css';

function UserCards({onCardClicked, cardsInDeck}) {
    return (<div className='container row UserCards'>
        { cardsInDeck.map((card) => <Card key={card.id} onCardClicked={onCardClicked} {...card}></Card>) }
    </div>);
}

function Card(props){
    return(
    <div className='Card col'>
        <img className='CardImage' src={props.shouldShowFront ? props.frontImageSource : props.backImageSource} alt={props.id}  onClick={() => {props.onCardClicked(props.id)}}/>
    </div>
    )
}

export default UserCards;