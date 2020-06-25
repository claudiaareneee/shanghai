import React from "react";
import { Col, Row } from "react-bootstrap";

function Turn({
  game,
  player,
  onDrawClicked,
  onPlayClicked,
  onDiscardClicked,
}) {
  const canDraw = game.turn && game.turn.state === "drawing";
  const canPlay = game.turn && game.turn.state === "playing";
  const canDiscard =
    game.turn &&
    (game.turn.state === "playing" || game.turn.state === "discarding");

  return game.turn && game.turn.player === player ? (
    <Col>
      <h3 style={{ textAlign: "right" }}>It's your turn!</h3>
      <Row className="justify-content-end">
        <button
          className="btn btn-success"
          style={{ marginRight: ".5rem" }}
          onClick={onDrawClicked}
          disabled={!canDraw}
        >
          Draw
        </button>
        <button
          className="btn btn-primary"
          style={{ marginRight: ".5rem" }}
          onClick={onPlayClicked}
          disabled={!canPlay}
        >
          Play
        </button>
        <button
          className="btn btn-danger"
          style={{ marginRight: ".5rem" }}
          onClick={onDiscardClicked}
          disabled={!canDiscard}
        >
          Discard
        </button>
      </Row>
    </Col>
  ) : (
    <></>
  );
}

export default Turn;
