import produce from "immer";

// 상태
export const initialState = {
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  communityPostLoading: false,
  communityPostDone: false,
  communityPostError: null,

  communityDeleteLoading: false,
  communityDeleteDone: false,
  communityDeleteError: null,

  communityLikePostLoading: false,
  communityLikePostDone: false,
  communityLikePostError: null,

  communityDetailLikePostLoading: false,
  communityDetailLikePostDone: false,
  communityDetailLikePostError: null,

  communityGetLoading: false,
  communityGetDone: false,
  communityGetError: null,

  communityOneGetLoading: false,
  communityOneGetDone: false,
  communityOneGetError: null,

  communityCategoryGetLoading: false,
  communityCategoryGetDone: false,
  communityCategoryGetError: null,

  communityList: [],
  communityItem: null,

  replyPostLoading: false, // 로그인 시도중 -> 로딩창 띄움
  replyPostDone: false,
  replyPostError: null,

  replyDeleteLoading: false, // 로그인 시도중 -> 로딩창 띄움
  replyDeleteDone: false,
  replyDeleteError: null,
};

// 타입
export const COMMUNITY_POST_REQUEST = "COMMUNITY_POST_REQUEST";
export const COMMUNITY_POST_SUCCESS = "COMMUNITY_POST_SUCCESS";
export const COMMUNITY_POST_FAILURE = "COMMUNITY_POST_FAILURE";

export const COMMUNITY_LIKE_POST_REQUEST = "COMMUNITY_LIKE_POST_REQUEST";
export const COMMUNITY_LIKE_POST_SUCCESS = "COMMUNITY_LIKE_POST_SUCCESS";
export const COMMUNITY_LIKE_POST_FAILURE = "COMMUNITY_LIKE_POST_FAILURE";

export const COMMUNITY_DETAIL_LIKE_POST_REQUEST =
  "COMMUNITY_DETAIL_LIKE_POST_REQUEST";
export const COMMUNITY_DETAIL_LIKE_POST_SUCCESS =
  "COMMUNITY_DETAIL_LIKE_POST_SUCCESS";
export const COMMUNITY_DETAIL_LIKE_POST_FAILURE =
  "COMMUNITY_DETAIL_LIKE_POST_FAILURE";

export const COMMUNITY_GET_REQUEST = "COMMUNITY_GET_REQUEST";
export const COMMUNITY_GET_SUCCESS = "COMMUNITY_GET_SUCCESS";
export const COMMUNITY_GET_FAILURE = "COMMUNITY_GET_FAILURE";

export const COMMUNITY_DELETE_REQUEST = "COMMUNITY_DELETE_REQUEST";
export const COMMUNITY_DELETE_SUCCESS = "COMMUNITY_DELETE_SUCCESS";
export const COMMUNITY_DELETE_FAILURE = "COMMUNITY_DELETE_FAILURE";

export const COMMUNITY_ONE_GET_REQUEST = "COMMUNITY_ONE_GET_REQUEST";
export const COMMUNITY_ONE_GET_SUCCESS = "COMMUNITY_ONE_GET_SUCCESS";
export const COMMUNITY_ONE_GET_FAILURE = "COMMUNITY_ONE_GET_FAILURE";

export const COMMUNITY_CATEGORY_GET_REQUEST = "COMMUNITY_CATEGORY_GET_REQUEST";
export const COMMUNITY_CATEGORY_GET_SUCCESS = "COMMUNITY_CATEGORY_GET_SUCCESS";
export const COMMUNITY_CATEGORY_GET_FAILURE = "COMMUNITY_CATEGORY_GET_FAILURE";

export const REPLY_POST_REQUEST = "REPLY_POST_REQUEST";
export const REPLY_POST_SUCCESS = "REPLY_POST_SUCCESS";
export const REPLY_POST_FAILURE = "REPLY_POST_FAILURE";

export const REPLY_DELETE_REQUEST = "REPLY_DELETE_REQUEST";
export const REPLY_DELETE_SUCCESS = "REPLY_DELETE_SUCCESS";
export const REPLY_DELETE_FAILURE = "REPLY_DELETE_FAILURE";

// 스크롤링을 위함
export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

// 커뮤니티

// 댓글작성
export const replyPostRequestAction = (data) => {
  return {
    type: REPLY_POST_REQUEST,
    data,
  };
};

// 댓글삭제
export const replyDeleteRequestAction = (data) => {
  return {
    type: REPLY_DELETE_REQUEST,
    data,
  };
};

// 게시글삭제
export const communityDeleteRequestAction = (data) => {
  return {
    type: COMMUNITY_DELETE_REQUEST,
    data,
  };
};

// 게시글작성
export const communityPostRequestAction = (data) => {
  return {
    type: COMMUNITY_POST_REQUEST,
    data,
  };
};

// 게시글좋아요
export const communityLikePostRequestAction = (data) => {
  return {
    type: COMMUNITY_LIKE_POST_REQUEST,
    data,
  };
};

// 게시글상세좋아요
export const communityDetailLikePostRequestAction = (data) => {
  return {
    type: COMMUNITY_DETAIL_LIKE_POST_REQUEST,
    data,
  };
};

// 게시글모두가져오기
export const communityGetRequestAction = (data) => {
  return {
    type: COMMUNITY_GET_REQUEST,
    data,
  };
};

// 게시글 상세보기
export const communityOneGetRequestAction = (data) => {
  return {
    type: COMMUNITY_ONE_GET_REQUEST,
    data,
  };
};

// 카테고리별 게시글 가져오기
export const communityCategoryGetRequestAction = (data) => {
  return {
    type: COMMUNITY_CATEGORY_GET_REQUEST,
    data,
  };
};

export const loadPostsRequestAction = (data) => {
  return {
    type: LOAD_POSTS_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case COMMUNITY_POST_REQUEST:
        draft.communityPostLoading = true;
        draft.communityPostDone = false;
        draft.communityPostError = null;
        break;

      case COMMUNITY_POST_SUCCESS:
        draft.communityPostLoading = false;
        draft.communityPostDone = true;
        break;

      case COMMUNITY_POST_FAILURE:
        draft.communityPostLoading = false;
        draft.communityPostError = action.error;
        break;

      // 좋아요버튼 누르기
      case COMMUNITY_LIKE_POST_REQUEST:
        draft.communityLikePostLoading = true;
        draft.communityLikePostDone = false;
        draft.communityLikePostError = null;
        break;

      case COMMUNITY_LIKE_POST_SUCCESS:
        draft.communityLikePostLoading = false;
        draft.communityLikePostDone = true;
        draft.communityList = draft.communityList.map((list) => {
          if (list.id === action.data.id) {
            list.likeCount = action.data.likeCount;
            list.likeCheck = action.data.likeCheck;
          }
          return list;
        });
        break;
      case COMMUNITY_LIKE_POST_FAILURE:
        draft.communityLikePostLoading = false;
        draft.communityLikePostError = action.error;
        break;

      // 좋아요버튼 누르기
      case COMMUNITY_DETAIL_LIKE_POST_REQUEST:
        draft.communityDetailLikePostLoading = true;
        draft.communityDetailLikePostDone = false;
        draft.communityDetailLikePostError = null;
        break;

      case COMMUNITY_DETAIL_LIKE_POST_SUCCESS:
        draft.communityDetailLikePostLoading = false;
        draft.communityDetailLikePostDone = true;
        if (draft.communityItem.id === action.data.id) {
          draft.communityItem.likeCount = action.data.likeCount;
          draft.communityItem.likeCheck = action.data.likeCheck;
        }
        break;

      case COMMUNITY_DETAIL_LIKE_POST_FAILURE:
        draft.communityLikePostLoading = false;
        draft.communityLikePostError = action.error;
        break;

      // get
      case COMMUNITY_GET_REQUEST:
        draft.communityGetLoading = true;
        draft.communityGetDone = false;
        draft.communityGetError = null;
        draft.communityLikePostError = null;
        break;

      case COMMUNITY_GET_SUCCESS:
        draft.communityGetLoading = false;
        draft.communityGetDone = true;
        draft.communityList = action.data;
        draft.hasMorePosts = action.data.length === 10;
        break;

      case COMMUNITY_GET_FAILURE:
        draft.communityGetLoading = false;
        draft.communityGetError = action.error;
        break;

      // 1개 찾기
      case COMMUNITY_ONE_GET_REQUEST:
        draft.communityOneGetLoading = true;
        draft.communityOneGetDone = false;
        draft.communityOneGetError = null;
        break;

      case COMMUNITY_ONE_GET_SUCCESS:
        draft.communityOneGetLoading = false;
        draft.communityOneGetDone = true;
        draft.communityItem = action.data;
        break;

      case COMMUNITY_ONE_GET_FAILURE:
        draft.communityGetLoading = false;
        draft.communityGetError = action.error;
        break;

      // 카테고리아이디로 찾기
      case COMMUNITY_CATEGORY_GET_REQUEST:
        draft.communityCategoryGetLoading = true;
        draft.communityCategoryGetDone = false;
        draft.communityCategoryGetError = null;
        break;

      case COMMUNITY_CATEGORY_GET_SUCCESS:
        draft.communityCategoryGetLoading = false;
        draft.communityCategoryGetDone = true;
        draft.communityList = action.data;
        break;

      case COMMUNITY_CATEGORY_GET_FAILURE:
        draft.communityCategoryGetLoading = false;
        draft.communityCategoryGetError = action.error;
        break;

      // 리플리 작성
      case REPLY_POST_REQUEST:
        draft.replyPostLoading = true;
        draft.replyPostDone = false;
        draft.replyPostError = null;
        break;

      case REPLY_POST_SUCCESS:
        draft.replyPostLoading = false;
        draft.replyPostDone = true;
        draft.communityItem.community.replys.unshift(action.data);
        break;

      case REPLY_POST_FAILURE:
        draft.replyPostLoading = false;
        draft.replyPostError = action.error;
        break;

      // 리플리 삭제
      case REPLY_DELETE_REQUEST:
        draft.replyDeleteLoading = true;
        draft.replyDeleteDone = false;
        draft.replyDeleteError = null;
        break;

      case REPLY_DELETE_SUCCESS:
        draft.replyDeleteLoading = false;
        draft.replyDeleteDone = true;
        draft.communityItem.community.replys = draft.communityItem.community.replys.filter(
          (v) => v.id !== action.data
        );
        break;

      case REPLY_DELETE_FAILURE:
        draft.replyDeleteLoading = false;
        draft.replyDeleteError = action.error;
        break;

      // 게시글 삭제
      case COMMUNITY_DELETE_REQUEST:
        draft.communityDeleteLoading = true;
        draft.communityDeleteDone = false;
        draft.communityDeleteError = null;
        break;

      case COMMUNITY_DELETE_SUCCESS:
        draft.communityDeleteLoading = false;
        draft.communityDeleteDone = true;
        break;

      case COMMUNITY_DELETE_FAILURE:
        draft.communityDeleteLoading = false;
        draft.communityDeleteError = action.error;
        break;

      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.communityList = draft.communityList.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      default:
        return state;
    }
  });
};
export default reducer;
