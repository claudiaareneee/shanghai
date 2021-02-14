import React, { useState } from "react";
import "./StartPage.css";
import GameForm from "./GameForm";
import StartSelection from "./StartSelection";
import Header from "../common/Header";
import PropTypes from "prop-types";
import * as gameApi from "../../api/gameApi";
import * as playerApi from "../../api/playerApi";
import ForkMeOnGithub from "fork-me-on-github";

function StartPage({ history }) {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: localStorage.getItem("name") || "",
    room: localStorage.getItem("room") || "",
    selection: "",
  });

  function handleChange({ target }) {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  }

  function handleSelection({ target }) {
    setForm({
      ...form,
      selection: target.value,
    });
  }

  function formIsValid(game) {
    const _errors = {};

    if (!form.name) _errors.name = "Name is required";
    if (form.selection === "join" && !form.room)
      _errors.room = "Room is required";
    if (form.selection === "join" && !game)
      _errors.room =
        "This room code is invalid. Please check that it has been inputted correctly";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  async function initializeGameAndAddPlayer() {
    const _game =
      form.selection === "join"
        ? await gameApi.updateGame({ id: form.room })
        : await gameApi.createGame({});

    localStorage.setItem("room", _game.id);

    const _player = await playerApi.createPlayer(_game.id, { name: form.name });
    localStorage.setItem("uid", _player.id);

    gameApi.addPlayerToGame(_game, _player.id);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // TODO: Check for existing name -- this player already exists, would you like to join as them?
    if (form.selection === "create") if (!formIsValid(null)) return;

    if (form.selection === "join") {
      const game = await (await gameApi.getGameByIdOnce(form.room)).val();
      const players = await playerApi.getPlayersOnce(form.room);

      if (!formIsValid(game)) return;

      const existingPlayer = Object.values(players).find(
        (player) => player.name === form.name
      );

      if (existingPlayer) {
        let answer = window.confirm(
          "This player already exists. Would you like to join as this player?"
        );
        if (answer) {
          history.push("/WaitingRoom");
          localStorage.setItem("uid", existingPlayer.id);
          localStorage.setItem("room", game.id);
          localStorage.setItem("name", form.name);
          return;
        }
      } else if (game.hand != null) {
        // Checking if game is in progress
        let answer = window.confirm(
          "This game is already in progress. Would you like to join as a spectator?"
        );
        if (answer) {
          history.push("/WaitingRoom");
          localStorage.setItem("uid", "spectator");
          localStorage.setItem("room", game.id);
        }
        return;
      }
    }

    localStorage.setItem("name", form.name);
    await initializeGameAndAddPlayer();

    history.push("/WaitingRoom");
  }

  return (
    <div className="">
      <Header />
      <div className="d-flex justify-content-center">
        <div className="FormSelection">
          <StartSelection onSelection={handleSelection} />
          <GameForm
            errors={errors}
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <ForkMeOnGithub
        repo="https://github.com/claudiaareneee/shanghai"
        colorBackground="lightblue"
        colorOctocat="black"
      />
    </div>
  );
}

StartPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default StartPage;
