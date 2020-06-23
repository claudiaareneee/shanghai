import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import PlayerList from "./PlayerList";
import PropTypes from "prop-types";
import "./WaitingRoomPage.css";
import { connect } from "react-redux";
import { loadPlayer } from "../../redux/actions/playerActions";
import { loadGame } from "../../redux/actions/gameActions";

function WaitingRoomPage({ game, player, loadGame, loadPlayer, history }) {
  const [room] = useState(localStorage.getItem("room") || "");

  useEffect(() => {
    if (!game.id) loadGame(localStorage.getItem("room"));
    if (!player.id) loadPlayer(localStorage.getItem("uid"));
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
    player: state.player,
  };
}

const mapDispatchtoProps = {
  loadGame,
  loadPlayer,
};

export default connect(mapStateToProps, mapDispatchtoProps)(WaitingRoomPage);
