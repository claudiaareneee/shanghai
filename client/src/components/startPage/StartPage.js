import React, { useState } from "react";
import "./StartPage.css";
import GameForm from "./GameForm";
import StartSelection from "./StartSelection";
import Header from "../common/Header";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateGame,
  createGame,
  loadGame,
  addPlayerToGame,
} from "../../redux/actions/gameActions";
import {
  createPlayer,
  loadPlayer,
  updatePlayer,
} from "../../redux/actions/playerActions";

function StartPage({
  game,
  player,
  updateGame,
  createGame,
  loadGame,
  createPlayer,
  loadPlayer,
  addPlayerToGame,
  updatePlayer,
  history,
}) {
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
    const _player = await createPlayer({ name: form.name });
    loadPlayer(_player.id);
    localStorage.setItem("uid", _player.id);

    let _game = {};

    if (form.selection === "join") _game = await updateGame({ id: form.room });
    else _game = await createGame({});

    loadGame(_game.id);
    localStorage.setItem("room", game.id);

    updatePlayer({ ..._player, gameId: _game.id });
    addPlayerToGame(_game, _player.id);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    localStorage.setItem("name", form.name);
    localStorage.setItem("room", form.room);

    initializeGameAndAddPlayer();

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

function mapStateToProps(state) {
  return {
    game: state.game,
    player: state.player,
  };
}

const mapDispatchtoProps = {
  createGame,
  updateGame,
  loadGame,
  createPlayer,
  loadPlayer,
  addPlayerToGame,
  updatePlayer,
};

export default connect(mapStateToProps, mapDispatchtoProps)(StartPage);
