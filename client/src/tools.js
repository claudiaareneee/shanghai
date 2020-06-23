export const snapshotToArray = (snapshot) =>
  Object.entries(snapshot).map((e) => e[1]);

export const getHand = (round) => {
  switch (round) {
    case 0:
      return { round: round + 1, books: 2, runs: 0 };
    case 1:
      return { round: round + 1, books: 1, runs: 1 };
    case 2:
      return { round: round + 1, books: 0, runs: 2 };
    case 3:
      return { round: round + 1, books: 3, runs: 0 };
    case 4:
      return { round: round + 1, books: 2, runs: 1 };
    case 5:
      return { round: round + 1, books: 1, runs: 2 };
    case 6:
      return { round: round + 1, books: 3, runs: 0 };
    default:
      return { round: round + 1, books: 0, runs: 0 };
  }
};

export const shuffle = (deck) => {
  //   TODO: Is this best practice or should i use a new variable
  for (let i = 0; i < deck.length; i++) {
    const newIndex = Math.floor(Math.random() * deck.length);
    const temp = deck[i];

    deck[i] = deck[newIndex];
    deck[newIndex] = temp;
  }
  return deck;
};

export function dealCards(opponents, numberOfDecks) {
  const deck = [...shuffle([...Array(54 * numberOfDecks).keys()])];
  const deal = {};

  for (let playerId in opponents) deal.players[playerId] = deck.splice(0, 11);

  deal.draw = [...deck];
  return deal;
}

export const nextTurn = (opponents, turn = {}) => {
  let state = "";
  let playerIndex = turn.player ? opponents.indexOf(turn.player) : 0;
  let player = turn.player;

  if (turn.state === "draw") state = "play";
  else if (turn.state === "play") state = "discard";
  else if (turn.state === "discard") {
    state = "draw";
    player = opponents[(playerIndex + 1) % opponents.length];
  } else {
    state = "draw";
    player = opponents[0];
  }

  return { player, state };
};
