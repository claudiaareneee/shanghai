import * as tools from "../tools";
import * as gameApi from "./gameApi";
import * as playerApi from "./playerApi";

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
      oldScore: 0,
      score: 0,
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
};

export const nextTurn = (game, endHand = false) => {
  const turn = tools.nextTurn(
    tools.snapshotToArray(game.opponents),
    endHand,
    game.turn
  );
  console.log("Turn: ", turn);
  gameApi.updateGame({
    ...game,
    turn,
  });
};

export const setTurn = (game, state) => {
  const turn = { ...game.turn, state };
  console.log("Turn: ", turn);
  gameApi.updateGame({
    ...game,
    turn,
  });
};

export const discardCardWithId = (gameId, playerId, playerCards, card) => {
  gameApi.pushToDiscard(gameId, card);
  playerApi.setPlayerCardsInHand(playerId, gameId, playerCards);
};
