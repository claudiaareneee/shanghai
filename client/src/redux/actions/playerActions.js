import * as types from "./actionTypes";
import * as playerApi from "../../api/playerApi";

export const createPlayerSuccess = (player) => {
  return { type: types.CREATE_PLAYER_SUCCESS, player };
};

export function createPlayer(player) {
  return function (dispatch) {
    return playerApi.createPlayer(player).then((player) => {
      dispatch(createPlayerSuccess(player));
      return player;
    });
  };
}
