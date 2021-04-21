import { Button } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { refundedPutRequestAction } from "../reducers/pay";

const RefundedButton = ({ data }) => {
  const dispatch = useDispatch();
  const onClickRefunded = () => {
    console.log(data);
    const id = { payId: data.id };
    dispatch(refundedPutRequestAction(id));
  };
  return (
    <>
      {data.status === "refunding" ? (
        <>
          <Button onClick={onClickRefunded}>환불하기</Button>
        </>
      ) : null}
    </>
  );
};

export default RefundedButton;
