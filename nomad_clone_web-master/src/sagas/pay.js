import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "axios";

import {
  // 결제하기
  PAY_POST_FAILURE,
  PAY_POST_REQUEST,
  PAY_POST_SUCCESS,

  // 무료강의 결제하기
  FREE_POST_FAILURE,
  FREE_POST_REQUEST,
  FREE_POST_SUCCESS,

  // 환불신청
  REFUND_PUT_FAILURE,
  REFUND_PUT_REQUEST,
  REFUND_PUT_SUCCESS,

  // 환불하기
  REFUNDED_PUT_FAILURE,
  REFUNDED_PUT_REQUEST,
  REFUNDED_PUT_SUCCESS,

  // 환불취소신청
  REFUND_CANCLE_PUT_FAILURE,
  REFUND_CANCLE_PUT_REQUEST,
  REFUND_CANCLE_PUT_SUCCESS,

  // 어드민 결제목록확인
  PAY_GET_FAILURE,
  PAY_GET_REQUEST,
  PAY_GET_SUCCESS,

  // 결제한 강의인지 체크
  PAY_CHECK_GET_FAILURE,
  PAY_CHECK_GET_REQUEST,
  PAY_CHECK_GET_SUCCESS,

  // 대시보드페이지 결제목록
  USER_PAY_GET_FAILURE,
  USER_PAY_GET_REQUEST,
  USER_PAY_GET_SUCCESS,
} from "../reducers/pay";

// 결제하기
function payPostAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.post("/pay", JSON.stringify(data), config);
}

function* payPost(action) {
  try {
    const result = yield call(payPostAPI, action.data);
    const data = result.data.data;
    if (result.data.statusCode === 201) {
      yield put({
        type: PAY_POST_SUCCESS,
      });
      yield put(push(`/dashboard/${data.id}`));
    } else {
      yield put({
        type: PAY_POST_FAILURE,
        error: "결제 정보 저장 실패",
      });
    }
  } catch (err) {
    yield put({
      type: PAY_POST_FAILURE,
      error: "결제 정보 저장 실패",
    });
  }
}

// 강의결제체크
function payCheckGetAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.get(`/pay/check/${data}`, config);
}

function* payCheckGet(action) {
  try {
    const result = yield call(payCheckGetAPI, action.data);
    const data = result.data.data;
    if (result.data.statusCode === 201) {
      yield put({
        type: PAY_CHECK_GET_SUCCESS,
        data: data,
      });
    } else {
      yield put({
        type: PAY_CHECK_GET_FAILURE,
        error: "결제정보 체크 실패",
      });
    }
  } catch (err) {
    yield put({
      type: PAY_CHECK_GET_FAILURE,
      error: "결제정보 체크 실패",
    });
  }
}

// 무료강의 결제하기
function freePostAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.post("/pay/free", JSON.stringify(data), config);
}

function* freePost(action) {
  try {
    const result = yield call(freePostAPI, action.data);
    const data = result.data.data;
    if (result.data.statusCode === 201) {
      yield put({
        type: FREE_POST_SUCCESS,
      });
      yield put(push(`/dashboard/${data.id}`));
    } else {
      yield put({
        type: FREE_POST_FAILURE,
        error: "결제 정보 저장 실패",
      });
    }
  } catch (err) {
    yield put({
      type: FREE_POST_FAILURE,
      error: "결제 정보 저장 실패",
    });
  }
}

// 환불신청
function refundPutAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  return axios.put("/pay/refund", JSON.stringify(data), config);
}

function* refundPut(action) {
  try {
    const result = yield call(refundPutAPI, action.data);
    const data = result.data.data;
    yield put({
      type: REFUND_PUT_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: REFUND_PUT_FAILURE,
      error: "환불신청에 실패하였습니다.",
    });
  }
}

// 환불신청
function refundedPutAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  return axios.put("/pay/refunded", JSON.stringify(data), config);
}

function* refundedPut(action) {
  try {
    const result = yield call(refundedPutAPI, action.data);
    const data = result.data.data;
    yield put({
      type: REFUNDED_PUT_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: REFUNDED_PUT_FAILURE,
      error: "환불하기에 실패하였습니다.",
    });
  }
}

// 환불취소신청
function refundCanclePutAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  return axios.put("/pay/refund/cancle", JSON.stringify(data), config);
}

function* refundCanclePut(action) {
  try {
    const result = yield call(refundCanclePutAPI, action.data);
    const data = result.data.data;
    yield put({
      type: REFUND_CANCLE_PUT_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: REFUND_CANCLE_PUT_FAILURE,
      error: "환불신청에 실패하였습니다.",
    });
  }
}

// 대시보드페이지 결제목록
function userPayGetAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  const id = data;
  return axios.get(`/pay/${id}`, config);
}

function* userPayGet(action) {
  try {
    const result = yield call(userPayGetAPI, action.data);
    const data = result.data.data;
    yield put({
      type: USER_PAY_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: USER_PAY_GET_FAILURE,
      error: "결제 목록 가져오기 실패",
    });
  }
}

// 어드민 결제목록
function payGetAPI() {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.get("/admin/pay", config);
}

function* payGet() {
  try {
    const result = yield call(payGetAPI);
    const data = result.data.data;
    yield put({
      type: PAY_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: PAY_GET_FAILURE,
      error: "결제 정보 저장 실패",
    });
  }
}

// 사용자용 결제목록
function* watchUserPayGet() {
  yield takeLatest(USER_PAY_GET_REQUEST, userPayGet);
}

// 유료강의 결제하기
function* watchPayPost() {
  yield takeLatest(PAY_POST_REQUEST, payPost);
}

// 환불신청
function* watchRefundPut() {
  yield takeLatest(REFUND_PUT_REQUEST, refundPut);
}

// 환불신청
function* watchRefundedPut() {
  yield takeLatest(REFUNDED_PUT_REQUEST, refundedPut);
}

// 환불취소
function* watchRefundCanclePut() {
  yield takeLatest(REFUND_CANCLE_PUT_REQUEST, refundCanclePut);
}

// 무료강의 결제하기
function* watchFreePost() {
  yield takeLatest(FREE_POST_REQUEST, freePost);
}

// 관리자용 결제내역
function* watchPayGet() {
  yield takeLatest(PAY_GET_REQUEST, payGet);
}

// 강의 결제 체크
function* watchPayCheckGet() {
  yield takeLatest(PAY_CHECK_GET_REQUEST, payCheckGet);
}

export default function* paySaga() {
  yield all([
    fork(watchPayPost),
    fork(watchPayGet),
    fork(watchUserPayGet),
    fork(watchFreePost),
    fork(watchPayCheckGet),
    fork(watchRefundPut),
    fork(watchRefundedPut),
    fork(watchRefundCanclePut),
  ]);
}
