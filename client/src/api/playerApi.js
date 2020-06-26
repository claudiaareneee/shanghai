import firebase from "./firebase.config";
import { handleError } from "./apiUtils";
import "firebase/database";

const database = firebase.database();

const baseUrl = "/dev/";
const playerBaseUrl = baseUrl + "players/";
const cardsInHandBaseUrl = baseUrl + "cardsInHand/";
const cardsOnTableBaseUrl = baseUrl + "cardsOnTable/";

export const createPlayer = (gameId, player) => {
  const newKey = database.ref().child(playerBaseUrl).child(gameId).push().key;
  const newPlayer = { ...player, id: newKey };

  return database
    .ref()
    .child(playerBaseUrl + gameId + "/" + newKey)
    .set(newPlayer)
    .then(() => newPlayer)
    .catch(handleError);
};

export const updatePlayer = (gameId, player) => {
  return database
    .ref()
    .child(playerBaseUrl + gameId + "/" + player.id)
    .update({ ...player });
};

export const getPlayers = (gameId, onPlayersReceived) => {
  const player = firebase
    .database()
    .ref()
    .child(playerBaseUrl + gameId);
  player.on("value", function (snapshot) {
    if (snapshot.val() != null) onPlayersReceived(snapshot.val());
  });
};

export const getPlayerById = (playerId, gameId, onPlayerReceived) => {
  const player = firebase
    .database()
    .ref()
    .child(playerBaseUrl + gameId + "/" + playerId);
  player.on("value", function (snapshot) {
    if (snapshot.val() != null) onPlayerReceived(snapshot.val());
  });
};

export const setPlayerCardsInHand = (id, gameId, cards) => {
  updatePlayer(gameId, { id, numberOfRemainingCards: cards.length });
  return database.ref(cardsInHandBaseUrl + id).set(cards);
};

export const getPlayerCardsInHandById = (id, onCardsReceived) => {
  const cards = firebase.database().ref(cardsInHandBaseUrl + id);
  cards.on("value", function (snapshot) {
    if (snapshot.val() != null) onCardsReceived(snapshot.val());
  });
};

export const setPlayerCardsOnTable = (id, cards) => {
  return database.ref(cardsOnTableBaseUrl + id).set(cards);
};

export const getPlayerCardsOnTableById = (id, onCardsReceived) => {
  const cards = firebase.database().ref(cardsOnTableBaseUrl + id);
  cards.on("value", function (snapshot) {
    if (snapshot.val() != null) onCardsReceived(snapshot.val());
  });
};
