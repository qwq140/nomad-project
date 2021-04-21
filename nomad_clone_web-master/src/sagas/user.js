import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  NAME_PUT_FAILURE,
  NAME_PUT_REQUEST,
  NAME_PUT_SUCCESS,
} from "../reducers/user";
import { push } from "connected-react-router";
// logInAPI, logIn, watchLogIn 세트이다. 복사해서 쓰자.
function logInAPI(data) {
  return axios.post("/oauth/jwt/google", JSON.stringify(data));
}
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    const data = result.data.data;
    localStorage.setItem("nomadToken", data.token);
    delete data.token;
    yield put({
      type: LOG_IN_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: "로그인에 실패하였습니다.",
    });
  }
}

function* logOut() {
  localStorage.removeItem("nomadToken");
  yield put({
    type: LOG_OUT_SUCCESS,
  });
  yield put(push("/login"));
}

function loadMyInfoAPI() {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.get("/user/load", config);
}
function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    const data = result.data.data;
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: data,
    });
  } catch (error) {
    console.dir(error);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: error.response.data,
    });
  }
}

// 이름변경
function namePutAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const id = data.id;
  const name = data.name;
  return axios.put(`/user/name/${id}`, JSON.stringify(name), config);
}

function* namePut(action) {
  try {
    const result = yield call(namePutAPI, action.data);
    const data = result.data.data;
    yield put({
      type: NAME_PUT_SUCCESS,
      data: data,
    });

    yield put(push("/"));
  } catch (err) {
    yield put({
      type: NAME_PUT_FAILURE,
      error: "이름 업데이트에 실패하였습니다.",
    });
    if (err.response.status === 400) {
      alert(err.response.data);
      yield put(push("/"));
    }
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

// 이름변경
function* watchNamePut() {
  yield takeLatest(NAME_PUT_REQUEST, namePut);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchLoadMyInfo),
    fork(watchNamePut),
  ]);
}
