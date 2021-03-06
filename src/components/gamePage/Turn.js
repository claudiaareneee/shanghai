import React from "react";
import { Col, Row, Button } from "react-bootstrap";

function Turn({
  turnState,
  selection,
  drawingJoker,
  timer,
  onPlaySelectedYes,
  onPlaySelectedNo,
  onDrawJokerYes,
  onDrawJokerNo,
}) {
  const hideButtons =
    (selection.selecting === "none" && !drawingJoker.isDrawing) || timer > 0;

  let message = "";

  if (drawingJoker.isDrawing && timer === 0) {
    message = "Draw Joker?";
  } else if (selection.selecting === "none") {
    switch (turnState) {
      case "Draw":
        if (timer <= 0) message = "It's your turn! Select a draw card!";
        else message = `Waiting for buyers (${timer} seconds left...)`;
        break;
      case "Play":
        message = "Play cards or choose which card to discard.";
        break;
      case "Discard":
        message = "Click 'Select Discard' to choose which card to discard.";
        break;
      default:
        message = "";
        break;
    }
  } else {
    message =
      selection.selecting === "Play"
        ? "Would you like to play selected?"
        : "Would you like to discard selected?";
  }

  return (
    <>
      <Row>
        <Col>
          <div className="d-flex flex-row justify-content-center">
            <h5 className="align-self-center">{message}</h5>
            <Button
              className="btn-primary m-2"
              onClick={
                drawingJoker.isDrawing ? onDrawJokerYes : onPlaySelectedYes
              }
              hidden={hideButtons}
            >
              Yes
            </Button>
            <Button
              className="btn-primary m-2"
              onClick={
                drawingJoker.isDrawing ? onDrawJokerNo : onPlaySelectedNo
              }
              hidden={hideButtons}
            >
              No
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Turn;
