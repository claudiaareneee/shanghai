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
      return { round: round + 1, books: 0, runs: 3 };
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
  const deal = { players: {}, draw: [], discard: [] };

  for (let playerId in opponents) deal.players[playerId] = deck.splice(0, 11);

  deal.discard = deck.splice(0, 1);
  deal.draw = [...deck];
  return deal;
}

export const nextTurn = (opponents, endOfHand, turn = {}, round = 1) => {
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
    player = opponents[(round - 1) % opponents.length];
  }

  return { player, state };
};

export const scorePlayer = (playerScore, cards) => {
  // 54 cards in one deck, A, 2, 3, ..., J, Q, K
  const newScore = cards.reduce((p, c) => p + getPointsOfCard(c), 0);
  return playerScore + newScore;
};

export const getLongCardNameFromId = (card) => {
  // c, h, s, d, j
  // A, 2, 3, ..., J, Q, K

  const id = card % 54;
  return getCardNumber(id) + getSuit(id);
};

export const getSuitAsInt = (card) => {
  if (card < 13) return 0;
  else if (card < 26) return 1;
  else if (card < 39) return 2;
  else if (card < 52) return 3;
  else return 4;
};

export const getSuit = (id) => {
  const card = id % 54;
  if (card < 13) return "♣";
  else if (card < 26) return "♥️";
  else if (card < 39) return "♠";
  else if (card < 52) return "♦️";
  else return "Joker";
};

export const getSuitLong = (id) => {
  const card = id % 54;
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
  const startIndex = opponents.indexOf(currentPlayer);

  for (let i = startIndex + 1; i < opponents.length + startIndex; i++) {
    if (buyers.includes(opponents[i % opponents.length]))
      return opponents[i % opponents.length];
  }

  return null;
};

export const removeCardFromSetWithIndex = (cards, index, association) => {
  return cards.map((set, i) => {
    if (i === association.index) {
      const newSet = [...set].filter((_, j) => j !== index);
      return newSet;
    }
    return set;
  });
};

export const removeCardFromCardsLaidWithIndex = (cards, index, association) => {
  const numberOfBooks = cards.books ? cards.books.length : 0;
  let newBooks = [];
  let newRuns = [];

  if (association.index < numberOfBooks) {
    newBooks = removeCardFromSetWithIndex(cards.books, index, association);
    newRuns = cards.runs || [];
    return { books: newBooks, runs: newRuns };
  } else {
    const adjustedAssociation = {
      ...association,
      index: association.index - numberOfBooks,
    };

    newRuns = removeCardFromSetWithIndex(
      cards.runs,
      index,
      adjustedAssociation
    );
    newBooks = cards.books || [];

    return { books: newBooks, runs: newRuns };
  }
};

export const removeCardFromSetWithId = (cards, id, association) => {
  return cards.map((set, i) => {
    if (i === association.index) {
      const newSet = [...set].filter((card) => card !== id);
      return newSet;
    }
    return set;
  });
};

export const removeCardFromCardsLaidWithId = (cards, id, association) => {
  const numberOfBooks = cards.books ? cards.books.length : 0;
  let newBooks = [];
  let newRuns = [];

  if (association.index < numberOfBooks) {
    newBooks = removeCardFromSetWithId(cards.books, id, association);
    newRuns = cards.runs || [];
    return { books: newBooks, runs: newRuns };
  } else {
    const adjustedAssociation = {
      ...association,
      index: association.index - numberOfBooks,
    };

    newRuns = removeCardFromSetWithId(cards.runs, id, adjustedAssociation);
    newBooks = cards.books || [];

    return { books: newBooks, runs: newRuns };
  }
};

export const addCardsToSet = (cards, index, association, card) => {
  return cards.map((set, i) => {
    if (i === association.index) {
      const newSet = [...set];
      const startArray = newSet.splice(0, index + 1);
      let cards =
        newSet.length > 0
          ? [...startArray, card, ...newSet]
          : [...startArray, card];
      return cards;
    }
    return set;
  });
};

export const addCardToCardsLaid = (cards, index, association, card) => {
  const numberOfBooks = cards.books ? cards.books.length : 0;
  let newBooks = [];
  let newRuns = [];

  if (association.index < numberOfBooks) {
    newBooks = addCardsToSet(cards.books, index, association, card);
    newRuns = cards.runs || [];
    return { books: newBooks, runs: newRuns };
  } else {
    const adjustedAssociation = {
      ...association,
      index: association.index - numberOfBooks,
    };

    newRuns = addCardsToSet(cards.runs, index, adjustedAssociation, card);
    newBooks = cards.books || [];

    return { books: newBooks, runs: newRuns };
  }
};

export const printCards = (cards) => {
  let cardString = "";
  cards.forEach((card) => {
    cardString = cardString + getLongCardNameFromId(card) + " ";
  });
  console.log(cardString);
};

export const isBook = (cards) => {
  if (cards.length < 3)
    throw new Error("There needs to be at least three cards");

  //check for jokers
  const jokers = cards.filter((card) => card % 54 >= 52);
  const regularCards = cards.filter((card) => card % 54 < 52);
  // console.log("jokers", jokers, "regular", regularCards);

  if (regularCards.length < 2)
    throw new Error("There needs to be at least two natural (non-joker) cards");

  const initialCardNumber = (regularCards[0] % 54) % 13;
  regularCards.forEach((card) => {
    // console.log((card % 54) % 13);
    if ((card % 54) % 13 !== initialCardNumber)
      throw new Error("Cards do not match");
  });

  return true;
};

export const isRun = (cards) => {
  // cards need to be sorted low to high

  if (cards.length < 4)
    throw new Error("There needs to be at least four cards");

  //check for jokers
  const jokers = cards.filter((card) => getSuitAsInt(card % 54) === 4);
  const regularCards = cards.filter((card) => getSuitAsInt(card % 54) !== 4);
  // console.log("jokers", jokers, "regular", regularCards);

  if (regularCards.length < 2)
    throw new Error("There needs to be at least two natural (non-joker) cards");

  const initialCardSuit = getSuitAsInt(regularCards[0] % 54);

  let previousCard = (regularCards[0] % 54) - 1;
  let unusedJokers = jokers.length;

  regularCards.forEach((card, index) => {
    let cardNumber = card % 54;
    const cardSuit = getSuitAsInt(cardNumber);
    // console.log(getLongCardNameFromId(cardNumber));
    if (cardSuit !== initialCardSuit)
      throw new Error("Cards in run need to be the same suit");

    if (getCardNumber(cardNumber) === "A") {
      if (index === regularCards.length - 1) cardNumber = cardNumber + 13;
      else if (index !== 0) throw new Error("Aces cannot wrap");
    }

    const difference = cardNumber - previousCard;
    // console.log("diff", difference);
    previousCard = cardNumber;

    unusedJokers = unusedJokers - (difference - 1);
    // console.log("unused jokers in seq", unusedJokers);

    if (unusedJokers < 0) throw new Error("Missing cards in sequence");
  });

  // console.log("unused jokers", unusedJokers);

  if (unusedJokers > 0)
    throw new Error("Runs cannot start or end with a Joker");

  return true;
};

export const sortCardsLowToHigh = (cards) => {
  const aces = cards.filter((card) => getCardNumber(card % 54) === "A");

  if (aces.length > 2)
    // This isn't a run
    return cards;

  const jokers = cards.filter((card) => getSuitAsInt(card % 54) === 4);
  const remainingCards = cards.filter(
    (card) => getCardNumber(card % 54) !== "A" && getSuitAsInt(card % 54) !== 4
  );

  const sortedLowToHigh = remainingCards.sort((a, b) => (a % 54) - (b % 54));

  if (aces.length === 0) return [...sortedLowToHigh, ...jokers];
  else if (aces.length === 2)
    return [aces[0], ...sortedLowToHigh, aces[1], ...jokers];
  else {
    try {
      const lowAceRun = [aces[0], ...sortedLowToHigh, ...jokers];
      isRun(lowAceRun);
      return lowAceRun;
    } catch {
      return [...sortedLowToHigh, aces[0], ...jokers];
    }
  }
};

export const sortIsRun = (cards) => {
  console.log("here");
  // pull out aces
  const aces = cards.filter((card) => getCardNumber(card % 54) === "A");

  if (aces.length > 2)
    // This isn't a run
    return cards;

  // pull out jokers
  const jokers = cards.filter((card) => getSuitAsInt(card % 54) === 4);
  const remainingCards = cards.filter(
    (card) => getCardNumber(card % 54) !== "A" && getSuitAsInt(card % 54) !== 4
  );

  // sort remaining cards low to high
  const sortedLowToHigh = remainingCards.sort((a, b) => (a % 54) - (b % 54));

  // TODO: apply jokers on the inside of the run
  // if there are leftovers, see which side they can be applied on to make run valid. IE check isRun [cards, ..remainingJokers, ace] or [ace, ...remainingJokers, ..cards]

  if (aces.length === 0) return isRun([...sortedLowToHigh, ...jokers]);
  else if (aces.length === 2)
    // if there are two aces, apply them to each side
    return isRun([aces[0], ...sortedLowToHigh, aces[1], ...jokers]);
  else {
    //if there is one ace check the isRun to see which side would make it valid
    try {
      isRun([aces[0], ...sortedLowToHigh, ...jokers]);
    } catch (e) {
      // if neither are valid, or is a book, just put them at the beginning
      isRun([...sortedLowToHigh, aces[0], ...jokers]);
    }
  }
  return true;
};

// I could restructure data to be like:
// CardsOnTable { books: [[],[]], runs: [[],[]s]}
