import produce from "immer";

// 상태
export const initialState = {
  coursesPostLoading: false,
  coursesPostDone: false,
  coursesPostError: null,
};

// 타입
export const COURSES_POST_REQUEST = "COURSES_POST_REQUEST";
export const COURSES_POST_SUCCESS = "COURSES_POST_SUCCESS";
export const COURSES_POST_FAILURE = "COURSES_POST_FAILURE";

// 액션
export const coursesPostRequestAction = (data) => {
  return {
    type: COURSES_POST_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case COURSES_POST_REQUEST:
        draft.coursesPostLoading = true;
        draft.coursesPostDone = false;
        draft.coursesPostError = null;
        break;

      case COURSES_POST_SUCCESS:
        draft.coursesPostLoading = false;
        draft.coursesPostDone = true;
        break;

      case COURSES_POST_FAILURE:
        draft.coursesPostLoading = false;
        draft.coursesPostError = action.error;
        break;

      default:
        return state;
    }
  });
};
export default reducer;
