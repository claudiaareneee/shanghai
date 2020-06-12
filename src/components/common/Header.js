import React from "react";
import { Jumbotron } from "react-bootstrap";
import "./Header.css";

function Header(props) {
  return (
    <Jumbotron className="Header">
      <h1>Shanghai</h1>
    </Jumbotron>
  );
}

export default Header;
