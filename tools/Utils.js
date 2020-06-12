function createGame() {
  return { table: { turn: "PREGAME", hand: 0, players: [] }, players: [] };
}

function addPlayerToGame(game, player) {
  game.table.players.push({ id: player.id, playedCards: [], score: 0 });
  game.players.push({ ...player, remainingBuys: 3 });
}

function shuffle(deck) {
  //   TODO: Is this best practice or should i use a new variable
  for (let i = 0; i < deck.length; i++) {
    const newIndex = Math.floor(Math.random() * deck.length);
    const temp = deck[i];

    deck[i] = deck[newIndex];
    deck[newIndex] = temp;
  }
  return deck;
}

function addDeckToGame(game) {
  let numberOfCards = Math.ceil((game.players.length - 1) / 2) * 52;
  let deck = [...Array(numberOfCards).keys()];

  deck = [...shuffle(deck)];

  for (const i in game.players) {
    game.players[i].cards = deck.splice(0, 11);
  }

  game.table.draw = [...deck];
  game.table.discard = [];

  return { ...game };
}

function dummy() {
  const game = createGame();
  addPlayerToGame(game, { id: "22123", name: "Claudia" });
  addPlayerToGame(game, { id: "13123", name: "Roz" });
  addPlayerToGame(game, { id: "12423", name: "Becky" });
  addPlayerToGame(game, { id: "12153", name: "Will" });
  addPlayerToGame(game, { id: "12126", name: "Billy" });
  addDeckToGame(game);
  return game;
}
