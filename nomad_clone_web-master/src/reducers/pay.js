import produce from "immer";

// 상태
export const initialState = {
  // 유료강의 결제하기
  payPostLoading: false,
  payPostDone: false,
  payPostError: null,

  // 무료강의 결제하기
  freePostLoading: false,
  freePostDone: false,
  freePostError: null,

  // 환불신청(사용자)
  refundPutLoading: false,
  refundPutDone: false,
  refundPutError: null,

  // 환불하기(관리자)
  refundedPutLoading: false,
  refundedPutDone: false,
  refundedPutError: null,

  // 환불취소(사용자)
  refundCanclePutLoading: false,
  refundCanclePutDone: false,
  refundCanclePutError: null,

  // 결제내역 가져오기(관리자)
  payGetLoading: false,
  payGetDone: false,
  payGetError: null,

  // 결제한 강의인지 체크
  payCheckGetLoading: false,
  payCheckGetDone: false,
  payCheckGetError: null,

  // 결제내역 가져오기(사용자)
  userPayGetLoading: false,
  userPayGetDone: false,
  userPayGetError: null,

  // 결제 체크용
  payCheckItem: null,

  // 사용자용 결제내역
  userPayList: [],

  // 관리자용 결제내역
  payList: [],
};

// 유료강의 결제
export const PAY_POST_REQUEST = "PAY_POST_REQUEST";
export const PAY_POST_SUCCESS = "PAY_POST_SUCCESS";
export const PAY_POST_FAILURE = "PAY_POST_FAILURE";

// 무료강의 결제
export const FREE_POST_REQUEST = "FREE_POST_REQUEST";
export const FREE_POST_SUCCESS = "FREE_POST_SUCCESS";
export const FREE_POST_FAILURE = "FREE_POST_FAILURE";

// 환불신청
export const REFUND_PUT_REQUEST = "REFUND_PUT_REQUEST";
export const REFUND_PUT_SUCCESS = "REFUND_PUT_SUCCESS";
export const REFUND_PUT_FAILURE = "REFUND_PUT_FAILURE";

// 환불하기
export const REFUNDED_PUT_REQUEST = "REFUNDED_PUT_REQUEST";
export const REFUNDED_PUT_SUCCESS = "REFUNDED_PUT_SUCCESS";
export const REFUNDED_PUT_FAILURE = "REFUNDED_PUT_FAILURE";

// 사용자 환불취소
export const REFUND_CANCLE_PUT_REQUEST = "REFUND_CANCLE_PUT_REQUEST";
export const REFUND_CANCLE_PUT_SUCCESS = "REFUND_CANCLE_PUT_SUCCESS";
export const REFUND_CANCLE_PUT_FAILURE = "REFUND_CANCLE_PUT_FAILURE";

// 관리자용 결제내역
export const PAY_GET_REQUEST = "PAY_GET_REQUEST";
export const PAY_GET_SUCCESS = "PAY_GET_SUCCESS";
export const PAY_GET_FAILURE = "PAY_GET_FAILURE";

// 사용자용 결제내역
export const USER_PAY_GET_REQUEST = "USER_PAY_GET_REQUEST";
export const USER_PAY_GET_SUCCESS = "USER_PAY_GET_SUCCESS";
export const USER_PAY_GET_FAILURE = "USER_PAY_GET_FAILURE";

// 강의결제 체크
export const PAY_CHECK_GET_REQUEST = "PAY_CHECK_GET_REQUEST";
export const PAY_CHECK_GET_SUCCESS = "PAY_CHECK_GET_SUCCESS";
export const PAY_CHECK_GET_FAILURE = "PAY_CHECK_GET_FAILURE";

// 액션
// 유료강의 등록
export const payPostRequestAction = (data) => {
  return {
    type: PAY_POST_REQUEST,
    data,
  };
};

// 무료강의 등록
export const freePostRequestAction = (data) => {
  return {
    type: FREE_POST_REQUEST,
    data,
  };
};

// 환불신청
export const refundPutRequestAction = (data) => {
  return {
    type: REFUND_PUT_REQUEST,
    data,
  };
};

// 환불하기
export const refundedPutRequestAction = (data) => {
  return {
    type: REFUNDED_PUT_REQUEST,
    data,
  };
};

// 사용자 환불취소
export const refundCanclePutRequestAction = (data) => {
  return {
    type: REFUND_CANCLE_PUT_REQUEST,
    data,
  };
};

// 관리자 결제내역
export const payGetRequestAction = (data) => {
  return {
    type: PAY_GET_REQUEST,
    data,
  };
};

// 결제체크
export const payCheckGetRequestAction = (data) => {
  return {
    type: PAY_CHECK_GET_REQUEST,
    data,
  };
};

// 사용자 결제내역
export const userPayGetRequestAction = (data) => {
  return {
    type: USER_PAY_GET_REQUEST,
    data,
  };
};

// 리듀서
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 결제하기
      case PAY_POST_REQUEST:
        draft.payPostLoading = true;
        draft.payPostDone = false;
        draft.payPostError = null;
        break;

      case PAY_POST_SUCCESS:
        draft.payPostLoading = false;
        draft.payPostDone = true;
        break;

      case PAY_POST_FAILURE:
        draft.payPostLoading = false;
        draft.payPostError = action.error;
        break;

      // 무료강의 결제하기
      case FREE_POST_REQUEST:
        draft.freePostLoading = true;
        draft.freePostDone = false;
        draft.freePostError = null;
        break;

      case FREE_POST_SUCCESS:
        draft.freePostLoading = false;
        draft.freePostDone = true;
        break;

      case FREE_POST_FAILURE:
        draft.freePostLoading = false;
        draft.freePostError = action.error;
        break;

      // 환불신청
      case REFUND_PUT_REQUEST:
        draft.refundPutLoading = true;
        draft.refundPutDone = false;
        draft.refundPutError = null;
        break;

      case REFUND_PUT_SUCCESS:
        draft.refundPutLoading = false;
        draft.refundPutDone = true;
        draft.userPayList = draft.userPayList.map((list) => {
          if (list.id === action.data.id) {
            list.status = action.data.status;
          }
          return list;
        });
        break;

      case REFUND_PUT_FAILURE:
        draft.refundPutLoading = false;
        draft.refundPutError = action.error;
        break;

      // 환불하기
      case REFUNDED_PUT_REQUEST:
        draft.refundedPutLoading = true;
        draft.refundedPutDone = false;
        draft.refundedPutError = null;
        break;

      case REFUNDED_PUT_SUCCESS:
        draft.refundedPutLoading = false;
        draft.refundedPutDone = true;
        draft.payList = draft.payList.map((list) => {
          if (list.id === action.data.id) {
            list.status = action.data.status;
          }
          return list;
        });
        break;

      case REFUNDED_PUT_FAILURE:
        draft.refundedPutLoading = false;
        draft.refundedPutError = action.error;
        break;

      // 사용자 환불취소신청
      case REFUND_CANCLE_PUT_REQUEST:
        draft.refundCanclePostLoading = true;
        draft.refundCanclePostDone = false;
        draft.refundCanclePostError = null;
        break;

      case REFUND_CANCLE_PUT_SUCCESS:
        draft.refundCanclePostLoading = false;
        draft.refundCanclePostDone = true;
        console.log("액션데이터는?", action.data);
        draft.userPayList = draft.userPayList.map((list) => {
          if (list.id === action.data.id) {
            list.status = action.data.status;
          }
          return list;
        });
        break;

      case REFUND_CANCLE_PUT_FAILURE:
        draft.refundCanclePostLoading = false;
        draft.refundCanclePostError = action.error;
        break;

      // 어드민 결제목록
      case PAY_GET_REQUEST:
        draft.payGetLoading = true;
        draft.payGetDone = false;
        draft.payGetError = null;
        break;

      case PAY_GET_SUCCESS:
        draft.payGetLoading = false;
        draft.payGetDone = true;
        draft.payList = action.data;
        break;

      case PAY_GET_FAILURE:
        draft.payGetLoading = false;
        draft.payGetError = action.error;
        break;

      // 결제체크
      case PAY_CHECK_GET_REQUEST:
        draft.payCheckGetLoading = true;
        draft.payCheckGetDone = false;
        draft.payCheckGetError = null;
        break;

      case PAY_CHECK_GET_SUCCESS:
        draft.payCheckGetLoading = false;
        draft.payCheckGetDone = true;
        draft.payCheckItem = action.data;
        break;

      case PAY_CHECK_GET_FAILURE:
        draft.payCheckGetLoading = false;
        draft.payCheckGetError = action.error;
        break;

      // 대시보드페이지 결제목록
      case USER_PAY_GET_REQUEST:
        draft.userPayGetLoading = true;
        draft.userPayGetDone = false;
        draft.userPayGetError = null;
        break;

      case USER_PAY_GET_SUCCESS:
        draft.userPayGetLoading = false;
        draft.userPayGetDone = true;
        draft.userPayList = action.data;
        break;

      case USER_PAY_GET_FAILURE:
        draft.userPayGetLoading = false;
        draft.userPayGetError = action.error;
        break;

      default:
        return state;
    }
  });
};
export default reducer;
