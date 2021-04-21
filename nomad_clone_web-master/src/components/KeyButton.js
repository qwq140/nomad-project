import { Button } from "antd";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { techDeleteRequestAction } from "../reducers/admin/tech";

const KeyButton = ({ keys }) => {
  const dispatch = useDispatch();
  const onDelete = useCallback(() => {
    console.log(keys);
    dispatch(techDeleteRequestAction(keys));
  }, []);

  return (
    <>
      <Button onClick={onDelete}>삭제</Button>
    </>
  );
};

export default KeyButton;
