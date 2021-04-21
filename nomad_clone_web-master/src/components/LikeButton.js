import { UpOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { push } from "connected-react-router";
import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { communityLikePostRequestAction } from "../reducers/community";

const LikeButtonStyle = styled(Button)`
  position: relative;
  top: -7px;
  height: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const ILikeButton = styled(LikeButtonStyle)`
  border-color: #40a9ff;
`;

const LikeButton = memo(({ listId, count, state }) => {
  const dispatch = useDispatch();

  const onClickLikes = useCallback((e) => {
    dispatch(communityLikePostRequestAction(listId));
  }, []);

  return (
    <>
      {state === "false" ? (
        <LikeButtonStyle onClick={onClickLikes} size="large">
          <div>
            <UpOutlined />
          </div>
          {count}
        </LikeButtonStyle>
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
});

export default LikeButton;
