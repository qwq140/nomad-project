import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "axios";

import {
  // 태크 등록
  TECH_POST_FAILURE,
  TECH_POST_REQUEST,
  TECH_POST_SUCCESS,

  // 테크 리스트
  TECH_GET_FAILURE,
  TECH_GET_REQUEST,
  TECH_GET_SUCCESS,

  // 테크 삭제
  TECH_DELETE_FAILURE,
  TECH_DELETE_REQUEST,
  TECH_DELETE_SUCCESS,
} from "../../../reducers/admin/tech/index";

// 태크등록
function techPostAPI(data) {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("title", data.title);
  formData.append("isFilter", data.isFilter);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.post("/admin/tech", formData, config);
}

function* techPost(action) {
  try {
    const result = yield call(techPostAPI, action.data);
    yield put({
      type: TECH_POST_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    yield put({
      type: TECH_POST_FAILURE,
      error: "테크등록에 실패하였습니다.",
    });
  }
}

// 태크 리스트
function techGetAPI() {
  return axios.get("/tech");
}

function* techGet() {
  try {
    const result = yield call(techGetAPI);
    yield put({
      type: TECH_GET_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    yield put({
      type: TECH_GET_FAILURE,
      error: "테크 가져오기 실패.",
    });
  }
}

// 태크 삭제
function techDeleteAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.delete(`/admin/tech/${data}`, config);
}

function* techDelete(action) {
  try {
    yield call(techDeleteAPI, action.data);
    yield put({
      type: TECH_DELETE_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: TECH_DELETE_FAILURE,
      error: "테크작성에 실패하였습니다.",
    });
  }
}

function* watchTechPost() {
  yield takeLatest(TECH_POST_REQUEST, techPost);
}

function* watchTechDelete() {
  yield takeLatest(TECH_DELETE_REQUEST, techDelete);
}

function* watchTechGet() {
  yield takeLatest(TECH_GET_REQUEST, techGet);
}

export default function* techSaga() {
  yield all([fork(watchTechPost), fork(watchTechGet), fork(watchTechDelete)]);
}
