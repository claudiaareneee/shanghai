import * as types from "../actions/actionTypes";
import initialState from "../initialState";

export default function gameReducer(state = initialState.game, action) {
  switch (action.type) {
    case types.CREATE_GAME_SUCCESS:
      // Redux flow step 3:
      return action.game;

    case types.LOAD_GAME_SUCCESS:
      return { ...state, ...action.game };

    case types.UPDATE_GAME_SUCCESS:
      return { ...state, ...action.game };

    default:
      return state;
  }
}
