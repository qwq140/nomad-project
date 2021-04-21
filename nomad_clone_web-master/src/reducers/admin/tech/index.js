import produce from "immer";

// 상태
export const initialState = {
  // 테크 등록
  techPostLoading: false,
  techPostDone: false,
  techPostError: null,

  // 테크리스트
  techGetLoading: false,
  techGetDone: false,
  techGetError: null,

  // 테크 삭제
  techDeleteLoading: false,
  techDeleteDone: false,
  techDeleteError: null,

  // 테크 리스트초기값
  techList: [],
};

// 테크 등록
export const TECH_POST_REQUEST = "TECH_POST_REQUEST";
export const TECH_POST_SUCCESS = "TECH_POST_SUCCESS";
export const TECH_POST_FAILURE = "TECH_POST_FAILURE";

// 테크 리스트
export const TECH_GET_REQUEST = "TECH_GET_REQUEST";
export const TECH_GET_SUCCESS = "TECH_GET_SUCCESS";
export const TECH_GET_FAILURE = "TECH_GET_FAILURE";

// 테크 삭제하기
export const TECH_DELETE_REQUEST = "TECH_DELETE_REQUEST";
export const TECH_DELETE_SUCCESS = "TECH_DELETE_SUCCESS";
export const TECH_DELETE_FAILURE = "TECH_DELETE_FAILURE";

// 테크 추가액션
export const techPostRequestAction = (data) => {
  return {
    type: TECH_POST_REQUEST,
    data,
  };
};

// 테크 가져오기액션
export const techGetRequestAction = (data) => {
  return {
    type: TECH_GET_REQUEST,
    data,
  };
};

// 테크 삭제액션
export const techDeleteRequestAction = (data) => {
  return {
    type: TECH_DELETE_REQUEST,
    data,
  };
};

// 리듀서
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 테크 저장하기
      case TECH_POST_REQUEST:
        draft.techPostLoading = true;
        draft.techPostDone = false;
        draft.techPostError = null;
        break;

      case TECH_POST_SUCCESS:
        draft.techPostLoading = false;
        draft.techPostDone = true;
        console.log("액션데이터는?", action.data);
        draft.techList = draft.techList.concat(action.data);
        break;

      case TECH_POST_FAILURE:
        draft.techPostLoading = false;
        draft.techPostError = action.error;
        break;

      // 테크 리스트
      case TECH_GET_REQUEST:
        draft.techGetLoading = true;
        draft.techGetDone = false;
        draft.techGetError = null;
        break;

      case TECH_GET_SUCCESS:
        draft.techGetLoading = false;
        draft.techGetDone = true;
        draft.techList = action.data;
        break;

      case TECH_GET_FAILURE:
        draft.techGetLoading = false;
        draft.techGetError = action.error;
        break;

      // 테크 삭제
      case TECH_DELETE_REQUEST:
        draft.techDeleteLoading = true;
        draft.techDeleteDone = false;
        draft.techDeleteError = null;
        break;

      case TECH_DELETE_SUCCESS:
        draft.techDeleteLoading = false;
        draft.techDeleteDone = true;
        draft.techList = draft.techList.filter((v) => v.id !== action.data);
        break;

      case TECH_DELETE_FAILURE:
        draft.techDeleteLoading = false;
        draft.techDeleteError = action.error;
        break;

      default:
        return state;
    }
  });
};
export default reducer;
