import React from "react";
import { Table, Modal } from "react-bootstrap";

function GameStatsModal({
  gameId,
  show,
  players,
  comment,
  onHide,
  onSubmitComment,
  onCommentChange,
}) {
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
      <Modal.Body style={{ color: "#282c34" }}></Modal.Body>
      <Modal.Footer style={{ color: "#282c34" }}>
        <button className="btn btn-primary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default GameStatsModal;
