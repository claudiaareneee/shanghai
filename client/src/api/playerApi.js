import firebase from "./firebase.config";
import "firebase/database";

const database = firebase.database();

const baseUrl = "/dev/";
const playerBaseUrl = baseUrl + "players/";
const cardsInHandBaseUrl = baseUrl + "cardsInHand/";
const cardsOnTableBaseUrl = baseUrl + "cardsOnTable/";

export const createPlayer = (player) => {
  const newKey = database.ref().child(playerBaseUrl).push().key;
  const newPlayer = { ...player, id: newKey };

  database.ref(playerBaseUrl + newKey).set(newPlayer);
  return newPlayer;
};

export const updatePlayer = (player) => {
  return database.ref(playerBaseUrl + player.id).update({ ...player });
};

export const getPlayerById = (id, onPlayerReceived) => {
  const player = firebase.database().ref(playerBaseUrl + id);
  player.on("value", function (snapshot) {
    if (snapshot.val() != null) onPlayerReceived(snapshot.val());
  });
};

export const setPlayerCardsInHand = (id, cards) => {
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
