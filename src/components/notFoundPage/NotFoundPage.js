import React from "react";
import { Link } from "react-router-dom";
import Header from "../common/Header";

function NotFoundPage(props) {
  return (
    <div>
      <Header />
      <p>Uh Oh! Page not found!</p>
      <Link to="/">Return to home</Link>
    </div>
  );
}

export default NotFoundPage;
