import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function StartSelection(props) {
  return (
    <Row className="form-row">
      <Col>
        <Button className="col" value="join" onClick={props.onSelection}>
          Join Game
        </Button>
      </Col>
      <Col>
        <Button className="col" value="create" onClick={props.onSelection}>
          Create Game
        </Button>
      </Col>
    </Row>
  );
}

StartSelection.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default StartSelection;
