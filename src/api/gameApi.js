import firebase from "./firebase.config";
import { handleError } from "./apiUtils";
import "firebase/database";

const database = firebase.database();

const baseUrl = "/dev/";
const gameBaseUrl = baseUrl + "games/";
const discardBaseUrl = baseUrl + "discard/";
const drawBaseUrl = baseUrl + "draw/";

export const createGame = (game) => {
  const newKey = database.ref().child(gameBaseUrl).push().key;
  const newGame = { ...game, id: newKey };

  return database
    .ref(gameBaseUrl + newKey)
    .set(newGame)
    .then(() => newGame)
    .catch(handleError);
};

export const updateGame = (game) => {
  return database
    .ref(gameBaseUrl + game.id)
    .update({ ...game })
    .then(() => game)
    .catch(handleError);
};

export const addPlayerToGame = (game, playerId) => {
  database
    .ref()
    .child(gameBaseUrl + game.id)
    .child("opponents")
    .push(playerId);
};

export const getGameById = (id, onGamesRecieved) => {
  const game = firebase.database().ref(gameBaseUrl + id);
  game.on("value", function (snapshot) {
    if (snapshot.val() != null) onGamesRecieved(snapshot.val());
  });
};

export const getGameByIdOnce = (id) => {
  return database.ref(gameBaseUrl + id).once("value");
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
    onDiscardReceived(snapshot.val());
  });
};

export const setDraw = (gameId, cards) => {
  return database.ref(drawBaseUrl + gameId).set(cards);
};

export const popDrawCard = (gameId, numberOfDrawCards, onDrawRecieved) => {
  const ref = database.ref(drawBaseUrl + gameId);

  ref
    .orderByKey()
    .limitToLast(1)
    .once("value")
    .then((snapshot) => {
      onDrawRecieved(snapshot.val());
      ref.child(Object.keys(snapshot.val())[0]).remove();
    });

  updateGame({ id: gameId, numberOfDrawCards: numberOfDrawCards - 1 });
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

export const clearDiscard = (gameId) => {
  const ref = database.ref(discardBaseUrl + gameId);
  ref.remove();
};
