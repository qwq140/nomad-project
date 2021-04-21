import { UpOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { communityDetailLikePostRequestAction } from "../../reducers/community";

const LikeButton = styled(Button)`
  position: relative;
  top: -7px;
  height: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const ILikeButton = styled(LikeButton)`
  border-color: #40a9ff;
`;

const DetailLikeButton = ({ listId, count, state }) => {
  const dispatch = useDispatch();
  console.log(state);
  const onClickLikes = useCallback(
    (e) => {
      console.log("실행됨?", listId);
      console.log("실행됨?", count);
      console.log("실행됨?", state);
      dispatch(communityDetailLikePostRequestAction(listId));
    },
    [listId]
  );

  return (
    <>
      {state === "false" ? (
        <LikeButton onClick={onClickLikes} size="large">
          <div>
            <UpOutlined />
          </div>
          {count}
        </LikeButton>
      ) : (
        <ILikeButton onClick={onClickLikes} size="large">
          <div>
            <UpOutlined />
          </div>
          {count}
        </ILikeButton>
      )}
    </>
  );
};

export default DetailLikeButton;
