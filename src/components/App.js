import React from "react";
import "../styles/App.css";
import CardTable from "./CardTable";
import Sidebar from "./Sidebar";
import { Row, Col } from "react-bootstrap";

function App(props) {
  return (
    <div className="App">
      <Row style={{ width: "100%" }}>
        <Col>
          <CardTable />
        </Col>
        <Col style={{ backgroundColor: "blue" }} xs lg="5">
          <Sidebar />
        </Col>
      </Row>
    </div>
  );
}

export default App;
