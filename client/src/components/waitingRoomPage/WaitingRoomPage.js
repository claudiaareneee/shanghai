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
    // "-MAX5EqhMvTavxEUMqvB": {
    //   gameId: "-MAX5Es7RMXLQ20afczh",
    //   id: "-MAX5EqhMvTavxEUMqvB",
    //   name: "Percy",
    // },
  });
  const [room] = useState(localStorage.getItem("room") || "");

  useEffect(() => {
    console.log(game);
    if (!game.id)
      gameApi.getGameById(localStorage.getItem("room"), (game) => {
        setGame(game);
      });
    else
      playerApi.getPlayers(game.id, (players) => {
        setPlayers(players);
      });
  }, [room, game]);

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
