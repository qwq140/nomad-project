import produce from "immer";

// 상태
export const initialState = {
  dashBoardGetLoading: false, // 로그인 시도중 -> 로딩창 띄움
  dashBoardGetDone: false,
  dashBoardGetError: null,
  dashBoardItem: null,

  profilePostLoading: false,
  profilePostDone: false,
  profilePostError: null,

  profileGetLoading: false,
  profileGetDone: false,
  profileGetError: null,
};

export const DASHBOARD_GET_REQUEST = "DASHBOARD_GET_REQUEST";
export const DASHBOARD_GET_SUCCESS = "DASHBOARD_GET_SUCCESS";
export const DASHBOARD_GET_FAILURE = "DASHBOARD_GET_FAILURE";

export const PROFILE_POST_REQUEST = "PROFILE_POST_REQUEST";
export const PROFILE_POST_SUCCESS = "PROFILE_POST_SUCCESS";
export const PROFILE_POST_FAILURE = "PROFILE_POST_FAILURE";

export const PROFILE_GET_REQUEST = "PROFILE_GET_REQUEST";
export const PROFILE_GET_SUCCESS = "PROFILE_GET_SUCCESS";
export const PROFILE_GET_FAILURE = "PROFILE_GET_FAILURE";

// 액션

export const dashBoardGetRequestAction = (data) => {
  return {
    type: DASHBOARD_GET_REQUEST,
    data,
  };
};

export const profilePostRequestAction = (data) => {
  return {
    type: PROFILE_POST_REQUEST,
    data,
  };
};

export const profileGetRequestAction = (data) => {
  return {
    type: PROFILE_GET_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 대시보드 정보 가져오기
      case DASHBOARD_GET_REQUEST:
        draft.dashBoardGetLoading = true;
        draft.dashBoardGetDone = false;
        draft.dashBoardGetError = null;
        break;

      case DASHBOARD_GET_SUCCESS:
        draft.dashBoardGetLoading = false;
        draft.dashBoardGetDone = true;
        draft.dashBoardItem = action.data;
        break;

      case DASHBOARD_GET_FAILURE:
        draft.dashBoardItemGetLoading = false;
        draft.dashBoardItemGetError = action.error;
        break;

      // 프로필이미지 변경
      case PROFILE_POST_REQUEST:
        draft.profilePostLoading = true;
        draft.profilePostDone = false;
        draft.profilePostError = null;
        break;

      case PROFILE_POST_SUCCESS:
        draft.profilePostLoading = false;
        draft.profilePostDone = true;
        break;

      case PROFILE_POST_FAILURE:
        draft.profilePostLoading = false;
        draft.profilePostError = action.error;
        break;

      // 프로필이미지 가져오기
      case PROFILE_GET_REQUEST:
        draft.profileGetLoading = true;
        draft.profileGetDone = false;
        draft.profileGetError = null;
        break;

      case PROFILE_GET_SUCCESS:
        draft.profileGetLoading = false;
        draft.profileGetDone = true;
        draft.profileList = action.data;
        break;

      case PROFILE_GET_FAILURE:
        draft.profileGetLoading = false;
        draft.profileGetError = action.error;
        break;

      default:
        return state;
    }
  });
};
export default reducer;
