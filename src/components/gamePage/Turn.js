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
