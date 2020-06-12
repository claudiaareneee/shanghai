import React from "react";
import { Col } from "react-bootstrap";
import CardSources from "./CardSources";
import "./PlayingCard.css";
import PropTypes from "prop-types";

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
    placeholderStyle: {},
  };

  const src =
    props.useStyle === "placeholderStyle"
      ? CardSources.placeholder[0]
      : props.showBack
      ? CardSources.backs[Math.floor(props.id / 54)]
      : CardSources.fronts[props.id % 54];

  return (
    <Col
      className="PlayingCard"
      style={{ ...setUpStyle, ...styles[props.useStyle] }}
    >
      <img
        className="CardImage"
        src={src}
        alt={props.id}
        onClick={() => {
          props.onCardClicked(props.id);
        }}
      />
    </Col>
  );
}

PlayingCard.propTypes = {
  id: PropTypes.number.isRequired,
  useStyle: PropTypes.string.isRequired,
  offset: PropTypes.number,
  showBack: PropTypes.bool,
};

PlayingCard.defaultProps = {
  offset: 0,
  showBack: false,
};

export default PlayingCard;
