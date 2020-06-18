import React, { useState } from "react";
import "./StartPage.css";
import GameForm from "./GameForm";
import StartSelection from "./StartSelection";
import Header from "../common/Header";

function StartPage(props) {
  const [errors, setErrors] = useState({});
  const [game, setGame] = useState({
    name: localStorage.getItem("name") || "",
    room: localStorage.getItem("room") || "",
    selection: "",
  });

  function handleChange({ target }) {
    setGame({
      ...game,
      [target.name]: target.value,
    });

    localStorage.setItem(target.name, target.value);
  }

  function handleSelection({ target }) {
    setGame({
      ...game,
      selection: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!game.name) _errors.name = "Name is required";
    if (game.selection === "join" && !game.room)
      _errors.room = "Room is required";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    props.history.push("/WaitingRoom");
  }

  return (
    <div className="">
      <Header />
      <div className="d-flex justify-content-center">
        <div className="GameSelection">
          <StartSelection onSelection={handleSelection} />
          <GameForm
            errors={errors}
            game={game}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default StartPage;
