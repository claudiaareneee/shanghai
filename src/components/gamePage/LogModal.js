import React from "react";
import { Table, Row, Modal } from "react-bootstrap";
import { GAME_EVENTS } from "../common/Constants";
import * as tools from "./../../tools";

function LogMessage({ logEntry }) {
  const card = logEntry.card
    ? tools.getLongCardNameFromId(parseInt(logEntry.card, 10))
    : "";
  const color = card.includes("♥️") || card.includes("♦️") ? "red" : "black";

  switch (logEntry.gameEvent) {
    case GAME_EVENTS.moveToNextHand:
      return (
        <p>
          <strong style={{ color: "blue" }}>{logEntry.player}</strong> clicked
          next hand
        </p>
      );

    case GAME_EVENTS.drewDrawPile:
      return (
        <p>
          <strong style={{ color: "blue" }}>{logEntry.player}</strong> drew from
          the <strong style={{ color: "orange" }}>draw</strong> pile
        </p>
      );

    case GAME_EVENTS.drewDiscardPile:
      return (
        <p>
          <strong style={{ color: "blue" }}>{logEntry.player}</strong> drew a{" "}
          <strong style={{ color }}>{card}</strong> from the{" "}
          <strong style={{ color: "orange" }}>discard</strong> pile
        </p>
      );

    case GAME_EVENTS.drewJoker:
      return (
        <p>
          <strong style={{ color: "blue" }}>{logEntry.player}</strong> drew a{" "}
          <strong>Joker</strong> from{" "}
          <strong style={{ color: "orange" }}>{logEntry.opponent}</strong>
        </p>
      );
    case GAME_EVENTS.laidDown:
      return (
        <p>
          <strong style={{ color: "blue" }}>{logEntry.player}</strong> laid down
        </p>
      );
    case GAME_EVENTS.discard:
      return (
        <p>
          <strong style={{ color: "blue" }}>{logEntry.player}</strong> discarded
          a <strong style={{ color }}>{card}</strong>
        </p>
      );
    default:
      return <></>;
  }
}

function LogModal({ show, onHide, logEntries }) {
  console.log("logEntries:", logEntries);
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
      <Modal.Body style={{ color: "#282c34" }}>
        {logEntries.map((logEntry) => (
          <Row>
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
