import React from "react";
import { Row, Modal } from "react-bootstrap";
import LogMessage from "../common/LogMessage";

function LogModal({ show, onHide, logEntries }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ color: "#282c34" }} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* For better or worse, this hand is over! */}
          Game Log
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        scrollable
        style={{ color: "#282c34", paddingLeft: "2rem", paddingRight: "2rem" }}
      >
        {logEntries.map((logEntry, index) => (
          <Row key={index}>
            <LogMessage logEntry={logEntry} />
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer style={{ color: "#282c34" }}>
        <button className="btn btn-primary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogModal;
