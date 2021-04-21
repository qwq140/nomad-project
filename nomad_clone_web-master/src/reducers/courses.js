import produce from "immer";

// 상태
export const initialState = {
  coursesGetLoading: false,
  coursesGetDone: false,
  coursesGetError: null,
  // 홈화면 6개 가져오는거.
  homeCoursesGetLoading: false,
  homeCoursesGetDone: false,
  homeCoursesGetError: null,

  coursesOneGetLoading: false,
  coursesOneGetDone: false,
  coursesOneGetError: null,

  coursesFilterGetLoading: false,
  coursesFilterGetDone: false,
  coursesFilterGetError: null,

  coursesList: null,
  coursesItem: null,
};

export const COURSES_GET_REQUEST = "COURSES_GET_REQUEST";
export const COURSES_GET_SUCCESS = "COURSES_GET_SUCCESS";
export const COURSES_GET_FAILURE = "COURSES_GET_FAILURE";

export const HOME_COURSES_GET_REQUEST = "HOME_COURSES_GET_REQUEST";
export const HOME_COURSES_GET_SUCCESS = "HOME_COURSES_GET_SUCCESS";
export const HOME_COURSES_GET_FAILURE = "HOME_COURSES_GET_FAILURE";

export const COURSES_ONE_GET_REQUEST = "COURSES_ONE_GET_REQUEST";
export const COURSES_ONE_GET_SUCCESS = "COURSES_ONE_GET_SUCCESS";
export const COURSES_ONE_GET_FAILURE = "COURSES_ONE_GET_FAILURE";

export const COURSES_FILTER_GET_REQUEST = "COURSES_FILTER_GET_REQUEST";
export const COURSES_FILTER_GET_SUCCESS = "COURSES_FILTER_GET_SUCCESS";
export const COURSES_FILTER_GET_FAILURE = "COURSES_FILTER_GET_FAILURE";
// 커뮤니티

// 액션

export const homeCoursesGetRequestAction = (data) => {
  return {
    type: HOME_COURSES_GET_REQUEST,
    data,
  };
};

export const coursesGetRequestAction = () => {
  return {
    type: COURSES_GET_REQUEST,
  };
};

export const coursesOneGetRequestAction = (data) => {
  return {
    type: COURSES_ONE_GET_REQUEST,
    data,
  };
};
export const coursesFilterGetRequestAction = (data) => {
  return {
    type: COURSES_FILTER_GET_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // get
      case COURSES_GET_REQUEST:
        draft.coursesGetLoading = true;
        draft.coursesGetDone = false;
        draft.coursesGetError = null;
        break;

      case COURSES_GET_SUCCESS:
        draft.coursesGetLoading = false;
        draft.coursesGetDone = true;
        draft.coursesList = action.data;
        break;

      case COURSES_GET_FAILURE:
        draft.coursesGetLoading = false;
        draft.coursesGetError = action.error;
        break;

      // 6개 가져오기
      case HOME_COURSES_GET_REQUEST:
        draft.homeCoursesGetLoading = true;
        draft.homeCoursesGetDone = false;
        draft.homeCoursesGetError = null;
        break;

      case HOME_COURSES_GET_SUCCESS:
        draft.homeCoursesGetLoading = false;
        draft.homeCoursesGetDone = true;
        draft.coursesList = action.data;
        break;

      case HOME_COURSES_GET_FAILURE:
        draft.homeCoursesGetLoading = false;
        draft.homeCoursesGetError = action.error;
        break;

      //  하나 가져오기
      case COURSES_ONE_GET_REQUEST:
        draft.coursesOneGetLoading = true;
        draft.coursesOneGetDone = false;
        draft.coursesOneGetError = null;
        break;

      case COURSES_ONE_GET_SUCCESS:
        draft.coursesOneGetLoading = false;
        draft.coursesOneGetDone = true;
        draft.coursesItem = action.data;
        break;

      case COURSES_ONE_GET_FAILURE:
        draft.coursesOneGetLoading = false;
        draft.coursesOneGetError = action.error;
        break;

      case COURSES_FILTER_GET_REQUEST:
        draft.coursesFilterGetLoading = true;
        draft.coursesFilterGetDone = false;
        draft.coursesFilterGetError = null;
        break;

      case COURSES_FILTER_GET_SUCCESS:
        draft.coursesFilterGetLoading = false;
        draft.coursesFilterGetDone = true;
        draft.coursesList = action.data;
        break;

      case COURSES_FILTER_GET_FAILURE:
        draft.coursesFilterGetLoading = false;
        draft.coursesFilterGetError = action.error;
        break;

      default:
        return state;
    }
  });
};
export default reducer;
