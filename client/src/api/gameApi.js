import firebase from "./firebase.config";
import * as tools from "../tools";
import "firebase/database";

const database = firebase.database();

const baseUrl = "/dev/";
const gameBaseUrl = baseUrl + "games/";
const discardBaseUrl = baseUrl + "discard/";
const drawBaseUrl = baseUrl + "draw/";

export const createGame = (game) => {
  const newKey = database.ref().child(gameBaseUrl).push().key;
  const newGame = { ...game, id: newKey };

  database.ref(gameBaseUrl + newKey).set(newGame);
  return newGame;
};

export const updateGame = (game) => {
  return database.ref(gameBaseUrl + game.id).update({ ...game });
};

export const addPlayerToGame = (game, player) => {
  database
    .ref()
    .child(gameBaseUrl + game.id)
    .child("opponents")
    .push(player);
};

export const getGameById = (id, onGamesRecieved) => {
  const game = firebase.database().ref(gameBaseUrl + id);
  game.on("value", function (snapshot) {
    if (snapshot.val() != null) onGamesRecieved(snapshot.val());
  });
};

export const setDiscard = (gameId, cards) => {
  return database.ref(discardBaseUrl + gameId).set(cards);
};

export const pushToDiscard = (gameId, card) => {
  return database.ref(discardBaseUrl + gameId).push(card);
};

export const getDiscard = (gameId, onDiscardReceived) => {
  const discard = firebase.database().ref(discardBaseUrl + gameId);
  discard.on("value", function (snapshot) {
    // if (snapshot.val() != null) onDiscardReceived(snapshot.val());
    onDiscardReceived(tools.snapshotToArray(snapshot.val()));
  });
};

export const setDraw = (gameId, cards) => {
  return database.ref(drawBaseUrl + gameId).set(cards);
};

export const popDrawCard = (gameId, onDrawRecieved) => {
  const ref = database.ref(drawBaseUrl + gameId);

  ref
    .orderByKey()
    .limitToLast(1)
    .once("value")
    .then((snapshot) => {
      onDrawRecieved(snapshot.val());
      ref.child(Object.keys(snapshot.val())[0]).remove();
    });
};

export const popDiscard = (gameId, onDiscardReceived) => {
  const ref = database.ref(discardBaseUrl + gameId);

  ref
    .orderByKey()
    .limitToLast(1)
    .once("value")
    .then((snapshot) => {
      onDiscardReceived(snapshot.val());
      ref.child(Object.keys(snapshot.val())[0]).remove();
    });
};
