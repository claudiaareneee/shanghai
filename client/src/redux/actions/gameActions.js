import * as types from "./actionTypes";
import * as gameApi from "../../api/gameApi";
// import { beginApiCall, apiCallError } from "./apiStatusActions";

// Called an action creator which is because that's exactly what it does
// Redux flow step 2:

export const createGameSuccess = (game) => {
  return { type: types.CREATE_GAME_SUCCESS, game };
};

export const updateGameSuccess = (game) => {
  return { type: types.UPDATE_GAME_SUCCESS, game };
};

export const loadGameSuccess = (game) => {
  return { type: types.LOAD_GAME_SUCCESS, game };
};

export const addPlayerToGameSuccess = () => {
  return { type: types.ADD_PLAYER_TO_GAME_OPTIMISTIC };
};

export function createGame(game) {
  return function (dispatch) {
    return gameApi.createGame(game).then((game) => {
      dispatch(createGameSuccess(game));
      return game;
    });
  };
}

export function updateGame(game) {
  return function (dispatch) {
    return gameApi.updateGame(game).then((game) => {
      dispatch(updateGameSuccess(game));
      return game;
    });
  };
}

export function loadGame(gameId) {
  return function (dispatch) {
    return gameApi.getGameById(gameId, (game) => {
      dispatch(loadGameSuccess(game));
    });
  };
}

export function addPlayerToGame(game, playerId) {
  return function (dispatch) {
    return gameApi.addPlayerToGame(game, playerId);
  };
}
