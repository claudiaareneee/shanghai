import React from 'react';
import './App.css';
import {Col, Row, Container} from 'react-bootstrap';

function UserCards({onCardClicked, cardsInDeck}) {
    const offset = Math.floor(cardsInDeck.length / 2.0);


    return (<Container className='UserCardsWrapper'><Row className='UserCards'>
        { cardsInDeck.map((card) => <Card key={card.id} onCardClicked={onCardClicked} offset={card.id - offset} {...card}></Card>) }
    </Row></Container>);
}

function Card(props){
    const absOffset = Math.abs(props.offset);
    const yTranslation = absOffset*absOffset*(1/10.0);
    const rotation = props.offset *2;

    console.log(yTranslation);

    return(
    <Col className='Card' style={{
        WebkitTransition: 'all', // note the capital 'W' here
        msTransition: 'all', // 'ms' is the only lowercase vendor prefix
        transform: `rotate(${rotation}deg) translateY(${yTranslation}rem)`,
    }}>
        <img className='CardImage' src={props.shouldShowFront ? props.frontImageSource : props.backImageSource} alt={props.id}  onClick={() => {props.onCardClicked(props.id)}}/>
    </Col>
    )
}

export default UserCards;