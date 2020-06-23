import React, { useState } from "react";
import "./StartPage.css";
import GameForm from "./GameForm";
import StartSelection from "./StartSelection";
import Header from "../common/Header";
import PropTypes from "prop-types";
import * as gameApi from "../../api/gameApi";
import * as playerApi from "../../api/playerApi";

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

  function formIsValid() {
    const _errors = {};

    if (!form.name) _errors.name = "Name is required";
    if (form.selection === "join" && !form.room)
      _errors.room = "Room is required";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  async function initializeGameAndAddPlayer() {
    const _player = await playerApi.createPlayer({ name: form.name });
    localStorage.setItem("uid", _player.id);

    const _game =
      form.selection === "join"
        ? await gameApi.updateGame({ id: form.room })
        : await gameApi.createGame({});

    localStorage.setItem("room", _game.id);

    playerApi.updatePlayer({ ..._player, gameId: _game.id });
    gameApi.addPlayerToGame(_game, _player.id);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

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
    </div>
  );
}

StartPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default StartPage;
