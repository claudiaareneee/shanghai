import React from "react";
import { Col } from "react-bootstrap";
import CardSources from "./CardSources";
import "../styles/PlayingCard.css";

function PlayingCard(props) {
  const absOffset = Math.abs(props.offset);
  const yTranslation = absOffset * absOffset * (1 / 10.0);
  const rotation = props.offset * 2;

  const setUpStyle = {
    WebkitTransition: "all", // note the capital 'W' here
    msTransition: "all", // 'ms' is the only lowercase vendor prefix
  };

  const styles = {
    fanStyle: {
      transform: `rotate(${rotation}deg) translateY(${yTranslation}rem)`,
      marginBottom: `${yTranslation}rem`,
    },
    slideStyle: {},
    pinwheelStyle: { transform: `rotate(${10 * rotation}deg)` },
    discardStyle: {
      transform: `rotate(${10 * Math.floor(Math.random() * 36)}deg)`,
    },
  };

  return (
    <Col
      className="PlayingCard"
      style={{ ...setUpStyle, ...styles[props.useStyle] }}
    >
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
