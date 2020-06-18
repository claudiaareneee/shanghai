import { combineReducers } from "redux";
import courses from "./courseReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  apiCallsInProgress,
});

export default rootReducer;
