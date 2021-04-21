import React, { memo } from "react";
import { Link } from "react-router-dom";
import { CommunityBoardItem } from "../pages/community/style";
import { timeForToday } from "../util/Script";
import LikeButton from "./LikeButton";
import { CommunityLikeButton } from "./style";

const CommunityItem = memo(({ list }) => {
  return (
    <>
      <CommunityBoardItem size="large">
        <div className="Board-Fav">
          <CommunityLikeButton>
            <LikeButton
              listId={list.id}
              count={list.likeCount}
              state={list.likeCheck}
            />
          </CommunityLikeButton>
        </div>
        <div className="Board-Body">
          <Link to={`/communityDetail/${list.id}`}>
            <div className="Board-Body-Title">{list.title}</div>
          </Link>
          <div className="Board-Body-Info">
            <div className="Info-Tag">
              in &nbsp;
              <span>#{list.categoryTitle}</span>
            </div>
            <div className="Info-Name">
              by
              <Link to={`/dashboard/${list.userId}`}>
                <span> {list.name}</span>
              </Link>
            </div>
            <div className="Info-Date">
              &#8226;
              <span>{timeForToday(list.createDate)}</span>
            </div>
            <div className="Info-Reply">
              &#8226; &nbsp;
              <span>💬 </span>
              <b>{list.replyCount}</b>
            </div>
          </div>
        </div>
        <div className="Board-UserImg">
          <Link to={`/dashboard/${list.userId}`}>
            <img src={list.imageUrl} alt="" />
          </Link>
        </div>
      </CommunityBoardItem>
    </>
  );
});

export default CommunityItem;
