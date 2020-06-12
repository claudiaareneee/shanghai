import React from "react";
import { ListGroup } from "react-bootstrap";
import "./PlayerList.css";

const players = [
  { name: "Marilynn" },
  { name: "Nancy" },
  { name: "Sandy" },
  { name: "Jacqueline" },
  { name: "Vanessa" },
];

function PlayerList(props) {
  return (
    <ListGroup>
      {players.map((player) => (
        <ListGroup.Item variant="info">{player.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default PlayerList;
