import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import PlayerList from "./PlayerList";
import PropTypes from "prop-types";
import "./WaitingRoomPage.css";
import { connect } from "react-redux";
import { loadPlayer } from "../../redux/actions/playerActions";
import { loadGame } from "../../redux/actions/gameActions";

function WaitingRoomPage({ game, players, loadGame, loadPlayer, history }) {
  const [room] = useState(localStorage.getItem("room") || "");

  useEffect(() => {
    const playerId = localStorage.getItem("uid");

    if (!players[playerId]) loadPlayer(localStorage.getItem("uid"));
    if (!game.id) loadGame(localStorage.getItem("room"));

    localStorage.getItem("room");
  }, [room]);

  function handleClick() {
    history.push("/play");
  }

  return (
    <div className="WaitingRoom">
      <Header />
      <PlayerList onClick={handleClick} gameId={room || "loading ..."} />
    </div>
  );
}

WaitingRoomPage.propTypes = {
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    game: state.game,
    players: state.players,
  };
}

const mapDispatchtoProps = {
  loadGame,
  loadPlayer,
};

export default connect(mapStateToProps, mapDispatchtoProps)(WaitingRoomPage);
