import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "axios";
import {
  COURSES_POST_FAILURE,
  COURSES_POST_REQUEST,
  COURSES_POST_SUCCESS,
} from "../../../reducers/admin/courses/courses";

// 관리자 코스 등록
function coursesPostAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.post("/admin/courses", JSON.stringify(data), config);
}

function* coursesPost(action) {
  try {
    const result = yield call(coursesPostAPI, action.data);
    yield put({
      type: COURSES_POST_SUCCESS,
    });
    console.log(result);
    if (result.data.statusCode === 201) {
      yield put(push("/courses"));
    }
  } catch (err) {
    yield put({
      type: COURSES_POST_FAILURE,
      error: "글작성에 실패하였습니다.",
    });
  }
}

// 관리자 코스 등록
function* watchCoursesPost() {
  yield takeLatest(COURSES_POST_REQUEST, coursesPost);
}

export default function* userSaga() {
  yield all([fork(watchCoursesPost)]);
}
