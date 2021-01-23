import React from "react";
import { Button } from "react-bootstrap";
import CardSlide from "../common/CardSlide";

function CardSelection({ hand, cards }) {
  //   const test = [[], [1, 2, 3, 4, 5], [45, 46, 47]];
  return (
    <>
      <div className="cards" style={{ display: "flex" }}>
        {[...Array(3)].map((set, index) => {
          return (
            <CardSlide
              key={index}
              //   onCardClicked={onCardClicked}
              //   cards={test[index]}
              useStyle="slideStyle"
            />
          );
        })}
      </div>
    </>
  );
}

export default CardSelection;
