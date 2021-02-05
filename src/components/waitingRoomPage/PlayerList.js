import React from "react";
import { ListGroup } from "react-bootstrap";
import "./PlayerList.css";
import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { Hearts } from "@agney/react-loading";

function PlayerList({
  playerName,
  newName,
  players,
  onClick,
  gameId,
  numberOfDecks,
  onChange,
  onNameChange,
  onClickChange,
  onClickCancel,
}) {
  console.log(players);
  console.log(playerName);
  return (
    <>
      <h2>Room code: {gameId}</h2>
      <Row className="PlayerList justify-content-center">
        <Col md="auto" className="w-50">
          <h4>Players</h4>
          <ListGroup>
            {Object.keys(players).map((key) => (
              <ListGroup.Item key={key} variant="info">
                {players[key].name === playerName ? (
                  <div className="form-inline">
                    <input
                      value={newName}
                      className="form-control mr-2"
                      onChange={onNameChange}
                    />
                    {playerName !== newName ? (
                      <>
                        <button
                          className="btn btn-primary ml-2 mr-2"
                          onClick={onClickChange}
                        >
                          Change Name
                        </button>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={onClickCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  players[key].name
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <p
            className="d-flex justify-content-end"
            style={{
              display: "inline-flex",
              width: "100%",
              justifyContent: "right",
            }}
          >
            Waiting for others to join
            <Hearts width="40" style={{ paddingLeft: "4px" }} />
          </p>

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
