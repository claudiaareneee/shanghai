import React from "react";
import { Table, Modal } from "react-bootstrap";

function ScoreRow({ player }) {
  return (
    <tr>
      <td>{player.name}</td>
      <td>{player.oldScore || 0}</td>
      <td>{player.score || 0}</td>
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
          <ScoreRow player={player} key={player.name} />
        ))}
      </tbody>
    </Table>
  );
}

function NextHandModal({
  gameId,
  show,
  players,
  turnState,
  onHide,
  onNextHandClick,
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
          Game stats
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#282c34" }}>
        {/* <h4>Champion this round</h4>
        <h4>Scores</h4> */}
        <h4>Room Code</h4>
        <p>{gameId}</p>
        <h4>Scores</h4>
        <p>Hand, score, who went out, maybe the cards on the table</p>
        <ScoreTable players={players} />
      </Modal.Body>
      <Modal.Footer style={{ color: "#282c34" }}>
        {turnState === "EndOfHand" ? (
          <button className="btn btn-success" onClick={onNextHandClick}>
            Next Hand
          </button>
        ) : (
          <></>
        )}
        <button className="btn btn-primary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default NextHandModal;
