import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  // 비디오 가져오기
  VIDEO_GET_FAILURE,
  VIDEO_GET_REQUEST,
  VIDEO_GET_SUCCESS,
} from "../reducers/video";
import { push } from "connected-react-router";

// 비디오 가져오기
function videoGetAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.get(`/video/${data}`, config);
}

function* videoGet(action) {
  try {
    const result = yield call(videoGetAPI, action.data);
    const data = result.data.data;
    yield put({
      type: VIDEO_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: VIDEO_GET_FAILURE,
      error: "로그인에 실패하였습니다.",
    });

    if (err.response.status === 400) {
      alert(err.response.data);
      yield put(push("/"));
    }
  }
}

function* watchVideoGet() {
  yield takeLatest(VIDEO_GET_REQUEST, videoGet);
}

export default function* videoSaga() {
  yield all([fork(watchVideoGet)]);
}
