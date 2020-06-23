import * as tools from "../tools";
import * as gameApi from "./gameApi";
import * as playerApi from "./playerApi";

export const setDeal = (game, numberOfDecks) => {
  const deal = tools.dealCards(game.opponents, numberOfDecks);

  for (let playerId in game.opponents)
    playerApi.setPlayerCardsInHand(
      game.opponents[playerId],
      deal.players[playerId]
    );

  gameApi.setDraw(game.id, deal.draw);
  gameApi.updateGame({ ...game, hand: tools.getHand(game.hand || 0) });
};

export const discardCardWithId = (gameId, playerId, playerCards, card) => {
  gameApi.pushToDiscard(gameId, card);
  playerApi.setPlayerCardsInHand(playerId, playerCards);
};
