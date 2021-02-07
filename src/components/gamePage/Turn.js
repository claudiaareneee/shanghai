import React from "react";
import { Col, Row, Button } from "react-bootstrap";

function Turn({ turnState, selection, onPlaySelectedYes, onPlaySelectedNo }) {
  let message = "";

  if (selection.selecting === "none") {
    switch (turnState) {
      case "Draw":
        message = "It's your turn! Select a draw card!";
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
  //selection.selecting === "none" ?
  return (
    <>
      <Row>
        <Col>
          <div className="d-flex flex-row justify-content-center">
            <h5 className="align-self-center">{message}</h5>
            <Button
              className="btn-primary m-2"
              onClick={onPlaySelectedYes}
              hidden={selection.selecting === "none"}
            >
              Yes
            </Button>
            <Button
              className="btn-primary m-2"
              onClick={onPlaySelectedNo}
              hidden={selection.selecting === "none"}
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
