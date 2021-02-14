import firebase from "./firebase.config";
import { handleError } from "./apiUtils";
import "firebase/database";
import { scorePlayer } from "../tools";

const database = firebase.database();

const baseUrl = "/prod/";
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
  // console.log(
  //   "updatePlayer: ",
  //   player.name,
  //   " score: ",
  //   player.score,
  //   "player remaining cards: ",
  //   player.numberOfRemainingCards,
  //   "player:",
  //   player
  // );
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

export const cleanUpGetPlayers = (gameId) => {
  const player = firebase
    .database()
    .ref()
    .child(playerBaseUrl + gameId);
  player.off();
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

export const pushCardToPlayerCardsInHand = (id, card) => {
  return database.ref(cardsInHandBaseUrl + id).push(card);
};

export const setNumberOfRemainingCards = (
  gameId,
  id,
  numberOfRemainingCards
) => {
  return database
    .ref()
    .child(playerBaseUrl + gameId + "/" + id)
    .child("numberOfRemainingCards")
    .set(numberOfRemainingCards);
};

export const setBuys = (gameId, id, buys) => {
  return database
    .ref()
    .child(playerBaseUrl + gameId + "/" + id)
    .child("buys")
    .set(buys);
};

export const getPlayerCardsInHandById = (id, onCardsReceived) => {
  const cards = firebase.database().ref(cardsInHandBaseUrl + id);
  cards.on("value", function (snapshot) {
    if (snapshot.val() != null) onCardsReceived(snapshot.val());
  });
};

export async function getPlayerCardsInHandByIdOnce(id, onCardsReceived) {
  const cards = firebase.database().ref(cardsInHandBaseUrl + id);
  const cardsSnapshot = await cards.once("value");
  onCardsReceived(cardsSnapshot.val() || []);
}

export const setPlayerCardsOnTable = (id, gameId, cards) => {
  return database.ref(cardsOnTableBaseUrl + gameId + "/" + id).set(cards);
};

export const getPlayerCardsOnTableById = (gameId, onCardsReceived) => {
  const cards = firebase.database().ref(cardsOnTableBaseUrl + gameId);
  cards.on("value", function (snapshot) {
    if (snapshot.val() != null) onCardsReceived(snapshot.val());
  });
};

export const calculateScores = (gameId, players) => {
  Object.keys(players).forEach((key) => {
    getPlayerCardsInHandByIdOnce(key, (cards) => {
      const newScore = scorePlayer(
        players[key].score || 0,
        cards.map((card) => parseInt(card, 10))
      );
      updatePlayer(gameId, {
        id: players[key].id,
        oldScore: players[key].score || 0,
        score: newScore,
      });
    });
  });
};
