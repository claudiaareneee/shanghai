import * as tools from "../tools";
import * as gameApi from "./gameApi";
import * as playerApi from "./playerApi";
import firebase from "./firebase.config";
import "firebase/database";

const database = firebase.database();

const baseUrl = "/dev/";
const commentsUrl = baseUrl + "comments/";

export const setDeal = (game, numberOfDecks) => {
  const deal = tools.dealCards(game.opponents, numberOfDecks);
  const turn = tools.nextTurn(tools.snapshotToArray(game.opponents));

  for (let playerId in game.opponents) {
    playerApi.setPlayerCardsInHand(
      game.opponents[playerId],
      game.id,
      deal.players[playerId]
    );

    playerApi.updatePlayer(game.id, {
      id: game.opponents[playerId],
      buys: 3,
      numberOfRemainingCards: 11,
    });
  }

  gameApi.setDraw(game.id, deal.draw);
  gameApi.updateGame({
    ...game,
    hand: tools.getHand(game.hand ? game.hand.round : 0),
    turn,
    numberOfDrawCards: deal.draw.length,
  });

  gameApi.clearDiscard(game.id);
  gameApi.clearCardsOnTable(game.id);
};

export const nextTurn = (game, endHand = false) => {
  const turn = tools.nextTurn(
    tools.snapshotToArray(game.opponents),
    endHand,
    game.turn
  );
  gameApi.updateGame({
    ...game,
    turn,
  });
};

export const setTurn = (game, state) => {
  const turn = { ...game.turn, state };
  gameApi.updateGame({
    ...game,
    turn,
  });
};

export const discardCardWithId = (gameId, playerId, playerCards, card) => {
  gameApi.pushToDiscard(gameId, card);
  playerApi.setPlayerCardsInHand(playerId, gameId, playerCards);
};

export async function buyWithId(
  gameId,
  playerId,
  numberOfPlayerCards,
  numberOfDrawCards,
  numberOfBuys
) {
  // pop discard and draw and push them to the player who bought
  const discard = await gameApi.popDiscard(gameId, () => {});
  const draw = await gameApi.popDrawCard(gameId, numberOfDrawCards, () => {});

  playerApi.pushCardToPlayerCardsInHand(playerId, parseInt(discard, 10));
  playerApi.pushCardToPlayerCardsInHand(playerId, draw);
  playerApi.setNumberOfRemainingCards(
    gameId,
    playerId,
    numberOfPlayerCards + 2
  );
  playerApi.setBuys(gameId, playerId, numberOfBuys - 1);
}

export const performBuy = (game, currentPlayer, players) => {
  if (!game.buyers) return;

  const buyer = tools.selectBuyer(
    currentPlayer,
    Object.values(game.buyers),
    Object.values(game.opponents)
  );

  if (players[buyer])
    buyWithId(
      game.id,
      buyer,
      players[buyer].numberOfRemainingCards || 0,
      game.numberOfDrawCards,
      players[buyer].buys || 0
    );

  gameApi.clearBuyers(game.id);
};

export const addComment = (gameId, playerId, comment) => {
  return database.ref(commentsUrl + gameId + "-" + playerId).push(comment);
};
