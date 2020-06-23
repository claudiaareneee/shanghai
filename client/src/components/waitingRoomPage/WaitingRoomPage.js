import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import PlayerList from "./PlayerList";
import PropTypes from "prop-types";
import "./WaitingRoomPage.css";
import * as gameApi from "../../api/gameApi";
import * as playerApi from "../../api/playerApi";

function WaitingRoomPage({ history }) {
  const [game, setGame] = useState({});
  const [players, setPlayers] = useState({
    "-MAX5EqhMvTavxEUMqvB": {
      gameId: "-MAX5Es7RMXLQ20afczh",
      id: "-MAX5EqhMvTavxEUMqvB",
      name: "Percy",
    },
  });
  const [room] = useState(localStorage.getItem("room") || "");

  useEffect(() => {
    console.log(game);
    if (!game.id)
      gameApi.getGameById(localStorage.getItem("room"), (game) => {
        setGame(game);
      });
  }, [room, game]);

  useEffect(() => {
    console.log("players");
    console.log(players);
    // console.log(game.opponents);

    for (let opponent in game.opponents) {
      if (!players[opponent]) {
        // console.log(game.opponents[opponent]);
        playerApi.getPlayerById(game.opponents[opponent], (player) => {
          console.log({ ...players, [player.id]: { ...player } });
          setPlayers({ ...players, [player.id]: { ...player } });
        });
      }
    }
  }, [game.opponents]);

  function handleClick() {
    history.push("/play");
  }

  return (
    <div className="WaitingRoom">
      <Header />
      <PlayerList
        players={players}
        onClick={handleClick}
        gameId={room || "loading ..."}
      />
    </div>
  );
}

WaitingRoomPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default WaitingRoomPage;
