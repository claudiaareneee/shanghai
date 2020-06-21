import * as types from "../actions/actionTypes";
import initialState from "../initialState";

export default function gameReducer(state = initialState.game, action) {
  switch (action.type) {
    case types.CREATE_GAME_SUCCESS:
      // Redux flow step 3:
      // return [...state, { ...action.game }];
      return action.game;

    // case types.UPDATE_COURSE_SUCCESS:
    //   return state.map((course) =>
    //     course.id === action.course.id ? action.course : course
    //   );

    // case types.LOAD_COURSES_SUCCESS:
    //   return action.courses;

    // case types.DELETE_COURSE_OPTIMISTIC:
    //   return state.filter((course) => course.id !== action.course.id);

    default:
      return state;
  }
}
