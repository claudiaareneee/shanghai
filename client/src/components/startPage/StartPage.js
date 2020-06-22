import React, { useState } from "react";
import "./StartPage.css";
import GameForm from "./GameForm";
import StartSelection from "./StartSelection";
import Header from "../common/Header";
import PropTypes from "prop-types";
import { createGame, loadGame } from "../../redux/actions/gameActions";
import { connect } from "react-redux";

function StartPage({ game, createGame, loadGame, history }) {
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

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    localStorage.setItem("name", form.name);
    localStorage.setItem("room", form.room);

    createGame(form.selection === "join" ? { id: form.room } : {}).then(
      (game) => {
        loadGame(game.id);
      }
    );
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
  };
}

const mapDispatchtoProps = {
  createGame,
  loadGame,
};

export default connect(mapStateToProps, mapDispatchtoProps)(StartPage);
