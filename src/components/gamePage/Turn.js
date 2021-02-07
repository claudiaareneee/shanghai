import React from "react";
import { Col, Row, Button } from "react-bootstrap";

function Turn({ turnState, selection, onPlaySelectedYes, onPlaySelectedNo }) {
  return (
    <>
      {selection.selecting === "none" ? (
        <Row>
          <Col>
            <h5>
              It's your turn!
              {turnState === "Draw"
                ? " Select a draw card!"
                : turnState === "Play"
                ? " Play cards or choose which card to discard."
                : turnState === "Discard"
                ? " Click 'Select Discard' to choose which card to discard."
                : ""}
            </h5>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <h5 className="justify-content-center">
              {selection.selecting === "Play"
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

export default Turn;
