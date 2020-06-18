import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/players/";

export function getPlayers() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getPlayerById(id) {
  return fetch(baseUrl + "?id=" + id)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then((players) => {
        if (players.length !== 1) throw new Error("Player not found: " + id);
        return players[0]; // should only find one game for a given id, so return it.
      });
    })
    .catch(handleError);
}

export function savePlayer(player) {
  return fetch(baseUrl + (player.id || ""), {
    method: player.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(player),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePlayer(playerId) {
  return fetch(baseUrl + playerId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
