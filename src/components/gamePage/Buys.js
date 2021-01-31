import React from "react";
import { Button, Row } from "react-bootstrap";
import PropTypes from "prop-types";

function Buys({ numberOfBuys, onClick, disabled }) {
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
              onClick={onClick}
              disabled={disabled}
              style={{ marginRight: ".5rem" }}
            >
              $$$
            </Button>
          ))
        ) : (
          <>
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

Buys.propTypes = {
  numberOfBuys: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Buys;
