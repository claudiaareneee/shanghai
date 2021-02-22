import React from "react";
import { Table, Modal } from "react-bootstrap";

function ScoreTable({ players }) {
  const playerOneScore = Object.values(players)[0].score;
  const playerArray = Object.values(players);

  return (
    <Table
      className="table table-sm table-striped table-bordered"
      style={{ color: "#282c34" }}
    >
      <thead>
        <tr>
          <th scope="col">Round</th>
          {playerArray.map((player) => (
            <th scope="col">{player.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {playerOneScore ? (
          playerOneScore.map((_, index) => {
            return (
              <tr>
                <th scope="row">{index}</th>
                {playerArray.map((player) => (
                  <td>{player.score[index]}</td>
                ))}
              </tr>
            );
          })
        ) : (
          <></>
        )}
        <tr>
          <th scope="row">Totals</th>
          {playerArray.map((player) => (
            <td>
              <strong>{player.scoreTotal || 0}</strong>
            </td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
}

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
          Game stats
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#282c34" }}>
        {/* <h5>Champion this round</h5>
        <h5>Scores</h5> */}
        <h5>Room Code</h5>
        <p>{gameId}</p>
        <h5>Scores</h5>
        <ScoreTable players={players} />
        <h5>Comments</h5>
        <p>
          Here's a place to add a comment 💬 or suggestion 💡 or to report a bug
          🐛
        </p>
        <textarea
          className="form-control"
          rows={3}
          value={comment}
          onChange={onCommentChange}
          style={{ marginBottom: "1rem" }}
        />
        <button
          className="btn btn-info"
          onClick={onSubmitComment}
          style={{ marginBottom: "1rem" }}
        >
          Submit
        </button>
        <p>
          See this project on Github at{" "}
          <a
            href="https://github.com/claudiaareneee/shanghai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Claudiaareneee/Shanghai
          </a>
          .
        </p>
      </Modal.Body>
      <Modal.Footer style={{ color: "#282c34" }}>
        <button className="btn btn-primary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default GameStatsModal;
