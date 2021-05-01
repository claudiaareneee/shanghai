import React from "react";
import { Modal } from "react-bootstrap";

function SettingsModal({
  onHide,
  show,
  onSaveGroupSettings,
  onSaveLocalSettings,
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
          Game settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#282c34" }}>
        <h5>Group Settings</h5>
        <p>This will change the settings for everyone</p>
        <button
          className="btn btn-info"
          onClick={onSaveGroupSettings}
          style={{ marginBottom: "1rem" }}
        >
          Save Group Settings
        </button>
        <h5>Local Settings</h5>
        <p>Nothing here yet</p>
        <button
          className="btn btn-info"
          onClick={onSaveLocalSettings}
          style={{ marginBottom: "1rem" }}
        >
          Save Local Settings
        </button>
      </Modal.Body>
      <Modal.Footer style={{ color: "#282c34" }}>
        <button className="btn btn-primary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default SettingsModal;
