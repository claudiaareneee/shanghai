import * as gameApi from "./gameApi";

export function testGameApi() {
  gameApi
    .getGames()
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  gameApi
    .saveGame({ id: "-MAH6Lq0p77MX2MPGzGM", players: [{ name: "Toph" }] })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}
