import firebase from "./firebase.config";
import { handleError } from "./apiUtils";
import "firebase/database";

const database = firebase.database();

const baseUrl = "/dev/";
const gameBaseUrl = baseUrl + "games/";
const discardBaseUrl = baseUrl + "discard/";
const drawBaseUrl = baseUrl + "draw/";
const cardsOnTableBaseUrl = baseUrl + "cardsOnTable/";
const logBaseUrl = baseUrl + "gameLog/";

export const createGame = (game) => {
  const newKey = database.ref().child(gameBaseUrl).push().key;
  const newGame = { ...game, id: newKey, buyTime: 15 };

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
  game.on("value", (snapshot) => {
    if (snapshot.val() != null) onGamesRecieved(snapshot.val());
  });
};

export const cleanUpGetGameById = (id) => {
  const game = firebase.database().ref(gameBaseUrl + id);
  game.off();
};

export const getGameByIdOnce = (id) => {
  return database.ref(gameBaseUrl + id).once("value");
};

export const setNextTurn = (id, turn) => {
  return database
    .ref(gameBaseUrl + id)
    .child("turn")
    .set(turn);
};

export const setDiscard = (gameId, cards) => {
  return database.ref(discardBaseUrl + gameId).set(cards);
};

export const pushToDiscard = (gameId, card) => {
  return database.ref(discardBaseUrl + gameId).push(card);
};

export const getDiscard = (gameId, onDiscardReceived) => {
  const discard = firebase.database().ref(discardBaseUrl + gameId);
  discard.on("value", (snapshot) => {
    onDiscardReceived(snapshot.val());
  });
};

export const setDraw = (gameId, cards) => {
  return database.ref(drawBaseUrl + gameId).set(cards);
};

export async function popDrawCard(gameId, numberOfDrawCards, onDrawRecieved) {
  const ref = database.ref(drawBaseUrl + gameId);

  const drawSnapshot = await ref.orderByKey().limitToLast(1).once("value");
  const draw = drawSnapshot.val();

  onDrawRecieved(draw);

  ref.child(Object.keys(draw)[0]).remove();
  updateGame({ id: gameId, numberOfDrawCards: numberOfDrawCards - 1 });

  return Object.values(draw)[0];
}

export async function popDiscard(gameId, onDiscardReceived) {
  const ref = database.ref(discardBaseUrl + gameId);

  const discardSnapshot = await ref.orderByKey().limitToLast(1).once("value");
  const discard = discardSnapshot.val();

  onDiscardReceived(discard);

  ref.child(Object.keys(discard)[0]).remove();
  return Object.values(discard)[0];
}

export const clearDiscard = (gameId) => {
  const ref = database.ref(discardBaseUrl + gameId);
  ref.remove();
};

export const clearCardsOnTable = (gameId) => {
  const ref = database.ref(cardsOnTableBaseUrl + gameId);
  ref.remove();
};

export const pushBuyer = (gameId, playerId) => {
  return database
    .ref(gameBaseUrl + gameId)
    .child("buyers")
    .push(playerId);
};

export async function clearBuyers(gameId) {
  const ref = database.ref(gameBaseUrl + gameId).child("buyers");
  const buyersSnap = await ref.once("value");
  Object.keys(buyersSnap.val()).forEach((buyer) => ref.child(buyer).remove());
}

export const clearBuyer = (gameId, playerId) => {
  return database
    .ref(gameBaseUrl + gameId)
    .child("buyers")
    .child(playerId)
    .remove();
};

export const clearLogs = (gameId) => {
  return database.ref(logBaseUrl + gameId).remove();
};

export const pushLogEntry = (gameId, logEntry) => {
  database.ref(logBaseUrl + gameId).push(logEntry);
};

export const getLogEntriesById = (gameId, onLogEntries) => {
  database.ref(logBaseUrl + gameId).on("value", (snapshot) => {
    if (snapshot.val() != null) onLogEntries(snapshot.val());
  });
};

export const setBuyTime = (gameId, newBuyTime) => {
  return database
    .ref(gameBaseUrl + gameId)
    .update({ buyTime: newBuyTime })
    .catch(handleError);
};
