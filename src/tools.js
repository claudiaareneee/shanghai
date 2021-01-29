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
  const deal = { players: {}, draw: [] };

  for (let playerId in opponents) deal.players[playerId] = deck.splice(0, 11);

  deal.draw = [...deck];
  return deal;
}

export const nextTurn = (opponents, endOfHand, turn = {}) => {
  let state = "";
  let playerIndex = turn.player ? opponents.indexOf(turn.player) : 0;
  let player = turn.player;

  if (endOfHand) return { player: "End of Hand", state: "endOfHand" };

  if (turn.state === "drawing") state = "playing";
  else if (turn.state === "playing") state = "discarding";
  else if (turn.state === "discarding") {
    state = "drawing";
    player = opponents[(playerIndex + 1) % opponents.length];
  } else {
    state = "drawing";
    player = opponents[0];
  }

  return { player, state };
};

export const scorePlayer = (playerScore, cards) => {
  // 54 cards in one deck, A, 2, 3, ..., J, Q, K
  console.log("testing cards: ", cards);
  const newScore = cards.reduce((p, c) => p + getPointsOfCard(c), 0);

  return playerScore + newScore;
};

export const getLongCardNameFromId = (card) => {
  // c, h, s, d, j
  // A, 2, 3, ..., J, Q, K

  const id = card % 54;
  return getCardNumber(id) + getSuit(id);
};

export const getSuit = (card) => {
  if (card < 13) return "♣";
  else if (card < 26) return "♥️";
  else if (card < 39) return "♠";
  else if (card < 52) return "♦️";
  else return "Joker";
};

export const getSuitLong = (card) => {
  if (card < 13) return " of Clubs";
  else if (card < 26) return " of Hearts";
  else if (card < 39) return " of Spades";
  else if (card < 52) return " of Diamonds";
  else return "Joker";
};

export const getCardNumber = (card) => {
  const id = card % 13;

  if (card >= 52) return "";

  switch (id) {
    case 0:
      return "A";
    case 10:
      return "J";
    case 11:
      return "Q";
    case 12:
      return "K";
    default:
      return (id + 1).toString();
  }
};

export const getPointsOfCard = (card) => {
  const cardNumberInDeck = card % 54;
  const cardNumberInSuit = cardNumberInDeck % 13;

  if (cardNumberInDeck % 54 >= 52) return 50;
  if (cardNumberInSuit === 0) return 20;
  if (cardNumberInSuit >= 9) return 10;
  return 5;
};

export const selectBuyer = (currentPlayer, buyers, opponents) => {
  console.log("current player: ", currentPlayer);
  console.log("buyers: ", buyers);
  console.log("opponents: ", opponents);
  const startIndex = opponents.indexOf(currentPlayer);

  for (let i = startIndex + 1; i < opponents.length + startIndex; i++) {
    if (buyers.includes(opponents[i % opponents.length]))
      return opponents[i % opponents.length];
  }

  return null;
};
