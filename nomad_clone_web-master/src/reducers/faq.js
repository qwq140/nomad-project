import produce from "immer";

// 상태
export const initialState = {
  // FAQ 등록
  faqPostLoading: false,
  faqPostDone: false,
  faqPostError: null,

  // FAQ 수정
  faqUpdateLoading: false,
  faqUpdateDone: false,
  faqUpdateError: null,

  // FAQ 가져오기
  faqGetLoading: false,
  faqGetDone: false,
  faqGetError: null,

  // FAQ 한건가져오기
  faqOneGetLoading: false,
  faqOneGetDone: false,
  faqOneGetError: null,

  // FAQ 카테고리 등록
  faqCategoryPostLoading: false,
  faqCategoryPostDone: false,
  faqCategoryPostError: null,

  // FAQ 카테고리 가져오기
  faqCategoryGetLoading: false,
  faqCategoryGetDone: false,
  faqCategoryGetError: null,

  faqCategoryList: [],
  faqList: [],
  faqItem: {},
};

// 타입
// FAQ 등록
export const FAQ_POST_REQUEST = "FAQ_POST_REQUEST";
export const FAQ_POST_SUCCESS = "FAQ_POST_SUCCESS";
export const FAQ_POST_FAILURE = "FAQ_POST_FAILURE";

// FAQ 수정
export const FAQ_UPDATE_REQUEST = "FAQ_UPDATE_REQUEST";
export const FAQ_UPDATE_SUCCESS = "FAQ_UPDATE_SUCCESS";
export const FAQ_UPDATE_FAILURE = "FAQ_UPDATE_FAILURE";

// FAQ 가져오기
export const FAQ_GET_REQUEST = "FAQ_GET_REQUEST";
export const FAQ_GET_SUCCESS = "FAQ_GET_SUCCESS";
export const FAQ_GET_FAILURE = "FAQ_GET_FAILURE";

// FAQ 한건찾기
export const FAQ_ONE_GET_REQUEST = "FAQ_ONE_GET_REQUEST";
export const FAQ_ONE_GET_SUCCESS = "FAQ_ONE_GET_SUCCESS";
export const FAQ_ONE_GET_FAILURE = "FAQ_ONE_GET_FAILURE";

// FAQ 카테고리 등록
export const FAQ_CATEGORY_POST_REQUEST = "FAQ_CATEGORY_POST_REQUEST";
export const FAQ_CATEGORY_POST_SUCCESS = "FAQ_CATEGORY_POST_SUCCESS";
export const FAQ_CATEGORY_POST_FAILURE = "FAQ_CATEGORY_POST_FAILURE";

// FAQ 카테고리 가져오기
export const FAQ_CATEGORY_GET_REQUEST = "FAQ_GET_CATEGORY_REQUEST";
export const FAQ_CATEGORY_GET_SUCCESS = "FAQ_GET_CATEGORY_SUCCESS";
export const FAQ_CATEGORY_GET_FAILURE = "FAQ_GET_CATEGORY_FAILURE";

// 액션
// FAQ등록
export const faqPostRequestAction = (data) => {
  return {
    type: FAQ_POST_REQUEST,
    data,
  };
};

// FAQ수정
export const faqUpdateRequestAction = (data) => {
  return {
    type: FAQ_UPDATE_REQUEST,
    data,
  };
};

// FAQ가져오기
export const faqGetRequestAction = () => {
  return {
    type: FAQ_GET_REQUEST,
  };
};

// FAQ한건 가져오기
export const faqOneGetRequestAction = (data) => {
  return {
    type: FAQ_ONE_GET_REQUEST,
    data,
  };
};

// FAQ 카테고리 등록하기
export const faqCategoryPostRequestAction = (data) => {
  return {
    type: FAQ_CATEGORY_POST_REQUEST,
    data,
  };
};

// FAQ가져오기
export const faqCategoryGetRequestAction = () => {
  return {
    type: FAQ_CATEGORY_GET_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // post
      case FAQ_POST_REQUEST:
        draft.faqPostLoading = true;
        draft.faqPostDone = false;
        draft.faqPostError = null;
        break;

      case FAQ_POST_SUCCESS:
        draft.faqPostLoading = false;
        draft.faqPostDone = true;
        break;

      case FAQ_POST_FAILURE:
        draft.faqPostLoading = false;
        draft.faqPostError = action.error;
        break;

      // update
      case FAQ_UPDATE_REQUEST:
        draft.faqUpdateLoading = true;
        draft.faqUpdateDone = false;
        draft.faqUpdateError = null;
        break;

      case FAQ_UPDATE_SUCCESS:
        draft.faqUpdateLoading = false;
        draft.faqUpdateDone = true;
        break;

      case FAQ_UPDATE_FAILURE:
        draft.faqUpdateLoading = false;
        draft.faqUpdateError = action.error;
        break;

      // get
      case FAQ_GET_REQUEST:
        draft.faqGetLoading = true;
        draft.faqGetDone = false;
        draft.faqGetError = null;
        break;

      case FAQ_GET_SUCCESS:
        draft.faqGetLoading = false;
        draft.faqGetDone = true;
        draft.faqList = action.data;
        break;

      case FAQ_GET_FAILURE:
        draft.faqGetLoading = false;
        draft.faqGetError = action.error;
        break;

      // 한건만찾기
      case FAQ_ONE_GET_REQUEST:
        draft.faqOneGetLoading = true;
        draft.faqOneGetDone = false;
        draft.faqOneGetError = null;
        break;

      case FAQ_ONE_GET_SUCCESS:
        draft.faqOneGetLoading = false;
        draft.faqOneGetDone = true;
        draft.faqItem = action.data;
        break;

      case FAQ_ONE_GET_FAILURE:
        draft.faqOneGetLoading = false;
        draft.faqOneGetError = action.error;
        break;

      // FAQ카테고리 저장
      case FAQ_CATEGORY_POST_REQUEST:
        draft.faqCategoryPostLoading = true;
        draft.faqCategoryPostDone = false;
        draft.faqCategoryPostError = null;
        break;

      case FAQ_CATEGORY_POST_SUCCESS:
        draft.faqCategoryPostLoading = false;
        draft.faqCategoryPostDone = true;
        draft.faqList.push(action.data);
        break;

      case FAQ_CATEGORY_POST_FAILURE:
        draft.faqCategoryPostLoading = false;
        draft.faqCategoryPostError = action.error;
        break;

      // FAQ카테고리 가져오기
      case FAQ_CATEGORY_GET_REQUEST:
        draft.faqCategoryGetLoading = true;
        draft.faqCategoryGetDone = false;
        draft.faqCategoryGetError = null;
        break;

      case FAQ_CATEGORY_GET_SUCCESS:
        draft.faqCategoryGetLoading = false;
        draft.faqCategoryGetDone = true;
        draft.faqCategoryList = action.data;
        break;

      case FAQ_CATEGORY_GET_FAILURE:
        draft.faqCategoryGetLoading = false;
        draft.faqCategoryGetError = action.error;
        break;

      default:
        return state;
    }
  });
};
export default reducer;
