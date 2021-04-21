import produce from "immer";

// 상태
export const initialState = {
  videoGetLoading: false, // 로그인 시도중 -> 로딩창 띄움
  videoGetDone: false,
  videoGetError: null,

  videoList: null,
};

// 비디오 가져오기
export const VIDEO_GET_REQUEST = "VIDEO_GET_REQUEST";
export const VIDEO_GET_SUCCESS = "VIDEO_GET_SUCCESS";
export const VIDEO_GET_FAILURE = "VIDEO_GET_FAILURE";

// 액션
// 비디오 가져오기
export const videoGetRequestAction = (data) => {
  return {
    type: VIDEO_GET_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 비디오 가져오기
      case VIDEO_GET_REQUEST:
        draft.videoGetLoading = true;
        draft.videoGetDone = false;
        draft.videoGetError = null;
        break;

      case VIDEO_GET_SUCCESS:
        draft.videoGetLoading = false;
        draft.videoGetDone = true;
        draft.videoList = action.data;
        break;

      case VIDEO_GET_FAILURE:
        draft.videoGetLoading = false;
        draft.videoGetError = action.error;
        break;

      default:
        return state;
    }
  });
};
export default reducer;
