import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function Buys({ numberOfBuys, onClick, disabled }) {
  return (
    <>
      {numberOfBuys > 0 ? (
        <Button
          variant="outline-success"
          size="lg"
          onClick={onClick}
          disabled={disabled}
          style={{ margin: "0" }}
        >
          🥕 BUY 🥕
        </Button>
      ) : (
        <p>No buys left</p>
      )}
      <p style={{ padding: "0", margin: "0" }}>({numberOfBuys} left)</p>
    </>
  );
}

Buys.propTypes = {
  numberOfBuys: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Buys;
