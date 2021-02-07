import React from "react";
import { Col, Row, Button } from "react-bootstrap";

function Turn({ selection, onPlaySelectedYes, onPlaySelectedNo }) {
  return (
    <>
      {selection.selecting === "none" ? (
        <Row>
          <Col>
            <h5>It's your turn!</h5>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <h5 className="justify-content-center">
              {selection.selecting === "CardsToPlay"
                ? "Would you like to play selected?"
                : "Would you like to discard selected?"}
            </h5>
            <Button className="btn-primary m-2" onClick={onPlaySelectedYes}>
              Yes
            </Button>
            <Button className="btn-primary m-2" onClick={onPlaySelectedNo}>
              No
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

function OldTurn({ game, player, onTurnButtonClicked }) {
  const canPlay =
    game.turn &&
    (game.turn.state === "playing" || game.turn.state === "discarding");

  return game.turn && game.turn.player === player ? (
    <Col>
      <h3 style={{ textAlign: "right" }}>It's your turn!</h3>
      <Row className="justify-content-end">
        <button
          className="btn btn-danger"
          style={{ marginRight: ".5rem" }}
          onClick={onTurnButtonClicked}
          disabled={!canPlay}
          name="Discard"
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
