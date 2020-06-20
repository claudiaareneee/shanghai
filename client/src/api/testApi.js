import * as gameApi from "./gameApi";
import * as playerApi from "./playerApi";

export function testGameApi() {
  gameApi
    .getGames()
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  gameApi
    .saveGame({
      id: "-MAH6Lq0p77MX2MPGzGM",
      players: [{ name: "Aang" }, { name: "Zuko" }],
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

export function testPlayerApi() {
  playerApi
    .getPlayers()
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  playerApi
    .savePlayer({ name: "Korra", gameId: "32412423" })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}
