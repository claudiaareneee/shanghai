import React from 'react';
import './App.css';
import {Col, Row, Container} from 'react-bootstrap';

function UserCards({onCardClicked, cardsInDeck, useFanStyle}) {
    const offset = Math.floor(cardsInDeck.length / 2.0);

    return (<div className='UserCardsWrapper'><Row className='UserCards'>
        { cardsInDeck.map((card) => <Card key={card.id} onCardClicked={onCardClicked} offset={card.id - offset} useFanStyle={useFanStyle} {...card}></Card>) }
    </Row></div>);
}

function Card(props){
    const absOffset = Math.abs(props.offset);
    const yTranslation = absOffset*absOffset*(1/10.0);
    const rotation = props.offset *2;

    console.log(yTranslation);

    const fanStyle = {
        WebkitTransition: 'all', // note the capital 'W' here
        msTransition: 'all', // 'ms' is the only lowercase vendor prefix
        transform: `rotate(${rotation}deg) translateY(${yTranslation}rem)`,
    };

    const slideStyle = {};

    const pinwheelStyle = {
        WebkitTransition: 'all', // note the capital 'W' here
        msTransition: 'all', // 'ms' is the only lowercase vendor prefix
        transform: `rotate(${10 * rotation}deg)`,
    };



    return(
    // <Col className='Card' style={props.useFanStyle ? fanStyle : slideStyle }>
    <Col className='Card' style={pinwheelStyle }>
        <img className='CardImage' src={props.shouldShowFront ? props.frontImageSource : props.backImageSource} alt={props.id}  onClick={() => {props.onCardClicked(props.id)}}/>
    </Col>
    )
}

export default UserCards;