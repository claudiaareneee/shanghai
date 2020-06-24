import React from "react";
import { Button, Row } from "react-bootstrap";

function Buys({ numberOfBuys }) {
  return (
    <>
      <Row>
        <h3 style={{ textAlign: "left" }}>Buys</h3>
      </Row>
      <Row>
        {numberOfBuys > 0 ? (
          [...Array(numberOfBuys).keys()].map((key) => (
            <Button
              variant="outline-success"
              size="lg"
              key={key}
              style={{ marginRight: ".5rem" }}
            >
              $$$
            </Button>
          ))
        ) : (
          <>
            <Button
              disabled={true}
              variant="outline-success"
              size="lg"
              style={{ marginRight: ".5rem" }}
            >
              $$$
            </Button>
            <p
              className="align-bottom"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              No buys left
            </p>
          </>
        )}
      </Row>
    </>
  );
}

export default Buys;
