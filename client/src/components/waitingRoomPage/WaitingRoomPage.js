import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import PlayerList from "./PlayerList";
import PropTypes from "prop-types";
import "./WaitingRoomPage.css";
import * as baseApi from "../../api/baseApi";
import * as gameApi from "../../api/gameApi";
import * as playerApi from "../../api/playerApi";

function WaitingRoomPage({ history }) {
  const [numberOfDecks, setNumberOfDecks] = useState("2");
  const [game, setGame] = useState({});
  const [players, setPlayers] = useState({});
  const [room] = useState(localStorage.getItem("room") || "");

  useEffect(() => {
    if (!game.id)
      gameApi.getGameById(localStorage.getItem("room"), (game) => {
        setGame(game);
      });
    else
      playerApi.getPlayers(game.id, (players) => {
        setPlayers(players);
      });
  }, [room, game]);

  function handleClick(event) {
    event.preventDefault();
    if (numberOfDecks !== "") {
      baseApi.setDeal(game, numberOfDecks);
      history.push("/play");
    }
  }

  function handleChange({ target }) {
    setNumberOfDecks(target.value);
  }

  return (
    <div className="WaitingRoom">
      <Header />
      <PlayerList
        players={players}
        numberOfDecks={numberOfDecks}
        onClick={handleClick}
        onChange={handleChange}
        gameId={room || "loading ..."}
      />
    </div>
  );
}

WaitingRoomPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default WaitingRoomPage;
