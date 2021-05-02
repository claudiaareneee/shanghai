import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import TextInput from "../common/TextInput";

function SettingsModal({
  buyTime,
  show,
  onHide,
  onSaveGroupSettings,
  onSaveLocalSettings,
}) {
  const [buyingTimeInput, setBuyingTimeInput] = useState(buyTime);

  const handleBuyingTimeChanged = (event) => {
    const value = event.target.value;

    if (value === "" || (!isNaN(value) && value >= 0 && value <= 60)) {
      setBuyingTimeInput(value);
    }
  };

  return (
    <Modal
      show={show}
      onShow={() => setBuyingTimeInput(buyTime)}
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
        <TextInput
          id="buyingWaitTime"
          name="buyingWaitTime"
          label="Buying wait time"
          inputType="number"
          onChange={handleBuyingTimeChanged}
          value={buyingTimeInput}
          hint={
            "Enter the number of seconds between 0 and 60 for the desired buying time"
          }
        />
        <button
          className="btn btn-info"
          onClick={() => onSaveGroupSettings(buyingTimeInput)}
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
