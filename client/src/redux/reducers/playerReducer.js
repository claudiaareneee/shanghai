import * as types from "../actions/actionTypes";
import initialState from "../initialState";

export default function playerReducer(state = initialState.player, action) {
  switch (action.type) {
    case types.CREATE_PLAYER_SUCCESS:
      return action.player;

    case types.LOAD_PLAYER_SUCCESS:
      return { ...state, ...action.player };
    default:
      return state;
  }
}
