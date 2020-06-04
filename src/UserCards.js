import React from 'react';
import './App.css';
import './bootstrap.min.css';

function UserCards({onCardClicked, cardsInDeck}) {
    const offset = Math.floor(cardsInDeck.length / 2.0);


    return (<div className='UserCardsWrapper'><div className='container row UserCards'>
        { cardsInDeck.map((card) => <Card key={card.id} onCardClicked={onCardClicked} offset={card.id - offset} {...card}></Card>) }
    </div></div>);
}

function Card(props){
    const absOffset = Math.abs(props.offset);
    const yTranslation = absOffset*absOffset*(1/10.0);
    const rotation = props.offset *2;

    console.log(yTranslation);

    return(
    <div className='Card col' style={{
        WebkitTransition: 'all', // note the capital 'W' here
        msTransition: 'all', // 'ms' is the only lowercase vendor prefix
        transform: `rotate(${rotation}deg) translateY(${yTranslation}rem)`,
    }}>
        <img className='CardImage' src={props.shouldShowFront ? props.frontImageSource : props.backImageSource} alt={props.id}  onClick={() => {props.onCardClicked(props.id)}}/>
    </div>
    )
}

export default UserCards;