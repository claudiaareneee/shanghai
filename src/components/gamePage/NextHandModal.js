import React from "react";
import { Modal } from "react-bootstrap";

function NextHandPage() {
  return <>Hand, score, who went out, maybe the cards on the table</>;
}

function NextHandModal(props) {
  const getPersonWhoWentOut = () => {
    Object.values(props.players).filter(
      (player) => player.numberOfRemainingCards === 0
    );
  };
  console.log(props.players);
  console.log(getPersonWhoWentOut());
  return (
    <Modal
      {...props}
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ color: "#282c34" }} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          For better or worse, this hand is over!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#282c34" }}>
        <h4>Champion this round</h4>
        <h4>Scores</h4>
        <p>Hand, score, who went out, maybe the cards on the table</p>
      </Modal.Body>
      <Modal.Footer style={{ color: "#282c34" }}>
        <button className="btn btn-primary" onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default NextHandModal;
