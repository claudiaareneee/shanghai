import React from "react";
import { Col } from "react-bootstrap";
import CardSources from "./CardSources";

function PlayingCard(props) {
  const absOffset = Math.abs(props.offset);
  const yTranslation = absOffset * absOffset * (1 / 10.0);
  const rotation = props.offset * 2;

  const fanStyle = {
    WebkitTransition: "all", // note the capital 'W' here
    msTransition: "all", // 'ms' is the only lowercase vendor prefix
    transform: `rotate(${rotation}deg) translateY(${yTranslation}rem)`,
    marginBottom: `${yTranslation}rem`,
  };

  const slideStyle = {};

  const pinwheelStyle = {
    WebkitTransition: "all", // note the capital 'W' here
    msTransition: "all", // 'ms' is the only lowercase vendor prefix
    transform: `rotate(${10 * rotation}deg)`,
  };

  const discardStyle = {
    WebkitTransition: "all", // note the capital 'W' here
    msTransition: "all", // 'ms' is the only lowercase vendor prefix
    transform: `rotate(${10 * Math.floor(Math.random() * 36)}deg)`,
  };

  const style =
    props.useStyle === "fanStyle"
      ? fanStyle
      : props.useStyle === "slideStyle"
      ? slideStyle
      : discardStyle;

  return (
    // <Col className='PlayingCard' style={props.useStyle ? fanStyle : slideStyle }>
    <Col className="PlayingCard" style={style}>
      <img
        className="CardImage"
        src={CardSources.fronts[props.id % 54]}
        alt={props.id}
        onClick={() => {
          props.onCardClicked(props.id);
        }}
      />
    </Col>
  );
}

export default PlayingCard;
