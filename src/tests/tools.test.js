import * as tools from "../tools";

// import { render, screen } from "@testing-library/react";
// import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// sorting tests

const run1 = [96, 97, 98, 45]; //4♦️ 5♦️ 6♦️ 7♦️
const book1 = [38, 92, 25]; //K♠ K♠ K♥️
const invalid1 = [96, 97, 45, 54]; //4♦️ 5♦️ 7♦️ A♣
const run2 = [35, 90, 37, 38]; //10♠ J♠ Q♠ K♠
const run3WithJokerAce = [93, 94, 106, 96, 97]; //A♦️ 2♦️ Joker 4♦️ 5♦️
const invalid2 = [51, 93, 94, 106]; //K♦️ A♦️ 2♦️ Joker
const book2 = [67, 93, 106]; //A♥️ A♦️ Joker
const invalid3 = [67, 93, 94, 106]; //A♥️ A♦️ 2♦️ Joker
const jokers = [52, 53, 106, 107]; //Joker Joker Joker Joker
const run4EndWithJoker = [96, 97, 98, 45, 53]; //4♦️ 5♦️ 6♦️ 7♦️ Joker
const run5EndsWithHighAce = [35, 90, 37, 38, 26]; //10♠ J♠ Q♠ K♠ A♠
const unsortedRun5EndsWithHighAce = [37, 38, 35, 26, 90]; //Q♠ K♠ 10♠ A♠ J♠
const invalid4TooShort = [38, 92]; //K♠ K♠
const invalid5RollingAce = [51, 93, 94, 95]; //K♦️ A♦️ 2♦️ Joker

test("should determine if books are valid", () => {
  expect(tools.isBook(book1)).toBeTruthy();
  expect(tools.isBook(book2)).toBeTruthy();
});

test("should determine if books are invalid", () => {
  expect(() => tools.isBook(invalid4TooShort)).toThrow(
    "There needs to be at least three cards"
  );
  expect(() => tools.isBook(jokers)).toThrow(
    "There needs to be at least two natural (non-joker) cards"
  );
  expect(() => tools.isBook(invalid3)).toThrow("Cards do not match");
});

test("should determine if runs are valid", () => {
  expect(tools.isRun(run1)).toBeTruthy();
  expect(tools.isRun(run2)).toBeTruthy();
  expect(tools.isRun(run3WithJokerAce)).toBeTruthy();
  expect(tools.isRun(run5EndsWithHighAce)).toBeTruthy();
});

test("should determine if runs are invalid", () => {
  expect(() => tools.isRun(book1)).toThrow(
    "There needs to be at least four cards"
  );
  expect(() => tools.isRun(jokers)).toThrow(
    "There needs to be at least two natural (non-joker) cards"
  );
  expect(() => tools.isRun(invalid1)).toThrow("Missing cards in sequence"); //idk maybe should be of same suit
  expect(() => tools.isRun(invalid2)).toThrow("Aces cannot wrap");
  expect(() => tools.isRun(run4EndWithJoker)).toThrow(
    "Runs cannot start or end with a Joker"
  );
  expect(() => tools.isRun(invalid5RollingAce)).toThrow("Aces cannot wrap");
});

test("sorting should sort cards properly", () => {
  const sortedCards = tools.sortCardsLowToHigh(unsortedRun5EndsWithHighAce);
  expect(sortedCards).toEqual([35, 90, 37, 38, 26]); //10♠ J♠ Q♠ K♠ A♠
  expect(tools.isRun(sortedCards)).toBeTruthy();
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
