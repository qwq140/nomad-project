import produce from "immer";
import arrayMove from "array-move";

// 상태
export const initialState = {
  videoPostLoading: false,
  videoPostDone: false,
  videoPostError: null,

  videoGetLoading: false,
  videoGetDone: false,
  videoGetError: null,

  videoDeleteLoading: false,
  videoDeleteDone: false,
  videoDeleteError: null,

  videoDetailGetLoading: false,
  videoDetailGetDone: false,
  videoDetailGetError: null,

  videoPutLoading: false,
  videoPutDone: false,
  videoPutError: null,

  videoList: [],

  videoContent: {
    id: null,
    contents: [],
  },
};

// 타입

export const VIDEO_POST_REQUEST = "VIDEO_POST_REQUEST";
export const VIDEO_POST_SUCCESS = "VIDEO_POST_SUCCESS";
export const VIDEO_POST_FAILURE = "VIDEO_POST_FAILURE";

export const VIDEO_ALL_GET_REQUEST = "VIDEO_ALL_GET_REQUEST";
export const VIDEO_ALL_GET_SUCCESS = "VIDEO_ALL_GET_SUCCESS";
export const VIDEO_ALL_GET_FAILURE = "VIDEO_ALL_GET_FAILURE";

export const VIDEO_DELETE_REQUEST = "VIDEO_DELETE_REQUEST";
export const VIDEO_DELETE_SUCCESS = "VIDEO_DELETE_SUCCESS";
export const VIDEO_DELETE_FAILURE = "VIDEO_DELETE_FAILURE";

export const VIDEO_DETAIL_GET_REQUEST = "VIDEO_DETAIL_GET_REQUEST";
export const VIDEO_DETAIL_GET_SUCCESS = "VIDEO_DETAIL_GET_SUCCESS";
export const VIDEO_DETAIL_GET_FAILURE = "VIDEO_DETAIL_GET_FAILURE";

export const VIDEO_PUT_REQUEST = "VIDEO_PUT_REQUEST";
export const VIDEO_PUT_SUCCESS = "VIDEO_PUT_SUCCESS";
export const VIDEO_PUT_FAILURE = "VIDEO_PUT_FAILURE";

// saga 안씀.========================================================

export const VIDEO_CONTENT_LIST_SAVE = "VIDEO_CONTENT_LIST_SAVE"; // 목차 저장

export const VIDEO_CONTENT_LIST_DELETE = "VIDEO_CONTENT_LIST_DELETE"; // 목차 삭제

export const VIDEO_CONTENT_ITEM_LIST_TITLE_SAVE =
  "VIDEO_CONTENT_ITEM_LIST_TITLE_SAVE"; // 목차 리스트 저장
export const VIDEO_CONTENT_ITEM_LIST_SAVE = "VIDEO_CONTENT_ITEM_LIST_SAVE";
export const VIDEO_CONTENT_ITEM_LIST_DELETE = "VIDEO_CONTENT_ITEM_LIST_DELETE";

export const VIDEO_CONTENT_ITEM_LIST_SORT = "VIDEO_CONTENT_ITEM_LIST_SORT";

// 액션
export const videoPostRequestAction = (data) => {
  return {
    type: VIDEO_POST_REQUEST,
    data,
  };
};
export const videoAllGetRequestAction = () => {
  return {
    type: VIDEO_ALL_GET_REQUEST,
  };
};
export const videoDeleteRequestAction = (data) => {
  return {
    type: VIDEO_DELETE_REQUEST,
    data: data,
  };
};
export const videoDetailGetRequestAction = (data) => {
  return {
    type: VIDEO_DETAIL_GET_REQUEST,
    data: data,
  };
};
export const videoPutRequestAction = (data) => {
  return {
    type: VIDEO_PUT_REQUEST,
    data: data,
  };
};

// 사가 안쓰는 액션
export const videoContentsListSaveAction = (data) => {
  return {
    type: VIDEO_CONTENT_LIST_SAVE,
    data: data,
  };
};
export const videoContentsListDeleteAction = (data) => {
  return {
    type: VIDEO_CONTENT_LIST_DELETE,
    data: data,
  };
};
export const videoContentsItemListTitleSaveAction = (data) => {
  return {
    type: VIDEO_CONTENT_ITEM_LIST_TITLE_SAVE,
    data: data,
  };
};
export const videoContentsItemListSaveAction = (data) => {
  return {
    type: VIDEO_CONTENT_ITEM_LIST_SAVE,
    data: data,
  };
};
export const videoContentsItemListDeleteAction = (data) => {
  return {
    type: VIDEO_CONTENT_ITEM_LIST_DELETE,
    data: data,
  };
};
export const videoContentsItemListSortAction = (data) => {
  return {
    type: VIDEO_CONTENT_ITEM_LIST_SORT,
    data: data,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case VIDEO_POST_REQUEST:
        draft.videoPostLoading = true;
        draft.videoPostDone = false;
        draft.videoPostError = null;
        break;

      case VIDEO_POST_SUCCESS:
        draft.videoPostLoading = false;
        draft.videoPostDone = true;
        draft.videoList.push(action.data);
        break;

      case VIDEO_POST_FAILURE:
        draft.videoPostLoading = false;
        draft.videoPostError = action.error;
        break;

      case VIDEO_ALL_GET_REQUEST:
        draft.videoAllGetLoading = true;
        draft.videoAllGetDone = false;
        draft.videoAllGetError = null;
        break;

      case VIDEO_ALL_GET_SUCCESS:
        draft.videoAllGetLoading = false;
        draft.videoAllGetDone = true;
        draft.videoList = action.data;
        break;

      case VIDEO_ALL_GET_FAILURE:
        draft.videoAllGetLoading = false;
        draft.videoAllGetError = action.error;
        break;

      case VIDEO_DELETE_REQUEST:
        draft.videoDeleteLoading = true;
        draft.videoDeleteDone = false;
        draft.videoDeleteError = null;
        break;

      case VIDEO_DELETE_SUCCESS:
        draft.videoDeleteLoading = false;
        draft.videoDeleteDone = true;
        draft.videoList = draft.videoList.filter(
          (v) => v.id !== action.data.id
        );
        break;

      case VIDEO_DELETE_FAILURE:
        draft.videoDeleteLoading = false;
        draft.videoDeleteError = action.error;
        break;

      case VIDEO_DETAIL_GET_REQUEST:
        draft.videoDetailGetLoading = true;
        draft.videoDetailGetDone = false;
        draft.videoDetailGetError = null;
        break;

      case VIDEO_DETAIL_GET_SUCCESS:
        draft.videoDetailGetLoading = false;
        draft.videoDetailGetDone = true;
        draft.videoContent = action.data;
        break;

      case VIDEO_DETAIL_GET_FAILURE:
        draft.videoDetailGetLoading = false;
        draft.videoDetailGetError = action.error;
        break;

      case VIDEO_PUT_REQUEST:
        draft.videoPutLoading = true;
        draft.videoPutDone = false;
        draft.videoPutError = null;
        break;

      case VIDEO_PUT_SUCCESS:
        draft.videoPutLoading = false;
        draft.videoPutDone = true;
        draft.videoContent = action.data;
        break;

      case VIDEO_PUT_FAILURE:
        draft.videoPutLoading = false;
        draft.videoPutError = action.error;
        break;

      // ========================================== saga 않씀 ====================================
      case VIDEO_CONTENT_LIST_SAVE:
        draft.videoContent.contents.push({ title: action.data, list: [] });
        break;
      case VIDEO_CONTENT_ITEM_LIST_TITLE_SAVE:
        draft.videoContent.contents[action.data.index].list.push({
          title: action.data.title,
          vimeoId: "",
          isFree: false,
        });
        break;
      case VIDEO_CONTENT_ITEM_LIST_SAVE:
        draft.videoContent.contents[action.data.collection].list[
          action.data.index
        ] = action.data.data;
        break;
      case VIDEO_CONTENT_LIST_DELETE:
        draft.videoContent.contents = draft.videoContent.contents.filter(
          (v, index) => index !== action.data
        );

        break;
      case VIDEO_CONTENT_ITEM_LIST_DELETE:
        draft.videoContent.contents[
          action.data.collection
        ].list = draft.videoContent.contents[
          action.data.collection
        ].list.filter((v, index) => index !== action.data.index);
        break;
      case VIDEO_CONTENT_ITEM_LIST_SORT:
        draft.videoContent.contents[action.data.collection].list = arrayMove(
          draft.videoContent.contents[action.data.collection].list,
          action.data.oldIndex,
          action.data.newIndex
        );
        break;

      default:
        return state;
    }
  });
};
export default reducer;
