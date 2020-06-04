import React from 'react';
import './App.css';
import './bootstrap.min.css';

function UserCards({onCardClicked, cardsInDeck}) {
    const rotationOffset = Math.floor(cardsInDeck.length / 2.0);


    return (<div className='UserCardsWrapper'><div className='container row UserCards'>
        { cardsInDeck.map((card) => <Card key={card.id} onCardClicked={onCardClicked} rotation={card.id - rotationOffset} {...card}></Card>) }
    </div></div>);
}

function Card(props){
    return(
    <div className='Card col' style={{
        WebkitTransition: 'all', // note the capital 'W' here
        msTransition: 'all', // 'ms' is the only lowercase vendor prefix
        transform: `rotate(${props.rotation}deg) translateY(${props.rotation}rem)`,
    }}>
        <img className='CardImage' src={props.shouldShowFront ? props.frontImageSource : props.backImageSource} alt={props.id}  onClick={() => {props.onCardClicked(props.id)}}/>
    </div>
    )
}

export default UserCards;