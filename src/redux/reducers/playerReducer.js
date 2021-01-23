import * as types from "../actions/actionTypes";
import initialState from "../initialState";

export default function playerReducer(state = initialState.players, action) {
  switch (action.type) {
    case types.CREATE_PLAYER_SUCCESS:
      return { [action.player.id]: { ...action.player } };

    case types.LOAD_PLAYER_SUCCESS:
      const updatedPlayer = { ...state[action.player.id], ...action.player };
      return { ...state, [action.player.id]: updatedPlayer };

    case types.UPDATE_OPPONENT_PLAYERS:
      return state;

    default:
      return state;
  }
}
