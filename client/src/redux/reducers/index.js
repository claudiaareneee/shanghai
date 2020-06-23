import { combineReducers } from "redux";
import game from "./gameReducer";
import player from "./playerReducer";

const rootReducer = combineReducers({
  game,
  player,
});

export default rootReducer;
