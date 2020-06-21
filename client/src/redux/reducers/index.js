import { combineReducers } from "redux";
import game from "./gameReducer";

const rootReducer = combineReducers({
  game,
});

export default rootReducer;
