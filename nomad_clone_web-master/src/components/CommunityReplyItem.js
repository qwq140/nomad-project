import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replyDeleteRequestAction } from "../reducers/community";
import { timeForToday } from "../util/Script";
import { CommunityReplyCard } from "./style";

const CommunityReplyItem = ({ list }) => {
  const { principal } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClickReplyDelte = useCallback(() => {
    dispatch(replyDeleteRequestAction(list.id));
  }, []);
  return (
    <>
      <CommunityReplyCard>
        <div className="ReplyItemRight">
          <div className="ReplyItemRightHeader">
            <div className="ReplyItemRightUserInfo">
              <span>
                <img src={list.user.imageUrl} alt="" />
              </span>
              <span>{list.user.name}</span>
              <span>ㅣ {timeForToday(list.createDate)}</span>
            </div>
            {principal !== null ? (
              list.user.id !== principal.id ? null : (
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={onClickReplyDelte}
                />
              )
            ) : null}
          </div>
          <div className="ReplyItemRightContent">{list.content}</div>
        </div>
      </CommunityReplyCard>
    </>
  );
};

export default CommunityReplyItem;
