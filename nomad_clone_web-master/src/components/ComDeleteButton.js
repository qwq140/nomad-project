import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { communityDeleteRequestAction } from "../reducers/community";

const ComDeleteButton = ({ data }) => {
  const dispatch = useDispatch();
  const comDelete = () => {
    dispatch(communityDeleteRequestAction(data));
  };
  return (
    <>
      <Button onClick={comDelete}>삭제</Button>
    </>
  );
};

export default ComDeleteButton;
