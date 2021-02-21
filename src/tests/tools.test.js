import * as tools from "../tools";

// import { render, screen } from "@testing-library/react";
// import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("should select the correct buyer", () => {
  const game1 = {
    buyers: {
      "-MU536FWJjw58L2PFzHB": "-MU5359-ztH_SAGbdxjV",
      "-MU53dpVJY6x8N0fhgIT": "-MU530EkgdNf_tgQhl4d",
      "-MU53kTnOOz5DwLnDgSL": "-MU532g0UemPrtlvFYPo",
    },
    decks: "2",
    hand: {
      books: 2,
      round: 1,
      runs: 0,
    },
    id: "-MU52zgvcC_sTOIVDBlY",
    numberOfDrawCards: 63,
    opponents: {
      "-MU52zl3ly1ztkNe3_z9": "-MU52zkK5tlSyCBd9Xek",
      "-MU530FRjysLlNhmsczb": "-MU530EkgdNf_tgQhl4d",
      "-MU532gi4XeLM8iwQJDo": "-MU532g0UemPrtlvFYPo",
      "-MU5359kGZ1w0OkO_A88": "-MU5359-ztH_SAGbdxjV",
    },
    turn: {
      player: "-MU52zkK5tlSyCBd9Xek",
      state: "drawing",
    },
  };

  expect(
    tools.selectBuyer(
      game1.turn.player,
      Object.values(game1.buyers),
      Object.values(game1.opponents)
    )
  ).toBe("-MU530EkgdNf_tgQhl4d");

  const game2 = {
    buyers: {
      "-MU536FWJjw58L2PFzHB": "-MU52zkK5tlSyCBd9Xek",
    },
    decks: "2",
    hand: {
      books: 2,
      round: 1,
      runs: 0,
    },
    id: "-MU52zgvcC_sTOIVDBlY",
    numberOfDrawCards: 63,
    opponents: {
      "-MU52zl3ly1ztkNe3_z9": "-MU52zkK5tlSyCBd9Xek",
      "-MU530FRjysLlNhmsczb": "-MU530EkgdNf_tgQhl4d",
      "-MU532gi4XeLM8iwQJDo": "-MU532g0UemPrtlvFYPo",
      "-MU5359kGZ1w0OkO_A88": "-MU5359-ztH_SAGbdxjV",
    },
    turn: {
      player: "-MU52zkK5tlSyCBd9Xek",
      state: "drawing",
    },
  };

  expect(
    tools.selectBuyer(
      game2.turn.player,
      Object.values(game2.buyers),
      Object.values(game2.opponents)
    )
  ).toBeNull();
});

const selectionSetTestData = {
  run1: [96, 97, 98, 45], //4♦️ 5♦️ 6♦️ 7♦️
  book1: [38, 92, 25], //K♠ K♠ K♥️
  invalid1: [96, 97, 45, 54], //4♦️ 5♦️ 7♦️ A♣
  run2: [35, 90, 37, 38], //10♠ J♠ Q♠ K♠
  run3WithJokerAce: [93, 94, 106, 96, 97], //A♦️ 2♦️ Joker 4♦️ 5♦️
  invalid2: [51, 93, 94, 106], //K♦️ A♦️ 2♦️ Joker
  book2: [67, 93, 106], //A♥️ A♦️ Joker
  invalid3: [67, 93, 94, 106], //A♥️ A♦️ 2♦️ Joker
  jokers: [52, 53, 106, 107], //Joker Joker Joker Joker
  run4EndWithJoker: [96, 97, 98, 45, 53], //4♦️ 5♦️ 6♦️ 7♦️ Joker
  run5EndsWithHighAce: [35, 90, 37, 38, 26], //10♠ J♠ Q♠ K♠ A♠
  unsortedRun5EndsWithHighAce: [37, 38, 35, 26, 90], //Q♠ K♠ 10♠ A♠ J♠
  invalid4TooShort: [38, 92], //K♠ K♠
  invalid5RollingAce: [51, 93, 94, 95], //K♦️ A♦️ 2♦️ Joker
  run6Idk: [51, 50, 107, 102],
};

test("should determine if books are valid", () => {
  expect(tools.isBook(selectionSetTestData.book1)).toBeTruthy();
  expect(tools.isBook(selectionSetTestData.book2)).toBeTruthy();
});

test("should determine if books are invalid", () => {
  expect(() => tools.isBook(selectionSetTestData.invalid4TooShort)).toThrow(
    "There needs to be at least three cards"
  );
  expect(() => tools.isBook(selectionSetTestData.jokers)).toThrow(
    "There needs to be at least two natural (non-joker) cards"
  );
  expect(() => tools.isBook(selectionSetTestData.invalid3)).toThrow(
    "Cards do not match"
  );
});

test("should determine if runs are valid", () => {
  expect(tools.isRun(selectionSetTestData.run1)).toBeTruthy();
  expect(tools.isRun(selectionSetTestData.run2)).toBeTruthy();
  expect(tools.isRun(selectionSetTestData.run3WithJokerAce)).toBeTruthy();
  expect(tools.isRun(selectionSetTestData.run5EndsWithHighAce)).toBeTruthy();
});

test("should determine if runs are invalid", () => {
  expect(() => tools.isRun(selectionSetTestData.book1)).toThrow(
    "There needs to be at least four cards"
  );
  expect(() => tools.isRun(selectionSetTestData.jokers)).toThrow(
    "There needs to be at least two natural (non-joker) cards"
  );
  expect(() => tools.isRun(selectionSetTestData.invalid1)).toThrow(
    "Missing cards in sequence"
  ); //idk maybe should be of same suit
  expect(() => tools.isRun(selectionSetTestData.invalid2)).toThrow(
    "Aces cannot wrap"
  );
  expect(() => tools.isRun(selectionSetTestData.run4EndWithJoker)).toThrow(
    "Runs cannot start or end with a Joker"
  );
  expect(() => tools.isRun(selectionSetTestData.invalid5RollingAce)).toThrow(
    "Aces cannot wrap"
  );
});

test("sorting should sort cards properly", () => {
  const sortedCards = tools.sortCardsLowToHigh(
    selectionSetTestData.unsortedRun5EndsWithHighAce
  );
  expect(sortedCards).toEqual([35, 90, 37, 38, 26]); //10♠ J♠ Q♠ K♠ A♠
  expect(tools.isRun(sortedCards)).toBeTruthy();

  expect(tools.sortIsRun(selectionSetTestData.run6Idk)).toBeTruthy();
});

test("cards should be added to cards played properly", () => {
  const cardsOnTable = {
    "-MU-pwq3QQniLXvF1wZV": {
      books: [
        [81, 27, 14],
        [47, 62, 88, 34],
      ],
      runs: [[0, 1, 2, 3]],
    },
  };

  const associationRun = { index: 2, location: "-MU-pwq3QQniLXvF1wZV" };
  const newRun = {
    books: [
      [81, 27, 14],
      [47, 62, 88, 34],
    ],
    runs: [[0, 1, 2, 3, 87]],
  };

  expect(
    tools.addCardToCardsLaid(
      cardsOnTable[associationRun.location],
      3,
      associationRun,
      87
    )
  ).toEqual(newRun);

  const associationBook = { index: 1, location: "-MU-pwq3QQniLXvF1wZV" };
  const newBook = {
    books: [
      [81, 27, 14],
      [47, 87, 62, 88, 34],
    ],
    runs: [[0, 1, 2, 3]],
  };

  expect(
    tools.addCardToCardsLaid(
      cardsOnTable[associationBook.location],
      0,
      associationBook,
      87
    )
  ).toEqual(newBook);
});

test("cards should be removed from cards played properly with a given id", () => {
  const cardsOnTable = {
    "-MU-pwq3QQniLXvF1wZV": {
      books: [
        [81, 27, 14],
        [47, 62, 88, 34],
      ],
      runs: [[0, 1, 2, 3]],
    },
  };

  const associationRun = { index: 2, location: "-MU-pwq3QQniLXvF1wZV" };
  const newRun = {
    books: [
      [81, 27, 14],
      [47, 62, 88, 34],
    ],
    runs: [[0, 1, 3]],
  };

  expect(
    tools.removeCardFromCardsLaidWithId(
      cardsOnTable[associationRun.location],
      2,
      associationRun
    )
  ).toEqual(newRun);

  const associationBook = { index: 1, location: "-MU-pwq3QQniLXvF1wZV" };
  const newBook = {
    books: [
      [81, 27, 14],
      [47, 88, 34],
    ],
    runs: [[0, 1, 2, 3]],
  };

  expect(
    tools.removeCardFromCardsLaidWithId(
      cardsOnTable[associationBook.location],
      62,
      associationBook
    )
  ).toEqual(newBook);
});

test("cards should be removed from cards played properly with a given index", () => {
  const cardsOnTable = {
    "-MU-pwq3QQniLXvF1wZV": {
      books: [
        [81, 27, 14],
        [47, 62, 88, 34],
      ],
      runs: [[0, 1, 2, 3]],
    },
  };

  const associationRun = { index: 2, location: "-MU-pwq3QQniLXvF1wZV" };
  const newRun = {
    books: [
      [81, 27, 14],
      [47, 62, 88, 34],
    ],
    runs: [[0, 1, 2]],
  };

  expect(
    tools.removeCardFromCardsLaidWithIndex(
      cardsOnTable[associationRun.location],
      3,
      associationRun
    )
  ).toEqual(newRun);

  const associationBook = { index: 1, location: "-MU-pwq3QQniLXvF1wZV" };
  const newBook = {
    books: [
      [81, 27, 14],
      [47, 88, 34],
    ],
    runs: [[0, 1, 2, 3]],
  };

  expect(
    tools.removeCardFromCardsLaidWithIndex(
      cardsOnTable[associationBook.location],
      1,
      associationBook
    )
  ).toEqual(newBook);
});
