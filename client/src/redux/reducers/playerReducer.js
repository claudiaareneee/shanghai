import * as types from "../actions/actionTypes";
import initialState from "../initialState";
import { updatePlayer } from "../actions/playerActions";

export default function playerReducer(state = initialState.players, action) {
  switch (action.type) {
    case types.CREATE_PLAYER_SUCCESS:
      debugger;
      return { [action.player.id]: { ...action.player } };

    case types.LOAD_PLAYER_SUCCESS:
      debugger;
      const updatedPlayer = { ...state[action.player.id], ...action.player };
      return { ...state, [action.player.id]: updatedPlayer };
    default:
      return state;
  }
}
