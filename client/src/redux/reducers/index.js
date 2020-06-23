import { combineReducers } from "redux";
import game from "./gameReducer";
import players from "./playerReducer";

const rootReducer = combineReducers({
  game,
  players,
});

export default rootReducer;
