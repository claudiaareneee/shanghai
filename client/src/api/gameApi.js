import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "/api/games/";

export function getGames() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getGameById(id) {
  return fetch(baseUrl + "?id=" + id)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then((games) => {
        if (games.length !== 1) throw new Error("Game not found: " + id);
        return games[0]; // should only find one game for a given id, so return it.
      });
    })
    .catch(handleError);
}

export function saveGame(game) {
  return fetch(baseUrl + (game.id || ""), {
    method: game.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    mode: "cors",
    body: JSON.stringify({
      name: "hello",
      abc: "xyz",
      // Parse authorId to a number (in case it was sent as a string).
      // authorId: parseInt(game.authorId, 10),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveGame2(game) {
  return fetch(baseUrl + (game.id || ""), {
    method: game.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...game,
      // Parse authorId to a number (in case it was sent as a string).
      // authorId: parseInt(game.authorId, 10),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteGame(gameId) {
  return fetch(baseUrl + gameId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
