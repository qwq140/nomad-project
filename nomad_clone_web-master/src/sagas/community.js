import { all, call, fork, put, takeLatest, throttle } from "redux-saga/effects";
import { push } from "connected-react-router";
import axios from "axios";

import {
  // 글작성
  COMMUNITY_POST_FAILURE,
  COMMUNITY_POST_REQUEST,
  COMMUNITY_POST_SUCCESS,

  // 글삭제
  COMMUNITY_DELETE_FAILURE,
  COMMUNITY_DELETE_REQUEST,
  COMMUNITY_DELETE_SUCCESS,

  // 게시글좋아요
  COMMUNITY_LIKE_POST_FAILURE,
  COMMUNITY_LIKE_POST_REQUEST,
  COMMUNITY_LIKE_POST_SUCCESS,

  // 상세페이지 게시글좋아요
  COMMUNITY_DETAIL_LIKE_POST_FAILURE,
  COMMUNITY_DETAIL_LIKE_POST_REQUEST,
  COMMUNITY_DETAIL_LIKE_POST_SUCCESS,

  // 글목록
  COMMUNITY_GET_FAILURE,
  COMMUNITY_GET_REQUEST,
  COMMUNITY_GET_SUCCESS,

  // 카테고리로 필터링
  COMMUNITY_CATEGORY_GET_FAILURE,
  COMMUNITY_CATEGORY_GET_REQUEST,
  COMMUNITY_CATEGORY_GET_SUCCESS,

  // 상세보기
  COMMUNITY_ONE_GET_FAILURE,
  COMMUNITY_ONE_GET_REQUEST,
  COMMUNITY_ONE_GET_SUCCESS,

  // 댓글작성
  REPLY_POST_FAILURE,
  REPLY_POST_REQUEST,
  REPLY_POST_SUCCESS,

  // 댓글삭제
  REPLY_DELETE_FAILURE,
  REPLY_DELETE_REQUEST,
  REPLY_DELETE_SUCCESS,

  // 스크롤링 데이터 가져오기
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
} from "../reducers/community";

function communityPostAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.post("/community", JSON.stringify(data), config);
}

function* communityPost(action) {
  try {
    yield call(communityPostAPI, action.data);
    yield put({
      type: COMMUNITY_POST_SUCCESS,
    });
    yield put(push("/community"));
  } catch (err) {
    yield put({
      type: COMMUNITY_POST_FAILURE,
      error: "글작성에 실패하였습니다.",
    });
  }
}

function communityLikePostAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.post(`/like`, JSON.stringify(data), config);
}

function* communityLikePost(action) {
  try {
    const result = yield call(communityLikePostAPI, action.data);
    const data = result.data.data;
    console.log(result);
    yield put({
      type: COMMUNITY_LIKE_POST_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: COMMUNITY_LIKE_POST_FAILURE,
      error: err.response.data,
    });
    alert(err.response.data);
    yield put(push("/login"));
  }
}

function communityDetailLikePostAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.post(`/like`, JSON.stringify(data), config);
}

function* communityDetailLikePost(action) {
  try {
    const result = yield call(communityDetailLikePostAPI, action.data);
    const data = result.data.data;
    yield put({
      // 여기수정
      type: COMMUNITY_DETAIL_LIKE_POST_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: COMMUNITY_DETAIL_LIKE_POST_FAILURE,
      error: err.response.data,
    });
    alert(err.response.data);
    yield put(push("/login"));
  }
}

function communityGetAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.get(
    `/community?sort=${data.sort}&categoryId=${data.categoryId}&page=${data.page}`,
    config
  );
}

function* communityGet(action) {
  try {
    const result = yield call(communityGetAPI, action.data);
    const data = result.data.data;
    yield put({
      type: COMMUNITY_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: COMMUNITY_GET_FAILURE,
      error: "로그인에 실패하였습니다.",
    });
  }
}

function communityCategoryGetAPI(data) {
  return axios.get(`/community/category/${data}`);
}

function* communityCategoryGet(action) {
  try {
    const result = yield call(communityCategoryGetAPI, action.data);
    const data = result.data.data;
    yield put({
      type: COMMUNITY_CATEGORY_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: COMMUNITY_CATEGORY_GET_FAILURE,
      error: "로그인에 실패하였습니다.",
    });
  }
}

function communityOneGetAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.get(`/community/${data}`, config);
}

function* communityOneGet(action) {
  try {
    const result = yield call(communityOneGetAPI, action.data);
    const data = result.data.data;
    yield put({
      type: COMMUNITY_ONE_GET_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({
      type: COMMUNITY_ONE_GET_FAILURE,
      error: "로그인에 실패하였습니다.",
    });
    if (err.response.status === 400) {
      alert(err.response.data);
      yield put(push("/community"));
    }
  }
}

function replyPostAPI(data) {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("nomadToken"),
    },
  };
  return axios.post("/cReply", JSON.stringify(data), config);
}

function* replyPost(action) {
  try {
    const result = yield call(replyPostAPI, action.data);

    yield put({
      type: REPLY_POST_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    yield put({
      type: REPLY_POST_FAILURE,
      error: "댓글작성에 실패하였습니다.",
    });
    alert(err.response.data);
    yield put(push("/login"));
  }
}

function replyDeleteAPI(data) {
  return axios.delete(`/cReply/${data}`);
}

function* replyDelete(action) {
  try {
    yield call(replyDeleteAPI, action.data);
    yield put({
      type: REPLY_DELETE_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REPLY_DELETE_FAILURE,
      error: "댓글삭제에 실패하였습니다.",
    });

    if (err.response.status === 400) {
      alert(err.response.data);
    }
  }
}

// 글삭제
function communityDeleteAPI(data) {
  return axios.delete(`/community/${data}`);
}

function* communityDelete(action) {
  try {
    yield call(communityDeleteAPI, action.data);
    yield put({
      type: COMMUNITY_DELETE_SUCCESS,
      data: action.data,
    });
    yield put(push("/community"));
  } catch (err) {
    yield put({
      type: COMMUNITY_DELETE_FAILURE,
      error: "게시글삭제에 실패하였습니다.",
    });

    if (err.response.status === 400) {
      alert(err.response.data);
    }
  }
}

function loadPostsAPI(data) {
  return axios.get(
    `/community?sort=${data.sort}&categoryId=${data.categoryId}&page=${data.page}`
  );
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(3000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchReplyPost() {
  yield takeLatest(REPLY_POST_REQUEST, replyPost);
}

function* watchReplyDelete() {
  yield takeLatest(REPLY_DELETE_REQUEST, replyDelete);
}

function* watchCommunityPost() {
  yield takeLatest(COMMUNITY_POST_REQUEST, communityPost);
}

function* watchCommunityDelete() {
  yield takeLatest(COMMUNITY_DELETE_REQUEST, communityDelete);
}

function* watchCommunityLikePost() {
  yield takeLatest(COMMUNITY_LIKE_POST_REQUEST, communityLikePost);
}

function* watchCommunityDetailLikePost() {
  yield takeLatest(COMMUNITY_DETAIL_LIKE_POST_REQUEST, communityDetailLikePost);
}

function* watchCommunityGet() {
  yield takeLatest(COMMUNITY_GET_REQUEST, communityGet);
}

function* watchCommunityOneGet() {
  yield takeLatest(COMMUNITY_ONE_GET_REQUEST, communityOneGet);
}

function* watchCommunityCategoryGet() {
  yield takeLatest(COMMUNITY_CATEGORY_GET_REQUEST, communityCategoryGet);
}

export default function* communitySaga() {
  yield all([
    fork(watchCommunityPost),
    fork(watchCommunityGet),
    fork(watchCommunityOneGet),
    fork(watchReplyPost),
    fork(watchCommunityCategoryGet),
    fork(watchReplyDelete),
    fork(watchCommunityLikePost),
    fork(watchLoadPosts),
    fork(watchCommunityDetailLikePost),
    fork(watchCommunityDelete),
  ]);
}
