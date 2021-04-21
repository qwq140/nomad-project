import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "axios";
import {
  VIDEO_DELETE_SUCCESS,
  VIDEO_DELETE_REQUEST,
  VIDEO_DELETE_FAILURE,
  VIDEO_POST_REQUEST,
  VIDEO_POST_SUCCESS,
  VIDEO_POST_FAILURE,
  VIDEO_ALL_GET_REQUEST,
  VIDEO_ALL_GET_SUCCESS,
  VIDEO_ALL_GET_FAILURE,
  VIDEO_DETAIL_GET_REQUEST,
  VIDEO_DETAIL_GET_SUCCESS,
  VIDEO_DETAIL_GET_FAILURE,
  VIDEO_PUT_SUCCESS,
  VIDEO_PUT_FAILURE,
  VIDEO_PUT_REQUEST,
} from "../../../reducers/admin/video/";

function vimeoCreateFolder(data) {
  const headerPost = {
    Accept: "application/vnd.vimeo.*+json;version=3.4",
    Authorization: `Bearer ${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };
  return axios({
    method: "post",
    url: `https://api.vimeo.com/me/projects`,
    headers: headerPost,
    data: JSON.stringify(data),
  });
}
function vimeoDeleteFolder(data) {
  const headerDelete = {
    Accept: "application/vnd.vimeo.*+json;version=3.4",
    Authorization: `Bearer ${process.env.REACT_APP_VIMEO_ACCESS_TOKEN}`,
    "Content-Type": "application/x-www-form-urlencode",
  };
  return axios({
    method: "delete",
    url: `https://api.vimeo.com/me/projects/${data}`,
    headers: headerDelete,
  });
}

function videoPostAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.post("/admin/video", JSON.stringify(data), config);
}
function* videoPost(action) {
  try {
    // vimeo 폴더 생성 후 폴더 id값 가져오기 (vimeoFolderId)
    const vimeoResult = yield call(vimeoCreateFolder, action.data);
    const parse = vimeoResult.data.uri.split("/");
    const data = action.data;
    const folderId = parse[parse.length - 1];
    data.vimeoFolderId = folderId;

    // 데이터 서버에 저장
    const result = yield call(videoPostAPI, data);

    yield put({
      type: VIDEO_POST_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    yield put({
      type: VIDEO_POST_FAILURE,
      error: "폴더 등록에 실패하였습니다.",
    });
    if (err.response.status === 403) {
      alert("서비스를 사용할 권한이 없습니다. 관리자에게 문의해주세요.");
      yield put(push("/"));
    }
  }
}

function videoAllGetAPI() {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.get("/admin/video", config);
}
function* videoAllGet() {
  try {
    const result = yield call(videoAllGetAPI);
    yield put({
      type: VIDEO_ALL_GET_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    yield put({
      type: VIDEO_ALL_GET_FAILURE,
      error: "실패",
    });
  }
}

function videoDeleteAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.delete(`/admin/video/${data}`, config);
}
function* videoDelete(action) {
  try {
    yield call(vimeoDeleteFolder, action.data.vimeoFolderId);
    yield call(videoDeleteAPI, action.data.id);
    yield put({
      type: VIDEO_DELETE_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: VIDEO_DELETE_FAILURE,
      error: "실패",
    });
    if (err.response.status === 403) {
      alert("서비스를 사용할 권한이 없습니다. 관리자에게 문의해주세요.");
      yield put(push("/"));
    }
  }
}

function videoDetailGetAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.get(`/admin/video/${data}`, config);
}
function* videoDetailGet(action) {
  try {
    const result = yield call(videoDetailGetAPI, action.data);
    yield put({
      type: VIDEO_DETAIL_GET_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    yield put({
      type: VIDEO_DETAIL_GET_FAILURE,
      error: "실패",
    });
  }
}
function videoPutAPI(data) {
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  const _data = {
    contents: data.contents,
    contentList: data.contentList,
  };
  return axios.put(`/admin/video/${data.id}`, JSON.stringify(_data), config);
}
function* videoPut(action) {
  try {
    const result = yield call(videoPutAPI, action.data);
    yield put({
      type: VIDEO_PUT_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    yield put({
      type: VIDEO_PUT_FAILURE,
      error: "Curriculum 등록에 실패하였습니다.",
    });
    if (err.response.status === 403) {
      alert("서비스를 사용할 권한이 없습니다. 관리자에게 문의해주세요.");
      yield put(push("/"));
    }
  }
}

function* watchVideoPost() {
  yield takeLatest(VIDEO_POST_REQUEST, videoPost);
}

function* watchVideoAllGet() {
  yield takeLatest(VIDEO_ALL_GET_REQUEST, videoAllGet);
}

function* watchVideoDelete() {
  yield takeLatest(VIDEO_DELETE_REQUEST, videoDelete);
}
function* watchVideoDetailGet() {
  yield takeLatest(VIDEO_DETAIL_GET_REQUEST, videoDetailGet);
}
function* watchVideoPut() {
  yield takeLatest(VIDEO_PUT_REQUEST, videoPut);
}

export default function* userSaga() {
  yield all([
    fork(watchVideoPost),
    fork(watchVideoAllGet),
    fork(watchVideoDelete),
    fork(watchVideoDetailGet),
    fork(watchVideoPut),
  ]);
}
