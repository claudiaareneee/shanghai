import React from "react";
import { GAME_EVENTS } from "./Constants";
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
      // todo: say from which pile
      return (
        <p>
          <strong style={{ color: "blue" }}>{logEntry.player}</strong> drew a{" "}
          <strong>Joker</strong> from{" "}
          <strong style={{ color: "blue" }}>{logEntry.opponent}</strong>
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
    case GAME_EVENTS.playedCards:
      //Todo: say which cards
      return (
        <p>
          <strong style={{ color: "blue" }}>{logEntry.player}</strong> played
          cards on{" "}
          <strong style={{ color: "blue" }}>{logEntry.opponent}</strong>
        </p>
      );
    case GAME_EVENTS.wentOut:
      return (
        <p>
          <strong style={{ color: "blue" }}>{logEntry.player}</strong>{" "}
          <strong style={{ color: "green" }}>went out!!</strong>
        </p>
      );
    case GAME_EVENTS.gameStarted:
      return (
        <p>
          <strong>
            Game started. Best of luck, and let the games begin 😈!
          </strong>
        </p>
      );

    case GAME_EVENTS.wantsToBuy:
      return (
        <p>
          <strong style={{ color: "blue" }}>{logEntry.player}</strong> wants to
          buy a <strong style={{ color }}>{card}</strong>
        </p>
      );
    case GAME_EVENTS.bought:
      return (
        <p>
          <strong style={{ color: "blue" }}>{logEntry.player}</strong> bought a{" "}
          <strong style={{ color }}>{card}</strong>
        </p>
      );

    default:
      return <></>;
  }
}
export default LogMessage;
