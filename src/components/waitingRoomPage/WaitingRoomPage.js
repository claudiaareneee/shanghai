import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import PlayerList from "./PlayerList";
import PropTypes from "prop-types";
import "./WaitingRoomPage.css";
import * as baseApi from "../../api/baseApi";
import * as gameApi from "../../api/gameApi";
import * as playerApi from "../../api/playerApi";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

function WaitingRoomPage({ history }) {
  const [numberOfDecks, setNumberOfDecks] = useState("2");
  const [game, setGame] = useState({});
  const [players, setPlayers] = useState({});
  const [room] = useState(localStorage.getItem("room") || "");
  const [playerName, setPlayerName] = useState(
    localStorage.getItem("name") || ""
  );
  const [newName, setNewName] = useState(playerName);
  const [redirectToPlayPage, setRedirectToPlayPage] = useState(false);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    if (!game.id) {
      const room = localStorage.getItem("room");
      gameApi.getGameById(room, (game) => {
        setGame(game);
      });

      playerApi.getPlayers(room, (players) => {
        setPlayers(players);
      });
    } else {
      if (!game.decks) setGame({ ...game, decks: numberOfDecks });

      setRedirectToPlayPage(game.turn ? true : false);
    }
    // TODO: re-enable this and figure out why it's not pushing
    // return () => {
    //   gameApi.cleanUpGetGameById(game.id);
    //   playerApi.cleanUpGetPlayers(game.id);
    // };
  }, [room, game, numberOfDecks]);

  function handleClick(event) {
    event.preventDefault();
    if (numberOfDecks !== "") {
      baseApi.setDeal(game);
      history.push("/play");
    }
  }

  function handleChange({ target }) {
    setNumberOfDecks(target.value);
    setGame({ ...game, decks: target.value });
  }

  function handleClickChange() {
    if (!uid) return;

    if (!newName || newName === "") {
      toast.warn("Name cannot be empty");
      return;
    }

    playerApi.updatePlayer(game.id, {
      id: uid,
      name: newName,
    });
    setPlayerName(newName);
    localStorage.setItem("name", newName);
    toast.success("Name changed successfully 🦔!");
  }

  function handleClickCancel() {
    setNewName(playerName);
  }

  return (
    <>
      {redirectToPlayPage && <Redirect to="/play" />}
      <div className="WaitingRoom">
        <Header />
        <PlayerList
          playerName={playerName}
          newName={newName}
          players={players}
          numberOfDecks={numberOfDecks}
          onClick={handleClick}
          onChange={handleChange}
          onNameChange={({ target }) => {
            setNewName(target.value);
          }}
          onClickChange={handleClickChange}
          onClickCancel={handleClickCancel}
          gameId={room || "loading ..."}
        />
      </div>
    </>
  );
}

WaitingRoomPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default WaitingRoomPage;
