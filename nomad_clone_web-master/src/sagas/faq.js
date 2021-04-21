import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "axios";

import {
  // FAQ 등록
  FAQ_POST_FAILURE,
  FAQ_POST_REQUEST,
  FAQ_POST_SUCCESS,

  // FAQ 수정
  FAQ_UPDATE_FAILURE,
  FAQ_UPDATE_REQUEST,
  FAQ_UPDATE_SUCCESS,

  // FAQ가져오기
  FAQ_GET_FAILURE,
  FAQ_GET_REQUEST,
  FAQ_GET_SUCCESS,

  // FAQ한건 가져오기
  FAQ_ONE_GET_FAILURE,
  FAQ_ONE_GET_REQUEST,
  FAQ_ONE_GET_SUCCESS,

  // FAQ 카테고리 등록
  FAQ_CATEGORY_POST_FAILURE,
  FAQ_CATEGORY_POST_REQUEST,
  FAQ_CATEGORY_POST_SUCCESS,

  // FAQ 카테고리 가져오기
  FAQ_CATEGORY_GET_FAILURE,
  FAQ_CATEGORY_GET_REQUEST,
  FAQ_CATEGORY_GET_SUCCESS,
} from "../reducers/faq";

// FAQ 수정하기
function faqUpdateAPI(data) {
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.put(`/admin/faq/${data.faqId}`, JSON.stringify(data), config);
}

function* faqUpdate(action) {
  try {
    const result = yield call(faqUpdateAPI, action.data);
    const data = result.data.data;
    yield put({
      type: FAQ_UPDATE_SUCCESS,
      data: data,
    });
    yield put(push("/faq"));
  } catch (err) {
    yield put({
      type: FAQ_UPDATE_FAILURE,
      error: "FAQ업데이트에 실패하였습니다.",
    });
    if (err.response.status === 403) {
      alert("서비스를 사용할 권한이 없습니다. 관리자에게 문의해주세요.");
      yield put(push("/"));
    }
  }
}

// FAQ 한건 가져오기
function faqOneGetAPI(data) {
  return axios.get(`/faq/${data}`);
}

function* faqOneGet(action) {
  try {
    const result = yield call(faqOneGetAPI, action.data);
    const data = result.data.data;
    yield put({
      type: FAQ_ONE_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: FAQ_ONE_GET_FAILURE,
      error: "로그인에 실패하였습니다.",
    });

    if (err.response.status === 400) {
      alert(err.response.data);
      yield put(push("/faq"));
    }
  }
}

// FAQ등록
function faqPostAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.post("/admin/faq", JSON.stringify(data), config);
}

function* faqPost(action) {
  try {
    yield call(faqPostAPI, action.data);
    yield put({
      type: FAQ_POST_SUCCESS,
    });
    yield put(push("/faq"));
  } catch (err) {
    yield put({
      type: FAQ_POST_FAILURE,
      error: "FAQ작성에 실패하였습니다.",
    });
    if (err.response.status === 403) {
      alert("서비스를 사용할 권한이 없습니다. 관리자에게 문의해주세요.");
      yield put(push("/"));
    }
  }
}

// FAQ 가져오기
function faqGetAPI() {
  return axios.get(`/faq/category`);
}

function* faqGet() {
  try {
    const result = yield call(faqGetAPI);
    const data = result.data.data;
    yield put({
      type: FAQ_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: FAQ_GET_FAILURE,
      error: "로그인에 실패하였습니다.",
    });
  }
}

// FAQ 카테고리 등록
function faqCategoryPostAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.post("/admin/faq/category", JSON.stringify(data), config);
}

function* faqCategoryPost(action) {
  try {
    const result = yield call(faqCategoryPostAPI, action.data);
    yield put({
      type: FAQ_CATEGORY_POST_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    yield put({
      type: FAQ_CATEGORY_POST_FAILURE,
      error: "FAQ작성에 실패하였습니다.",
    });
    if (err.response.status === 403) {
      alert("서비스를 사용할 권한이 없습니다. 관리자에게 문의해주세요.");
      yield put(push("/"));
    }
  }
}

// FAQ 카테고리 가져오기
function faqCategoryGetAPI() {
  return axios.get(`/faq/category`);
}

function* faqCategoryGet() {
  try {
    const result = yield call(faqCategoryGetAPI);
    const data = result.data.data;
    yield put({
      type: FAQ_CATEGORY_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: FAQ_CATEGORY_GET_FAILURE,
      error: "로그인에 실패하였습니다.",
    });
  }
}

function* watchFaqPost() {
  yield takeLatest(FAQ_POST_REQUEST, faqPost);
}
function* watchFaqUpdate() {
  yield takeLatest(FAQ_UPDATE_REQUEST, faqUpdate);
}
function* watchFaqGet() {
  yield takeLatest(FAQ_GET_REQUEST, faqGet);
}
function* watchFaqOneGet() {
  yield takeLatest(FAQ_ONE_GET_REQUEST, faqOneGet);
}
function* watchFaqCategoryPost() {
  yield takeLatest(FAQ_CATEGORY_POST_REQUEST, faqCategoryPost);
}
function* watchFaqCategoryGet() {
  yield takeLatest(FAQ_CATEGORY_GET_REQUEST, faqCategoryGet);
}

export default function* faqSaga() {
  yield all([
    fork(watchFaqPost),
    fork(watchFaqGet),
    fork(watchFaqOneGet),
    fork(watchFaqUpdate),
    fork(watchFaqCategoryPost),
    fork(watchFaqCategoryGet),
  ]);
}
