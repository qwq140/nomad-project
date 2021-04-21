import produce from "immer";

// 상태
export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,

  loadMyInfoLoading: false,
  loadMyInfoExcution: false,
  loadMyInfo: false,
  loadMyInfoError: null,

  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  principal: null,

  namePutLoading: false,
  namePutDone: false,
  namePutError: null,
};

// 타입
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

// 이름변경
export const NAME_PUT_REQUEST = "NAME_PUT_REQUEST";
export const NAME_PUT_SUCCESS = "NAME_PUT_SUCCESS";
export const NAME_PUT_FAILURE = "NAME_PUT_FAILURE";

// 액션
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};
export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};
export const loadMyInfoRequestAction = () => {
  return {
    type: LOAD_MY_INFO_REQUEST,
  };
};
export const namePutRequestAction = (data) => {
  return {
    type: NAME_PUT_REQUEST,
    data,
  };
};
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;

      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.principal = action.data;
        break;

      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;

      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;

      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logInDone = false;
        draft.principal = null;
        break;

      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoExcution = false;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;

      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoExcution = true;
        draft.loadMyInfoDone = true;
        draft.principal = action.data;
        break;

      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoExcution = true;
        draft.loadMyInfoError = action.error;
        break;

      // 이름변경
      case NAME_PUT_REQUEST:
        draft.namePutLoading = true;
        draft.namePutDone = false;
        draft.namePutError = null;
        break;

      case NAME_PUT_SUCCESS:
        draft.namePutLoading = false;
        draft.namePutDone = true;
        draft.principal.name = action.data.name;
        break;

      case NAME_PUT_FAILURE:
        draft.namePutLoading = false;
        draft.namePutError = action.error;
        break;

      default:
        return state;
    }
  });
};
export default reducer;
