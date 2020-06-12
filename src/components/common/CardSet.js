import React from "react";
import "./CardSet.css";
import PlayingCard from "./PlayingCard";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";

function CardSet(props) {
  const offset = Math.floor(props.cards.length / 2.0);
  const className = `CardSet ${props.useStyle}`;

  return (
    <div className={className}>
      <Row>
        {props.cards.map((card, index) => (
          <PlayingCard
            key={card}
            id={card}
            onCardClicked={props.onCardClicked}
            offset={index - offset}
            useStyle={props.useStyle}
            showBack={props.showBack}
          />
        ))}
      </Row>
    </div>
  );
}

CardSet.propTypes = {
  onCardClicked: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.number).isRequired,
  useStyle: PropTypes.string,
  showBack: PropTypes.bool,
};

CardSet.defaultProps = {
  onCardClicked: () => {},
  useStyle: "fanStyle",
  showBack: false,
};

export default CardSet;
