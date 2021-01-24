import React from "react";
import { Row, Col, Table, Modal } from "react-bootstrap";

function NextHandPage() {
  return <>Hand, score, who went out, maybe the cards on the table</>;
}

function ScoreRow({ player }) {
  return (
    <tr>
      <td>{player.name}</td>
      <td>{player.oldScore}32</td>
      <td>{player.score}</td>
    </tr>
  );
}

function ScoreTable({ players }) {
  return (
    <Table style={{ color: "#282c34" }}>
      <thead>
        <tr>
          <th>name</th>
          <th>old score</th>
          <th>new score</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(players).map((player, index) => (
          <ScoreRow player={player} />
        ))}
      </tbody>
    </Table>
  );
}

function NextHandModal({ show, onHide, players }) {
  console.log("NextHandModal players:", players);
  console.log("NextHandModal players values:", Object.values(players));

  return (
    <Modal
      show={show}
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
        <ScoreTable players={players} />
      </Modal.Body>
      <Modal.Footer style={{ color: "#282c34" }}>
        <button className="btn btn-primary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default NextHandModal;
