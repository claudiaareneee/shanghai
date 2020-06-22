import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import PlayerList from "./PlayerList";
import PropTypes from "prop-types";
import "./WaitingRoomPage.css";

function WaitingRoomPage(props) {
  const [room] = useState(localStorage.getItem("room") || "");

  useEffect(() => {
    localStorage.setItem("room", room);
  }, [room]);

  function handleClick() {
    props.history.push("/play");
  }

  return (
    <div className="WaitingRoom">
      <Header />
      <PlayerList onClick={handleClick} gameId={room} />
    </div>
  );
}

WaitingRoomPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default WaitingRoomPage;
