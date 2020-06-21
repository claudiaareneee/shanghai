import * as types from "./actionTypes";
import * as gameApi from "../../api/gameApi";
// import { beginApiCall, apiCallError } from "./apiStatusActions";

// Called an action creator which is because that's exactly what it does
// Redux flow step 2:

export const createGameSuccess = (game) => {
  return { type: types.CREATE_GAME_SUCCESS, game };
};

export function createGame(game) {
  return function (dispatch) {
    return gameApi
      .createGame(game)
      .then((game) => dispatch(createGameSuccess(game)));
  };
}

// export const loadCoursesSuccess = (courses) => {
//   return { type: types.LOAD_COURSES_SUCCESS, courses };
// };

// export function loadCourses() {
//   return function (dispatch) {
//     // dispatch(beginApiCall());
//     return courseApi
//       .getCourses()
//       .then((courses) => {
//         dispatch(loadCoursesSuccess(courses));
//       })
//       .catch((error) => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// }

// export function saveCourse(course) {
//   return function (dispatch) {
//     dispatch(beginApiCall());
//     return courseApi
//       .saveCourse(course)
//       .then((savedCourse) => {
//         course.id
//           ? dispatch(updateCourseSuccess(savedCourse))
//           : dispatch(createCourseSuccess(savedCourse));
//       })
//       .catch((error) => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// }
