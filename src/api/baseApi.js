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

  gameApi.clearDiscard(game.id);
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

export async function buyWithId(
  gameId,
  playerId,
  numberOfPlayerCards,
  numberOfDrawCards
) {
  // pop discard and draw and push them to the player who bought
  const discard = await gameApi.popDiscard(gameId, () => {});
  const draw = await gameApi.popDrawCard(gameId, numberOfDrawCards, () => {});

  console.log("draw: ", draw);
  console.log("discard: ", discard);

  playerApi.pushCardToPlayerCardsInHand(playerId, parseInt(discard, 10));
  playerApi.pushCardToPlayerCardsInHand(playerId, draw);
  playerApi.setNumberOfRemainingCards(
    gameId,
    playerId,
    numberOfPlayerCards + 2
  );
}

export const performBuy = (game, currentPlayer, players) => {
  if (!game.buyers) return;

  const buyer = tools.selectBuyer(
    currentPlayer,
    Object.values(game.buyers),
    Object.values(game.opponents)
  );

  console.log(
    "Current Player: ",
    currentPlayer,
    "Buyer: ",
    buyer,
    " players[buyer]: ",
    players[buyer],
    " players[buyer].numberOfRemainingCards: ",
    players[buyer] ? players[buyer].numberOfRemainingCards : "test"
  );

  if (players[buyer])
    buyWithId(
      game.id,
      buyer,
      players[buyer].numberOfRemainingCards || 0,
      game.numberOfDrawCards
    );

  gameApi.clearBuyers(game.id);
};
// export const buyWithId = (gameId, playerId) => {
//   discard = await gameApi.popDiscard()
// }
