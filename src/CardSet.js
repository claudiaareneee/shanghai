import React from 'react';
import './CardSet.css';
import {Col, Row} from 'react-bootstrap';

function CardSet({onCardClicked, cardsInDeck, useStyle}) {
    const offset = Math.floor(cardsInDeck.length / 2.0);
    const className = `CardSet ${useStyle}`

    return (<div className='CardSetWrapper'><Row className={className}>
        { cardsInDeck.map((card) => <Card key={card.id} onCardClicked={onCardClicked} offset={card.id - offset} useStyle={useStyle} {...card}></Card>) }
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
        marginBottom: `${yTranslation}rem`
    };

    const slideStyle = {};

    const pinwheelStyle = {
        WebkitTransition: 'all', // note the capital 'W' here
        msTransition: 'all', // 'ms' is the only lowercase vendor prefix
        transform: `rotate(${10 * rotation}deg)`,
    };

    const style = (props.useStyle === 'fanStyle') ? fanStyle : (props.useStyle === 'slideStyle')? slideStyle : pinwheelStyle;

    return(
    // <Col className='Card' style={props.useStyle ? fanStyle : slideStyle }>
    <Col className='Card' style={style }>
        <img className='CardImage' src={props.shouldShowFront ? props.frontImageSource : props.backImageSource} alt={props.id}  onClick={() => {props.onCardClicked(props.id)}}/>
    </Col>
    )
}

export default CardSet;