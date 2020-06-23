import React from "react";
import { ListGroup } from "react-bootstrap";
import "./PlayerList.css";
import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";

function PlayerList({ players, onClick, gameId, numberOfDecks, onChange }) {
  return (
    <>
      <h2>Room code: {gameId}</h2>
      <Row className="PlayerList justify-content-center">
        <Col md="auto" className="w-50">
          <h4>Players</h4>
          <ListGroup>
            {Object.keys(players).map((key) => (
              <ListGroup.Item key={key} variant="info">
                {players[key].name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <p>Waiting for others to join...</p>
          <form onSubmit={onClick}>
            <div className="form-group row">
              <label htmlFor="numberOfDecks" className="col-sm">
                Number of decks
              </label>
              <div className="col-sm">
                <input
                  id="numberOfDecks"
                  type="number"
                  className="form-control"
                  value={numberOfDecks}
                  placeholder="number of decks"
                  onChange={onChange}
                />
              </div>
            </div>
            <Button type="submit" className="float-right">
              {"Everybody's in!"}
            </Button>
          </form>
        </Col>
      </Row>
    </>
  );
}

PlayerList.propTypes = {
  gameId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  players: PropTypes.object,
};

PlayerList.defaultProps = {
  players: {},
};

export default PlayerList;
