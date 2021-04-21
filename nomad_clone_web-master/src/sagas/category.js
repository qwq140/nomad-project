import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "axios";

import {
  // 커뮤니티 카테고리 가져오기
  CATEGORY_GET_FAILURE,
  CATEGORY_GET_REQUEST,
  CATEGORY_GET_SUCCESS,
  // 커뮤니티 카테고리 등록하기
  CATEGORY_POST_FAILURE,
  CATEGORY_POST_REQUEST,
  CATEGORY_POST_SUCCESS,
} from "../reducers/category";

// 커뮤니티 카테고리 가져오기
function categoryGetAPI() {
  return axios.get(`/category`);
}

function* categoryGet() {
  try {
    const result = yield call(categoryGetAPI);
    const data = result.data.data;
    yield put({
      type: CATEGORY_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: CATEGORY_GET_FAILURE,
      error: "로그인에 실패하였습니다.",
    });
  }
}

// 커뮤니티 카테고리 등록하기
function categoryPostAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.post("/admin/category", JSON.stringify(data), config);
}

function* categoryPost(action) {
  try {
    const result = yield call(categoryPostAPI, action.data);
    yield put({
      type: CATEGORY_POST_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    yield put({
      type: CATEGORY_POST_FAILURE,
      error: "FAQ작성에 실패하였습니다.",
    });
    if (err.response.status === 403) {
      alert("서비스를 사용할 권한이 없습니다. 관리자에게 문의해주세요.");
      yield put(push("/"));
    }
  }
}

//
function* watchCategoryGet() {
  yield takeLatest(CATEGORY_GET_REQUEST, categoryGet);
}

function* watchCategoryPost() {
  yield takeLatest(CATEGORY_POST_REQUEST, categoryPost);
}

export default function* categorySaga() {
  yield all([fork(watchCategoryGet), fork(watchCategoryPost)]);
}
