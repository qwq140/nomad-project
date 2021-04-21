import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { refundCanclePutRequestAction } from "../reducers/pay";

const RefundCancleButton = ({ data }) => {
  const dispatch = useDispatch();

  const onClickRefundCancle = () => {
    const id = { payId: data.id };
    dispatch(refundCanclePutRequestAction(id));
    console.log("환불취소버튼", id);
  };

  return (
    <>
      {data.status === "refunding" ? (
        <>
          <Button onClick={onClickRefundCancle}>환불취소</Button>
        </>
      ) : null}
    </>
  );
};

export default RefundCancleButton;
