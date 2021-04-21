import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  COURSES_GET_FAILURE,
  COURSES_GET_REQUEST,
  COURSES_GET_SUCCESS,
  HOME_COURSES_GET_FAILURE,
  HOME_COURSES_GET_REQUEST,
  HOME_COURSES_GET_SUCCESS,
  COURSES_ONE_GET_FAILURE,
  COURSES_ONE_GET_REQUEST,
  COURSES_ONE_GET_SUCCESS,
  COURSES_FILTER_GET_FAILURE,
  COURSES_FILTER_GET_REQUEST,
  COURSES_FILTER_GET_SUCCESS,
} from "../reducers/courses";
import { push } from "connected-react-router";

function coursesGetAPI() {
  return axios.get(`/courses`);
}

function* coursesGet() {
  try {
    const result = yield call(coursesGetAPI);
    const data = result.data.data;
    yield put({
      type: COURSES_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: COURSES_GET_FAILURE,
      error: "로그인에 실패하였습니다.",
    });
  }
}

function homeCoursesGetAPI() {
  return axios.get(`/homeCourses`);
}

function* homeCoursesGet(action) {
  try {
    const result = yield call(homeCoursesGetAPI, action.data);
    const data = result.data.data;
    yield put({
      type: HOME_COURSES_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: HOME_COURSES_GET_FAILURE,
      error: "로그인에 실패하였습니다.",
    });
  }
}

function coursesOneGetAPI(data) {
  return axios.get(`/courses/${data}`);
}

function* coursesOneGet(action) {
  try {
    const result = yield call(coursesOneGetAPI, action.data);
    const data = result.data.data;
    yield put({
      type: COURSES_ONE_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: COURSES_ONE_GET_FAILURE,
      error: "로그인에 실패하였습니다.",
    });

    if (err.response.status === 400) {
      alert(err.response.data);
      yield put(push("/courses"));
    }
  }
}
function coursesFilterGetAPI(data) {
  return axios.get(
    `/courses/filter?level=${data.level}&isFree=${data.isFree}&techId=${data.techId}`
  );
}

function* coursesFilterGet(action) {
  try {
    const result = yield call(coursesFilterGetAPI, action.data);
    const data = result.data.data;
    yield put({
      type: COURSES_FILTER_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: COURSES_FILTER_GET_FAILURE,
      error: "로그인에 실패하였습니다.",
    });
  }
}

function* watchCoursesGet() {
  yield takeLatest(COURSES_GET_REQUEST, coursesGet);
}

function* watchHomeCoursesGet() {
  yield takeLatest(HOME_COURSES_GET_REQUEST, homeCoursesGet);
}

function* watchCoursesOneGet() {
  yield takeLatest(COURSES_ONE_GET_REQUEST, coursesOneGet);
}
function* watchFilterCoursesGet() {
  yield takeLatest(COURSES_FILTER_GET_REQUEST, coursesFilterGet);
}

export default function* coursesSaga() {
  yield all([
    fork(watchCoursesGet),
    fork(watchCoursesOneGet),
    fork(watchHomeCoursesGet),
    fork(watchFilterCoursesGet),
  ]);
}
